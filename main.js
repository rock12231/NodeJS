console.log('main.js');
console.log(__dirname);
console.log(__filename);
console.log(process.cwd());
console.log(process.execPath);
console.log(process.platform);
console.log(process.memoryUsage());
console.log(process.version);

const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);

const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();
console.log(os.machine());
console.log(`Total Memory in GB: ${totalMemory / 1024 / 1024 / 1024}`);
console.log(`Free Memory in GB: ${freeMemory / 1024 / 1024 / 1024}`);
