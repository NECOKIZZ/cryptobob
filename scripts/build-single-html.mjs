import fs from 'fs';
import path from 'path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const assetsDir = path.join(distDir, 'assets');
const isProjectsPage = process.argv.includes('--projects');
const outFile = path.join(
  root,
  isProjectsPage ? 'portfolio-projects-single.html' : 'portfolio-single.html'
);

const mimeByExt = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
};

function toDataUrl(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = mimeByExt[ext] || 'application/octet-stream';
  const buffer = fs.readFileSync(filePath);
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

function replaceAssetRefs(content, assetFiles) {
  let output = content;

  for (const fileName of assetFiles) {
    const abs = path.join(assetsDir, fileName);
    const dataUrl = toDataUrl(abs);

    const rawToken = `/assets/${fileName}`;
    const encodedToken = `/assets/${encodeURI(fileName)}`;

    if (output.includes(rawToken)) {
      output = output.split(rawToken).join(dataUrl);
    }
    if (output.includes(encodedToken)) {
      output = output.split(encodedToken).join(dataUrl);
    }
  }

  return output;
}

const htmlPath = path.join(distDir, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const jsMatch = html.match(/<script[^>]*src="([^"]+)"/i);
const cssMatch = html.match(/<link[^>]*href="([^"]+)"/i);

if (!jsMatch || !cssMatch) {
  throw new Error('Could not locate built JS/CSS asset tags in dist/index.html');
}

const jsRel = jsMatch[1].replace(/^\//, '');
const cssRel = cssMatch[1].replace(/^\//, '');

const jsPath = path.join(distDir, jsRel);
const cssPath = path.join(distDir, cssRel);

let js = fs.readFileSync(jsPath, 'utf8');
let css = fs.readFileSync(cssPath, 'utf8');

const routerMountToken = 'w.jsx(ew,{children:w.jsx(E2,{})})';
if (js.includes(routerMountToken)) {
  js = js.replace(
    routerMountToken,
    'w.jsx(ew,{basename:window.location.pathname,children:w.jsx(E2,{})})'
  );
}

if (isProjectsPage) {
  const appRoutesToken =
    'function E2(){return w.jsxs(Ax,{children:[w.jsx(ou,{path:"/",element:w.jsx(d2,{})}),w.jsx(ou,{path:"/projects",element:w.jsx(k2,{})})]})}';
  const projectsOnlyRoutes =
    'function E2(){return w.jsxs(Ax,{children:[w.jsx(ou,{path:"/",element:w.jsx(k2,{})}),w.jsx(ou,{path:"*",element:w.jsx(k2,{})})]})}';

  if (js.includes(appRoutesToken)) {
    js = js.replace(appRoutesToken, projectsOnlyRoutes);
  }
}

const assetFiles = fs
  .readdirSync(assetsDir)
  .filter((f) => {
    const p = path.join(assetsDir, f);
    return fs.statSync(p).isFile() && !f.endsWith('.js') && !f.endsWith('.css');
  });

css = replaceAssetRefs(css, assetFiles);
js = replaceAssetRefs(js, assetFiles);

const output = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BOB'S PORTFOLIO</title>
    <style>
      html, body {
        height: 100%;
        margin: 0;
      }
      #root { min-height: 100%; }
    </style>
    <style>${css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">${js}</script>
  </body>
</html>
`;

fs.writeFileSync(outFile, output, 'utf8');
console.log(`Created: ${outFile}`);
