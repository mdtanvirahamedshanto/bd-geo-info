const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');

function minifyJsonFiles(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      minifyJsonFiles(filePath);
    } else if (file.endsWith('.json')) {
      try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const minified = JSON.stringify(JSON.parse(raw));
        fs.writeFileSync(filePath, minified, 'utf8');
        console.log(`Minified: ${path.relative(distDir, filePath)} (${raw.length} -> ${minified.length} bytes)`);
      } catch (err) {
        console.error(`Failed to minify: ${filePath}`, err);
      }
    }
  }
}

console.log('Minifying JSON assets in dist folder...');
minifyJsonFiles(distDir);
console.log('JSON minification complete!');
