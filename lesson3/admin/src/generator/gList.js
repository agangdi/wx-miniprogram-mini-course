
// import configs from './temp'
const t = require('./template')
const fs = require('fs')
const path = require('path')
const colToLabel = require('./colToLabel');
// require('./ext')
if (!process.argv[2] || !fs.existsSync(process.argv[2])) {
  console.log(`
    Usage: node gList.js <file>

      Example: node gList.js ./config/userList.js
  `);
  process.exit();
}
const configs = JSON.parse(fs.readFileSync(process.argv[2]).toString())

if(!configs.file) {
  console.error('specify generator file first')
  process.exit()
}
String.prototype.replace = function(search, replace) {
  return this.split(search).join(replace);
}

String.prototype.firstUpperCase = function(){
  return this.substring(0, 1).toUpperCase() + this.substring(1, this.length);
  // return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
  //     return $1.toUpperCase() + $2;
  // });
}
// String.prototype.replace = function(search, replace) {
//   return this.split(search).join(replace);
// }

function parseTemplate(main) {
  return t.template.replace('{main}', main);
}

function parseScript(imports, scripts) {
  return t.script.replace('{imports}', imports).replace('{scripts}', scripts);
}

function parseStyle() {
  return t.style
}

function parseSearchBar(search) {
  return t.searchBar.replace('{search}', search)
}

function parseTableBar(buttons) {
  return t.tableBar.replace('{buttons}', buttons)
}

function parseBaseModal(form, title) {
  return t.baseModal.replace('{form}', form).replace('{title}', title)
}

function parseImportComponent(component) {
  return t.import.component.replace('{Component}', component)
}

function parseImportApi(model) {
  return t.import.api.replace('{model}', model)
}

function parseImportModal(modal) {
  return t.import.modal.replace('{modal}', modal)
}

function parseImportMixin(mixin) {
  return t.import.mixin.replace('{mixin}', mixin)
}

function parseComponents(components) {
  return t.components.replace('{components}', components)
}

function parseMinxins(mixins) {
  return t.mixins.replace('{mixins}', mixins)
}

function parseImportElement(model) {
  return t.import.element.replace('{model}', model)
}

function parseData(data) {
  return t.data.replace('{data}', data)
}

function parseMounted(mounted) {
  return t.mounted.replace('{mounted}', mounted)
}

function parseMethods(methods) {
  return t.methods.replace('{methods}', methods)
}

function parseSearchData(searchData) {
   return t.searchData.replace('{cols}', searchData)
}

function parseSearchInput(col) {
  let label = parseColToTable(col)
  return t.search.input.replace('{col}', col).replace('{label}', label)
}

function parseSearchAutocomplete(col, vendor) {
  let label = parseColToTable(col)
  return t.search.autocomplete.replace('{col}', col).replace('{label}', label).replace('{vendor}', vendor)
}

function parseSearchSelect(col, data) {
  let label = parseColToTable(col) 
  return t.search.select.replace('{col}', col).replace('{label}', label).replace('{data}', data).replace('{col2}', col.firstUpperCase()).replace('{vendor}', 'search')
}

function parseFormAutocomplete(col) {
  let label = parseColToTable(col)
  return t.form.autocomplete.replace('{col}', col).replace('{label}', label)
}

function parseFormInput(col) {
  let label = parseColToTable(col)
  return t.form.input.replace('{col}', col).replace('{label}', label)
}

function parseFormInputWithLabel(col) {
  let label = parseColToTable(col)
  return t.form.inputWithLabel.replace('{label}', label).replace('{input}', parseFormInput(col, label))
}

function parseFormSelect(col, data, vendor) {
  let label = parseColToTable(col)
  return t.form.select.replace('{col}', col).replace('{label}', label).replace('{data}', data).replace('{col2}', col.firstUpperCase()).replace('{vendor}', vendor)
}

function parseTableWithSelection(cols) {
  return t.table.tableWithSelection.replace('{cols}', cols)
}

function parseTable(cols) {
  return t.table.table.replace('{cols}', cols)
}

function parseTableCol(prop,  width=150) {
  let label = parseColToTable(prop)
  return t.table.col.replace('{prop}', prop).replace('{label}', label).replace('{width}', width)
}

function parseEditBtn() {
  return t.button.withIcon.replace('{action}', `onShowCreate`).replace('{type}', 'primary').replace('{icon}', 'plus').replace('{name}', '新建')
}

function parseUploadBtn() {
  return t.button.upload
}

function parseMulLock() {
  return t.button.lock
}

function parseMulUnlock() {
  return t.button.unlock
}

function parseMulRemove() {
  return t.button.remove
}

function parseEditModal(col) {
  return t.modals.editModal.replace('{col}', col)
}

function parseUploadModal() {
  return t.modals.uploadModal
}

function parsePagenation() {
  return t.page
}

function parseFunction(fun, sentence=null) {
  if(sentence == null){
    sentence = `console.log("${fun}")`
  }
  return t.functions.normal.replace('{fun}', fun).replace('{sentence}', sentence)
}

function parseToLabelSentence(col) {
  return t.functions.toLabel.replace('{col}', col)
}

function parseGetListFun(model, action, toLabel) {
  return t.functions.getList.replace('{model}', model).replace('{action}', action).replace('{toLabel}', toLabel)
}

function parseGetItemFun(model, action) {
  return t.functions.getItem.replace('{model}', model).replace('{action}', action)
}

function parseOnCloseFun() {
  return t.functions.onClose;
}

function parseOnSubmitFun(cols) {
  return t.functions.onSubmit.replace('{cols}', cols)
}

function parseFormData(cols) {
  return t.formData.replace('{cols}', cols)
}

function parseTableOpeColBtn(c) {
  return t.table.opeColBtn.replace('{type}', c.type).replace('{action}', c.action).replace('{name}', c.name).replace('{class}', c.class) 
}

function parseTableOpeForbiddenBtn(){
  return t.table.forbidden;
}

function parseTableOpeCol(buttons) {
  return t.table.opeCol.replace('{buttons}', buttons)
}

function parseFunWithArg(fun, args) {
  return t.functions.normalWithArg.replace('{fun}', fun).replace('{args}', args)
}

function parseImportCommon(common) {
  return t.import.common.replace('{common}', common)
}

function parseDetailModule(title, items) {
  return t.detail.module.replace('{title}', title).replace('{items}', items)
}

function parseDetailItem(content) {
  return t.detail.item.replace('{content}', content)
}

function parseDetailString(con) {
  return t.detail.string.replace('{label}', parseColToTable(con)).replace('{con}', con)
}

function parseDetailImg(con) {
  return t.detail.img.replace('{label}', parseColToTable(con)).replace('{con}', con)
}

function parseColToTable(col) {
  if(col.indexOf('.') > 0) {
    col = col.split('.')[1]
  }
  return colToLabel[col] || 'unknows'
}

function parseWatch(props) {
  return t.watch.replace('{props}', props)
}

function parseWatchProp(pro) {
  return t.watchProp.replace('{pro}', pro)
}

let imports = [];
let scripts = [];
let search = []; // search form inputs
let tableButtons = []; // table bar buttons
let modals = [];
let components = [];
let mixins = [];
let mounteds = [];
let watches = [];
let methods = [];
let searchDatas = []; // data for search columns
let formInputs = [];
let formData = [];
let tableCols = [];
let tableOpeBtn = [];
let data = [];
let toLabels = []

// view detail
let detailModules = []
let detailItems = []


for(let i in configs) {
  switch(i) {
    case 'search': 
      if (!configs.getList) {
        throw 'define search methods getList first'
      }
      for(let j in configs[i]) {
        let c = configs[i][j]
        switch(c.type) {
          case 'input':
            search.push(parseSearchInput(c.col))
            searchDatas.push(` ${c.col}: null`)
            break;
          case 'autocomplete':
            search.push(parseSearchAutocomplete(c.col, 'search'))
            searchDatas.push(`selected${c.key}: null`)
            break;
          case 'select':
            search.push(parseSearchSelect(c.col, c.data ))
            searchDatas.push(` ${c.key}: null`)
            // eslint-disable-next-line no-case-declarations
            break;
        }
      }
      break;
    case 'tableBar':
      for(let j in configs[i]) {
        let c = configs[i][j]
        if(/Edit\w*/.test(c)){
            let col = c.replace('Edit', '').firstUpperCase()
            modals.push(parseEditModal(col))
            imports.push(parseImportModal(c))
            components.push(c)
            tableButtons.push(parseEditBtn())
            continue;
        }
        switch(c) {
          case 'upload':
            tableButtons.push(parseUploadBtn())
            modals.push(parseUploadModal())
            imports.push(parseImportComponent('MulUpload'))
            components.push('MulUpload')
            break;
          case 'lock':
            tableButtons.push(parseMulLock())
            break;
          case 'unlock':
            tableButtons.push(parseMulUnlock())
            break;
          case 'remove': 
            tableButtons.push(parseMulRemove())
            break;
        }
      }
      break;
    case 'tableCols':
      for(let j in configs[i]) {
        let c = configs[i][j]
        tableCols.push(parseTableCol(c.col))
        if(c.col.endsWith('Label')) {
          toLabels.push(parseToLabelSentence(c.col.replace('Label', '')))
        }
      }
      break;
    case 'tableOpeCol': 
      for (let m in configs[i].buttons) {
        let b = configs.tableOpeCol.buttons[m];
        let fun = b.action.split('(')[0]
        if(fun == 'onShowDetail') {
          methods.push(parseFunWithArg(fun, 'row'))
        }
        if(fun == "onForbidden") {
          tableOpeBtn.push(parseTableOpeForbiddenBtn())
        }else{
          tableOpeBtn.push(parseTableOpeColBtn(b))
        }
      }
      tableCols.push(parseTableOpeCol(tableOpeBtn.join('\n')))
      break;
    case 'modals':
      for(let j in configs[i]) {
        let c = configs[i][j]
        imports.push(parseImportModal(c))
        components.push(c)
      }
      break;
    case 'mixins': 
      for(let j in configs[i]) {
        let c = configs[i][j]
        imports.push(parseImportMixin(c))
        mixins.push(c)
      }
      break;
    case 'form':
      for(let j in configs[i]) {
        let c = configs[i][j]
        switch(c.type) {
          case 'inputWithLabel':
            formInputs.push(parseFormInputWithLabel(c.col))
            formData.push(`${c.col}: null`)
            break;
          case 'input':
            formData.push(`${c.col}: null`)
            formInputs.push(parseFormInput(c.col))
            break;
            case 'autocomplete':
              formInputs.push(parseFormAutocomplete(c.col))
              formData.push(`${c.key}: null`)
              // data.push(`${c.data}: []`)
              break;
            case 'select':
              formInputs.push(parseFormSelect(c.col, c.data, 'data'))
              formData.push(` ${c.key}: null`)
              break;
        }
      }
      break;
    case "detail":
      for(let m in configs.detail) {
        // detail modules
        detailItems = []
        for (let j in configs.detail[m].items) {
          // detail  module items
          let item = configs.detail[m].items[j]
          let type = item.type || "string"
          switch(type) {
            case "string":
              detailItems.push(parseDetailItem(parseDetailString(item.con)))
              break;
            case "img":
              detailItems.push(parseDetailItem(parseDetailImg(item.con)))
              break;
          }
        }
        detailModules.push(parseDetailModule(configs.detail[m].title, detailItems.join('\n')))
      }
      break;
    case "data": 
      for(let j in configs[i]) {
        data.push(configs[i][j])
      }
      break;
    case "mounted": 
      for(let j in configs[i]) {
        mounteds.push(configs[i][j]);
      }
      break;
    case "methods": 
      for(let j in configs[i]) {
        let item = configs[i][j];
        switch(item.fun) {
          case "getItem":
            methods.push(parseGetItemFun(item.model, item.action));
            break;
          case "onClose": 
            methods.push(parseOnCloseFun());
            break;
          case "onSubmit":
            // eslint-disable-next-line no-case-declarations
            let cols = [];
            if(configs.form) {
              for(let j in configs.form) {
                let col = configs.form[j].key || configs.form[j].col;
                cols.push(`!d.${col}`);
              }
            }
            methods.push(parseOnSubmitFun(cols.join(' || ')));
          break;
          default:
            methods.push(parseFunction(item.fun))
        }
      }
      break;
    case "imports": 
      for(let j in configs[i]) {
        let item = configs[i][j];
        switch(item.type)  {
          case "api":
            imports.push(parseImportApi(item.model));
            break;
          case "common":
            imports.push(parseImportCommon(item.model));
            break;
          case "element":
            imports.push(parseImportElement(item.model));
            break;
        }
      }
      break;
    case "watches":
      for(let j in configs[i]){
        watches.push(parseWatchProp(configs[i][j]));
      }
  }
}

// parse {main}
let mainStr = '';
if(configs.getList) {
  imports.push(parseImportApi(configs.getList.model))
  methods.push(parseGetListFun(configs.getList.model, configs.getList.action, toLabels.join('\n')))
  mounteds.push('this.getList()')
  data.push('tableData: []')
  if(configs.page) {
    searchDatas.push('page: 1')
    searchDatas.push('page_size: 10')
  }
  data.push('total: 0')
}

if(configs.baseModal) {
  methods.push(parseFunction('onClose', `this.$emit('onClose')`))
  data.push(parseFormData(formData.join(',\n')))
  if(configs.form) {
    mainStr += parseBaseModal(formInputs.join('\n'), configs.baseModal.title)
  }
}




if(configs.search) {
  components.push('Searchbar')
  imports.push(parseImportComponent('Searchbar'))
  search.push(t.button.search)
  data.push(parseSearchData(searchDatas.join(',\n')))
  mainStr += parseSearchBar(search.join('\n'))
}

if(configs.tableBar) {
  components.push('TableBar')
  imports.push(parseImportComponent('TableBar'))
  mainStr += parseTableBar(tableButtons.join('\n'))
}

if(configs.table) {
  if(configs.table === 'tableWithSelection') {
    mainStr += parseTableWithSelection(tableCols.join('\n')) 
  }else if(configs.table === 'table') {
    mainStr += parseTable(tableCols.join('\n'))
  }
  if(configs.page) {
    mainStr += parsePagenation()
  }
}

if(configs.detail) {
  mainStr += detailModules.join('\n')
  mainStr += t.detail.goBackBtn
}

mainStr += modals.join('\n')

if(configs.baseModal2) {
  methods.push(parseFunction('onClose', `this.$emit('onClose')`))
  mainStr += parseBaseModal(mainStr, configs.baseModal2.title)
}

// parse {scripts}
scripts.push(parseMinxins(mixins.join(',')))
scripts.push(parseComponents(components.join(',\n')))
scripts.push(parseData(data.join(',\n')))
if(watches.length > 0){
  scripts.push(parseWatch(watches.join(',\n')))
}
scripts.push(parseMounted(mounteds.join('\n')))
scripts.push(parseMethods(methods.join(',\n')))

const finalStr = parseTemplate(mainStr) + parseScript(imports.join('\n'), scripts.join(',\n')) + parseStyle()

// let file = '../views/' + configs.file
let file = path.dirname(process.argv[1]).replace('generator', configs.file)
// todo 标签识别与栈匹配方式来组织代码缩进

fs.writeFile(file, finalStr, { flag: 'w' }, function (err) {
  if (err) return console.log(err);
  console.log('create file ' + file + ' success');
});