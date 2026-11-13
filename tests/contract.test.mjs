import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ganache from 'ganache';
import {BrowserProvider,ContractFactory} from 'ethers';
import {validateTerms,formatCAD,formatDuration} from '../src/terms.js';
const artifacts=JSON.parse(await fs.readFile(new URL('../public/contracts.json',import.meta.url),'utf8'));

test('form values convert exactly to constructor amounts and seconds',()=>{
 const t=validateTerms({rightsFee:'300',platformFee:'700',executionValue:'14',executionUnit:'days',usageValue:'60',usageUnit:'days'});
 assert.deepEqual(t,{rightsFee:300n,platformFee:700n,total:1000n,executionSeconds:1209600n,usageSeconds:5184000n});
 assert.equal(formatCAD('0'),'0');assert.equal(formatCAD('9007199254740993'),'9,007,199,254,740,993');
 assert.equal(formatDuration(3600),'1시간');assert.equal(formatDuration(120),'2분');
 for(const patch of [{rightsFee:'-1'},{rightsFee:'1.5'},{rightsFee:'1e3'},{rightsFee:'0',platformFee:'0'},{executionValue:'0'},{usageValue:'0'},{usageUnit:'unknown'},{rightsFee:(1n<<256n).toString()}])assert.throws(()=>validateTerms({rightsFee:'300',platformFee:'700',executionValue:'14',executionUnit:'days',usageValue:'60',usageUnit:'days',...patch}));
});

test('deployed contracts use independent immutable amounts, deadlines and usage periods',async(t)=>{
 const node=ganache.provider({logging:{quiet:true},wallet:{totalAccounts:4},chain:{hardfork:'shanghai'}});
 const p=new BrowserProvider(node,undefined,{cacheTimeout:-1});p.pollingInterval=10;
 try{
 const [adv,holder,platform,outsider]=await Promise.all([0,1,2,3].map(i=>p.getSigner(i)));
 const ha=await holder.getAddress(),pa=await platform.getAddress(),aa=await adv.getAddress();
 const token=await new ContractFactory(artifacts.CADToken.abi,artifacts.CADToken.bytecode,adv).deploy();await token.waitForDeployment();const ta=await token.getAddress();
 async function deploy(rights,fee,window,usage){const c=await new ContractFactory(artifacts.ConsentAdEscrow.abi,artifacts.ConsentAdEscrow.bytecode,adv).deploy(ta,ha,pa,rights,fee,window,usage);await c.waitForDeployment();return c;}
 async function tx(v){return (await v).wait()};const hash='0x'+'1'.repeat(64),wrong='0x'+'2'.repeat(64);
 const adA=await deploy(300,700,1209600,5184000);const adB=await deploy(20,80,100,200);
 await t.test('different ads keep separate fee and duration getters',async()=>{assert.equal(await adA.RIGHTS_FEE(),300n);assert.equal(await adA.PLATFORM_FEE(),700n);assert.equal(await adA.TOTAL_FEE(),1000n);assert.equal(await adA.EXECUTION_WINDOW(),1209600n);assert.equal(await adA.USAGE_PERIOD(),5184000n);assert.equal(await adB.TOTAL_FEE(),100n);assert.equal(await adB.EXECUTION_WINDOW(),100n);assert.equal(await adB.USAGE_PERIOD(),200n);});
 await t.test('custom 300/700 settlement, timestamp anchors and duplicate protection',async()=>{
 const reg=await tx(adA.registerAd(hash));const block=await p.send('eth_getBlockByNumber',['0x'+reg.blockNumber.toString(16),false]);assert.equal(await adA.executionDeadline(),BigInt(block.timestamp)+1209600n);
 await assert.rejects(adA.connect(holder).approveUse.staticCall());
 await tx(token.approve(await adA.getAddress(),999));await assert.rejects(adA.deposit.staticCall());
 await tx(token.approve(await adA.getAddress(),1000));await tx(adA.deposit());
 await assert.rejects(adA.connect(platform).activateAd.staticCall(hash));await assert.rejects(adA.connect(outsider).approveUse.staticCall());
 await tx(adA.connect(holder).approveUse());await assert.rejects(adA.connect(platform).activateAd.staticCall(wrong));assert.equal(await adA.status(),3n);assert.equal(await adA.escrowBalance(),1000n);
 const active=await tx(adA.connect(platform).activateAd(hash));const b=await p.send('eth_getBlockByNumber',['0x'+active.blockNumber.toString(16),false]);assert.equal(await adA.usageEnd(),BigInt(b.timestamp)+5184000n);
 assert.equal(await token.balanceOf(ha),300n);assert.equal(await token.balanceOf(pa),700n);assert.equal(await token.balanceOf(aa),9000n);assert.equal(await adA.escrowBalance(),0n);assert.equal(await adA.isPublishable(hash),true);await assert.rejects(adA.connect(platform).activateAd.staticCall(hash));
 assert.equal(adA.interface.fragments.some(f=>f.type==='function'&&/setTerms|updateTerms|setFee/.test(f.name)),false,'no post-approval terms mutation');
 });
 await t.test('100 CAD escrow refund uses its own total after rejection',async()=>{await tx(adB.registerAd(hash));await tx(token.approve(await adB.getAddress(),100));await tx(adB.deposit());assert.equal(await adB.escrowBalance(),100n);await tx(adB.connect(holder).rejectUse());const before=await token.balanceOf(aa);await tx(adB.refund());assert.equal(await token.balanceOf(aa),before+100n);assert.equal(await adB.escrowBalance(),0n);assert.equal(await adB.status(),6n);await assert.rejects(adB.refund.staticCall());});
 await t.test('custom execution deadline expires and enables refund',async()=>{const c=await deploy(1,2,10,100);await tx(c.registerAd(hash));await tx(token.approve(await c.getAddress(),3));await tx(c.deposit());await node.request({method:'evm_increaseTime',params:[11]});await node.request({method:'evm_mine',params:[]});await assert.rejects(c.connect(holder).approveUse.staticCall());const before=await token.balanceOf(aa);await tx(c.refund());assert.equal(await token.balanceOf(aa),before+3n);});
 await t.test('short usage duration blocks public playback on expiry',async()=>{const c=await deploy(0,100,100,10);await tx(c.registerAd(hash));await tx(token.approve(await c.getAddress(),100));await tx(c.deposit());await tx(c.connect(holder).approveUse());await tx(c.connect(platform).activateAd(hash));assert.equal(await token.balanceOf(ha),300n,'zero rights fee leaves recipient balance unchanged');assert.equal(await c.isPublishable(hash),true);await node.request({method:'evm_increaseTime',params:[11]});await node.request({method:'evm_mine',params:[]});assert.equal(await c.isPublishable(hash),false);});
 await t.test('zero total or invalid durations cannot deploy',async()=>{for(const args of [[0,0,10,10],[20,80,0,10],[20,80,10,0],[20,80,1n<<64n,10]])await assert.rejects(deploy(...args));});
 }finally{await p.destroy();await node.disconnect();}
});
