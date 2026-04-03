const fs = require('fs');
const potrace = require('potrace');
const path = require('path');

const srcDir = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\d9e4b120-ca61-4fdc-b48e-665f10a02b59';
const destPc = 'C:\\Users\\Admin\\Desktop\\website\\icons\\pc-builder';
const destCctv = 'C:\\Users\\Admin\\Desktop\\website\\icons\\cctv-builder';

if(!fs.existsSync(destPc)) fs.mkdirSync(destPc, { recursive: true });
if(!fs.existsSync(destCctv)) fs.mkdirSync(destCctv, { recursive: true });

const params = {
    color: '#000000',
    background: 'transparent',
    optTolerance: 0.2,
    turdSize: 100,
    turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY
};

const files = fs.readdirSync(srcDir);
files.filter(f => f.startsWith('icon_') && f.endsWith('.png')).forEach(file => {
    let destDir = file.includes('_pc_') ? destPc : destCctv;
    let parts = file.split('_');
    let baseNameParts = parts.slice(2, parts.length - 1);
    let base = baseNameParts.join('-');
    
    // Correct specific CCTV base names based on user requirement:
    if(base === 'camera-dome') base = 'camera-dome';
    
    let destPath = path.join(destDir, base + '.svg');
    
    potrace.trace(path.join(srcDir, file), params, function(err, svg) {
        if (err) return console.error(err);
        fs.writeFileSync(destPath, svg.replace('<svg ', '<svg fill="#000000" '));
        console.log('Saved: ' + destPath);
    });
});
