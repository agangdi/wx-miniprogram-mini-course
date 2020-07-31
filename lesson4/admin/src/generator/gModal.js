
// import configs from './temp'
const t = require('./temp')
const fs = require('fs')
const path = require('path')
require ('./ext')
if (!process.argv[2] || !fs.existsSync(process.argv[2])) {
  console.log(`
    Usage: node gModal.js <file>

      Example: node gModal.js ./config/editUserModal.js
  `);
  process.exit();
}
const configs = JSON.parse(fs.readFileSync(process.argv[2]).toString())

if(!configs.file) {
  console.error('specify generator file first')
  process.exit()
}

let formCols = [];
let data = [];
let mixins = [];
let components = [];
let imports = [];

for(let i in configs) {
  switch(i) {
    case "form":
      for(let j in configs[i]) {
        let c = configs[i][j].split(':');
        if (!t.form[c[0]]) {
          throw `form input type ${c[0]} does not exists`;
        }
        formCols.push(t.form[c[0]].replace('{label}', c[2]).replace('{input}', t.form.input.replace('{col}', c[1]).replace('{label}', c[2])))
        data.push(`    ${c[1]}: null`)
      }
      break;
    case "mixins":
      for(let j in configs[i]) {
        mixins.push(configs[i][j])
        imports.push(t.import.mixin.replace('{mixin}', configs[i][j]))
      }
      break;
    case "components":
      for(let j in configs[i]) {
        components.push(configs[i][j])
        imports.push(t.import.component.replace('{Component}', configs[i][j]))
      }
      break;
  }
}

let finalStr = t.modal.baseModal.replace('{form}', formCols.join('')).replace('{imports}', imports.join('\n')).replace('{mixins}', mixins.join(',')).replace('{components}', components.join(',\n')).replace('{data}', data.join(',\n'));

// let file = '../views/' + configs.file
let file = path.dirname(process.argv[1]).replace('generator', 'modals/') + configs.file

// todo 标签识别与栈匹配方式来组织代码缩进

  fs.writeFile(file, finalStr, { flag: 'w' }, function (err) {
    if (err) return console.log(err);
    console.log('create file ' + file + ' success');
  });