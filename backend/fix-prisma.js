import fs from 'fs';
import path from 'path';

// Change this path if your generated client is elsewhere
const prismaClientPath = './src/generated/prisma/index.js'; 

if (fs.existsSync(prismaClientPath)) {
    let content = fs.readFileSync(prismaClientPath, 'utf8');
    // This fixes the internal relative imports Prisma sometimes misses
    content = content.replace(/from\s+['"]\.\/(.*)['"]/g, "from './$1.js'");
    fs.writeFileSync(prismaClientPath, content);
    console.log('Fixed Prisma Client ESM imports');
}