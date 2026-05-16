import fs from 'fs';
import path from 'path';

const pathsToFix = [
    './src/generated/prisma/index.js',
    './dist/generated/prisma/index.js'
];

const genPath = './src/generated/prisma/package.json';
const distGenPath = './dist/generated/prisma/package.json';

[genPath, distGenPath].forEach(p => {
    const dir = path.dirname(p);
    if (fs.existsSync(dir)) {
        // IMPORTANT: Set to "commonjs"
        fs.writeFileSync(p, JSON.stringify({ type: "commonjs" }, null, 2));
        console.log(`✅ Set CommonJS mode in: ${dir}`);
    }
});

console.log("🚀 Build prep complete.");