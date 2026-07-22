const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else {
      if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    }
  }
  return filelist;
};

const componentsDir = path.join(__dirname, '..', 'components');
const appDir = path.join(__dirname, '..', 'app');
const files = [...walkSync(componentsDir), ...walkSync(appDir)];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if it calls setXyz(...) but does NOT contain => or const or function or { (assuming it's a naked call)
    if (line.match(/\s+set[A-Z]\w*\(/) && !line.includes('=>') && !line.includes('useEffect') && !line.includes('const ') && !line.includes('function ') && !line.includes('}') && !line.includes('catch') && !line.includes('finally')) {
      console.log(`Potential side effect in ${file}:${i + 1}`);
      console.log(`>> ${line.trim()}`);
    }
  }
}
