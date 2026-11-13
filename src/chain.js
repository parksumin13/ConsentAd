export const CHAIN_ID=49088;
export const RPC='https://public-01.testnet.bifrostnetwork.com/rpc';
export const RPC_FALLBACK='https://public-02.testnet.bifrostnetwork.com/rpc';
export const ABI=[
 'function advertiser() view returns(address)','function rightsHolder() view returns(address)','function platform() view returns(address)','function cad() view returns(address)',
 'function status() view returns(uint8)','function videoHash() view returns(bytes32)','function executionDeadline() view returns(uint256)','function usageEnd() view returns(uint256)',
 'function RIGHTS_FEE() view returns(uint256)','function PLATFORM_FEE() view returns(uint256)','function TOTAL_FEE() view returns(uint256)','function EXECUTION_WINDOW() view returns(uint256)','function USAGE_PERIOD() view returns(uint256)','function escrowBalance() view returns(uint256)',
 'function registerAd(bytes32)','function deposit()','function approveUse()','function rejectUse()','function activateAd(bytes32)','function refund()','function isPublishable(bytes32) view returns(bool)',
 'event AdRegistered(bytes32 indexed videoHash,uint256 executionDeadline)','event EscrowFunded(address indexed advertiser,uint256 amount)','event UseApproved(address indexed rightsHolder)','event UseRejected(address indexed rightsHolder)','event AdActivated(bytes32 indexed videoHash,uint256 usageEnd)','event EscrowRefunded(address indexed advertiser,uint256 amount)'];
export const TOKEN_ABI=['function approve(address,uint256) returns(bool)','function allowance(address,address) view returns(uint256)','function balanceOf(address) view returns(uint256)','function decimals() view returns(uint8)','function symbol() view returns(string)'];
export const STATUS=['등록 전','예치 대기','승인 대기','집행 대기','게시 중','사용 거절','환불 완료'];
export const same=(a,b)=>!!a&&!!b&&a.toLowerCase()===b.toLowerCase();
export function roleOf(ad,wallet){return ['advertiser','rightsHolder','platform'].find(r=>same(ad[r],wallet))||'public';}
export function effective(ad,now=Date.now()/1000){if(ad.status===4&&now>Number(ad.usageEnd))return '기간 종료';if([1,2,3].includes(ad.status)&&now>Number(ad.executionDeadline))return '집행 기한 종료';return STATUS[ad.status]||'조회 불가';}
export function can(ad,role,action,now=Date.now()/1000){const expired=now>Number(ad.executionDeadline);return ({approve:role==='advertiser'&&ad.status===1&&!expired,deposit:role==='advertiser'&&ad.status===1&&!expired,approveUse:role==='rightsHolder'&&ad.status===2&&!expired,rejectUse:role==='rightsHolder'&&[2,3].includes(ad.status),activateAd:role==='platform'&&ad.status===3&&!expired,refund:role==='advertiser'&&[2,3,5].includes(ad.status)&&(ad.status===5||expired)})[action]||false;}
