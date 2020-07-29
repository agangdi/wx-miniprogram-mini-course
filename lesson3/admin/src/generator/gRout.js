const t = require('./template')
const fs = require('fs')
const path = require('path')

if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
  console.log(`
    Usage: node gRoute.js <path> <name> <file>

      Example: node gRoute.js "users" "Users" "Users"

      path: the path of route
      name: the name of route
      file: views file name
  `);
  process.exit();
}

let viewFile = path.dirname(process.argv[1]).replace('generator', 'views/' + process.argv[4] + '.vue');

if (!fs.existsSync(viewFile)) {
  throw `view file ${viewFile} does noe exists`
}

let routerFile = path.dirname(process.argv[1]).replace('generator', 'router/index.js');

let routeStr = fs.readFileSync(routerFile).toString();

let newRoute = t.route.replace('{path}' , process.argv[2]).replace('{name}', process.argv[3]).replace('{file}', process.argv[4])

let finalStr = routeStr.replace('//append', newRoute)

fs.writeFile(routerFile, finalStr, { flag: 'w' }, function (err) {
  if (err) return console.log(err);
  console.log('create file ' + routerFile+ ' success');
});