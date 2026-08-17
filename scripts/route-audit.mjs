import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(process.cwd());
const app=fs.readFileSync(path.join(root,'assets/app.js'),'utf8');
const index=fs.readFileSync(path.join(root,'index.html'),'utf8');
const schemaMatch=app.match(/const ROUTE_SCHEMA=({[\s\S]*?});\nfunction validRoute/);
if(!schemaMatch)throw new Error('ROUTE_SCHEMA not found');
const schema=Function(`return (${schemaMatch[1]})`)();
const valid=new Set(Object.values(schema).flat());
const navTargets=[...app.matchAll(/data-nav="([^"$]+)"/g)].map(m=>m[1]);
const bad=[...new Set(navTargets.filter(x=>!valid.has(x)))];
const refs=[...index.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]).filter(x=>!x.startsWith('http')&&!x.startsWith('#'));
const missing=refs.filter(r=>!fs.existsSync(path.join(root,r.replace(/^\//,''))));
const required=['sitemap.xml','robots.txt','site.webmanifest','api/openapi.yaml','api/contracts.json','.env.example','Dockerfile'];
const missingRequired=required.filter(f=>!fs.existsSync(path.join(root,f)));
if(bad.length||missing.length||missingRequired.length){
  console.error({badRoutes:bad,missingAssets:missing,missingRequired});process.exit(1);
}
console.log(JSON.stringify({status:'pass',routeTargets:navTargets.length,uniqueRouteTargets:new Set(navTargets).size,requiredFiles:required.length},null,2));
