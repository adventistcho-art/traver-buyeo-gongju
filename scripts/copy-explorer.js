const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const destDir = path.join(root, 'web', 'public');
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(path.join(root, 'index.html'), path.join(destDir, 'app.html'));

const mapsSrc = path.join(root, 'maps');
const mapsDest = path.join(destDir, 'maps');
fs.mkdirSync(mapsDest, { recursive: true });
for (const name of fs.readdirSync(mapsSrc)) {
  fs.copyFileSync(path.join(mapsSrc, name), path.join(mapsDest, name));
}

const imagesSrc = path.join(root, 'images');
if (fs.existsSync(imagesSrc)) {
  const imagesDest = path.join(destDir, 'images');
  fs.mkdirSync(imagesDest, { recursive: true });
  for (const name of fs.readdirSync(imagesSrc)) {
    fs.copyFileSync(path.join(imagesSrc, name), path.join(imagesDest, name));
  }
}
console.log('explorer copied to web/public/app.html');
