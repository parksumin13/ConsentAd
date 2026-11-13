import fs from 'node:fs/promises';
import {build} from 'esbuild';
import assert from 'node:assert/strict';
const source=(await fs.readFile('src/main.jsx','utf8')).replace("createRoot(document.getElementById('root')).render(<App/>);",'export {App};');
await build({stdin:{contents:source,loader:'jsx',resolveDir:process.cwd()+'/src'},bundle:true,platform:'node',format:'esm',packages:'external',loader:{'.css':'empty'},outfile:'.sites-runtime/role-ui.mjs'});
const {App}=await import('./role-ui.mjs');
const {default:React}=await import('react');const {renderToStaticMarkup}=await import('react-dom/server');
globalThis.localStorage={getItem:()=>null};
for(const role of ['public','advertiser','rightsHolder','platform']){
 globalThis.location={hash:'#'+role};
 const html=renderToStaticMarkup(React.createElement(App));
 assert.equal(html.includes('class="overview"'),role==='public',role+' statistics');
 assert.equal(/<button[^>]*>.*?새 광고 등록<\/button>/.test(html),['public','advertiser'].includes(role),role+' create action');
 assert.equal(html.includes('class="youtube-setup"'),role==='platform',role+' setup notice');
 assert.equal(html.includes('각자의 역할은 달라도'),false);
 console.log(role+': role actions and statistics verified');
}
assert.ok(source.includes("function openRegistration(kind='create'){nav('advertiser');setModal(kind);}"));
assert.ok(source.includes("page==='advertiser'&&(modal==='create'||modal==='import')"));
console.log('Registration opens only inside advertiser page; source routing guard verified.');
