const { existsSync, readdirSync, readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const onDynamic = app => {
  // loads 'src/routes.dev.js'
  const devName = 'src/routes.dev.js';
  const devPath = resolve(process.cwd(), devName);
  const hasDevRoutes = existsSync(devPath);
  if (hasDevRoutes) {
    const devRoutes = require(devPath);
    devRoutes(app);

    console.log(`> added ${devName} to Mock-API`);
  } else {
    console.log(`> skipped ${devName}`);
  }

  // loads 'src/routes/*.js'
  const dirName = 'src/routes/';
  const dirPath = resolve(process.cwd(), dirName);
  const hasDir = existsSync(dirPath);
  const dirFiles = hasDir && readdirSync(dirPath) || [];
  const addedFiles = dirFiles.filter(filename => filename.endsWith('.js'));
  if (addedFiles.length > 0) {
    console.log(`> adding ${addedFiles.length} custom files`);

    addedFiles.map(filename => {
      const filePath = resolve(dirPath, filename);
      const fileRoutes = require(filePath);
      fileRoutes(app);

      console.log(`>> added ${dirName}${filename} to Mock-API`);
    });
  } else {
    console.log(`> skipped ${dirName}`);
  }
};

module.exports = onDynamic;
