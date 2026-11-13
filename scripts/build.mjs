import requireFS from "node:fs";
import fs from 'node:fs/promises';import path from 'node:path';import {build} from 'esbuild';import solc from 'solc';
await fs.mkdir('public',{recursive:true});
const source=await fs.readFile('contracts/ConsentAdStarter.sol','utf8');
const compiled=JSON.parse(solc.compile(JSON.stringify({language:'Solidity',sources:{'ConsentAdStarter.sol':{content:source}},settings:{optimizer:{enabled:true,runs:200},evmVersion:'paris',outputSelection:{'*':{'*':['abi','evm.bytecode.object']}}}}),{import:p=>{try{return {contents:requireFile(p)}}catch{return {error:'Missing '+p}}}}));
function requireFile(p){return requireFS.readFileSync(path.join('node_modules',p.replace('@openzeppelin/contracts@5.4.0/', '@openzeppelin/contracts/')),'utf8')};
const errs=(compiled.errors||[]).filter(x=>x.severity==='error');if(errs.length)throw new Error(errs.map(x=>x.formattedMessage).join('\n'));
await fs.writeFile('public/contracts.json',JSON.stringify(Object.fromEntries(['CADToken','ConsentAdEscrow'].map(name=>[name,{abi:compiled.contracts['ConsentAdStarter.sol'][name].abi,bytecode:'0x'+compiled.contracts['ConsentAdStarter.sol'][name].evm.bytecode.object}]))));
await fs.mkdir('build-client',{recursive:true});
await build({entryPoints:['src/main.jsx'],bundle:true,minify:true,format:'esm',outdir:'build-client',loader:{'.js':'jsx'},define:{'process.env.NODE_ENV':'"production"'}});
await fs.copyFile('index.html','build-client/index.html');await fs.copyFile('public/contracts.json','build-client/contracts.json');await fs.copyFile('contracts/ConsentAdStarter.sol','build-client/ConsentAdStarter.sol');
const assets={};for(const f of await fs.readdir('build-client')){assets['/'+f]={body:await fs.readFile('build-client/'+f,'utf8'),type:f.endsWith('.js')?'text/javascript':f.endsWith('.css')?'text/css':f.endsWith('.json')?'application/json':f.endsWith('.sol')?'text/plain; charset=utf-8':'text/html; charset=utf-8'}}
await fs.writeFile('server/assets.generated.js','export default '+JSON.stringify(assets));
await fs.mkdir('dist/server',{recursive:true});await build({entryPoints:['server/index.js'],bundle:true,minify:true,format:'esm',platform:'browser',target:'es2022',outfile:'dist/server/index.js'});
await fs.mkdir('dist/.openai',{recursive:true});await fs.copyFile('.openai/hosting.json','dist/.openai/hosting.json');console.log('React + Worker + configurable contract artifacts built.');
