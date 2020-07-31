'use strict'
module.exports = {
  // first level template
  template: `<template>\n <div>\n {main}\n </div>\n </template>`,
  script: `\n<script>\n{imports}\nexport default{{scripts}}\n</script>`,
  style: `\n<style lang="scss">\n</style>`,
  // second level template
  searchBar: `\n<Searchbar>\n{search}\n</Searchbar>\n`,
  tableBar: `\n<TableBar>\n{buttons}\n</TableBar>\n`,
  baseModal: `\n<BaseModal @onSubmit="onSubmit" @onClose="onClose" :show="show" title="{title}">
    {form}
      </BaseModal>\n`,
  import: {
    component: `  import {Component} from '@/components/{Component}'`,
    api: ` import {{model}} from '@/api/models'`,
    modal: ` import {modal} from '@/modals/{modal}'`,
    mixin: ` import {mixin} from '@/mixins/{mixin}'`,
    common: ` import {common} from '@/common/{common}'`,
    element: ` import {{model}} from 'element-ui'`,
  },
  components: `components: {{components}}`,
  mixins: `mixins: [{mixins}]`,
  data: `data() {\nreturn{\n{data}\n}\n}`,
  mounted: `mounted() {\n {mounted}\n }`,
  methods: `methods:{\n{methods}\n}`,
  searchData: `search: {\n{cols}\n}`,
  formData:  `data: {\n{cols}\n}`,
  //components
  search: {
    input: `<el-input @change="getList" v-model="search.{col}" placeholder="请输入{label}"></el-input>`,
    autocomplete: `
      <el-autocomplete
        class="inline-input"
        v-model="selected{col}"
        :fetch-suggestions="query{col}"
        placeholder="请输入{label}"
        @select="select{col}"
      ></el-autocomplete>`,
    select: `
        <el-select @change="on{col2}Change" v-model="{vendor}.{col}" placeholder="请选择{label}">
            <el-option
              v-for="item in {data}"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>`,
  },
  form: {
    input: `<el-input v-model="data.{col}" placeholder="请输入{label}"></el-input>`,
    inputWithLabel: `
      <div class="demo-input-suffix">
        <span class="form-input-label">{label}：</span>
        {input} 
      </div>
      `,
    autocomplete: `
      <div class="demo-input-suffix">
        <span class="form-input-label">{label}：</span>
        <el-autocomplete
          class="inline-input"
          v-model="selected{col}"
          :fetch-suggestions="query{col}"
          placeholder="请输入{label}"
          @select="select{col}"
        ></el-autocomplete>
      </div>`,
    select: `
      <div class="demo-input-suffix">
        <span class="form-input-label">{label}：</span>
        <el-select @change="on{col2}Change" v-model="{vendor}.{col}" placeholder="请选择{label}">
            <el-option
              v-for="item in {data}"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>`,
  },
  table: {
    tableWithSelection: `
    <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%">
        <el-table-column fixed="left" type="selection" width="55"></el-table-column>
        <el-table-column fixed="left" type="index" width="55">序号</el-table-column>
        {cols}
    </el-table>`,
    opeCol: `
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          {buttons}
        </template>
      </el-table-column>`,
    opeColBtn: `
      <el-button type="{type}" @click="{action}" size="small" class="{class}">{name}</el-button>
    `,
    forbidden: `
        <el-button
            type="text"
            @click="onForbidden(scope.row)"
            size="small"
            :class="scope.row.status == 1 ? 'text-warning' : 'text-button'"
          >{{scope.row.status == 1 ? '封停' : '启用'}}</el-button>
    `,
    table: `
      <el-table :data="tableData" style="width: 100%">
        {cols}
      </el-table>`,
    col: `
      <el-table-column prop="{prop}" label="{label}"></el-table-column>`
  },
  button: {
    edit: `
      <el-button @click="onShowCreate" type="primary" icon="el-icon-plus">新建</el-button>`,
    search: `
      <el-button class="search-btn" @click="getList" type="primary">查询</el-button>`,
    upload: `
      <el-button @click="onShowUpload" icon="el-icon-upload">批量上传</el-button>`,
    lock: `
      <el-button @click="onMulForbidden" icon="el-icon-lock">批量封停</el-button>`,
    unlock: `
      <el-button @click="onMulEnable" icon="el-icon-unlock">批量启用</el-button>`,
    remove: `
      <el-button @click="onMulRemove" icon="el-icon-delete">移除</el-button>`,
    withIcon: `
    <el-button @click="{action}" type="{type}" icon="el-icon-{icon}">{name}</el-button>`,
    withoutIcon: `
    <el-button @click="{action}" type="{type}">{name}</el-button>`,
  },
  modals: {
    editModal: `
      <Edit{col} @onClose="onHideEdit" :obj="editRow" :show="showEdit" />`,
    uploadModal: `
      <MulUpload @onClose="onHideUpload" :show="showUpload" />`,
    base: `
      <{name} @onClose="{onClose}" :show="{showProp}" />
    `
  },
  page: `
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page.sync="search.page"
      :page-size="search.page_size"
      :total="total">
    </el-pagination>`,
  functions: {
    normal: `
          {fun}() {
            {sentence}
          }`
    ,
    normalWithArg: `
          {fun}({args}) {
            console.log({args})
          }
    `,
    query: `
          query{col}(queryString, cb) {
              var {data} = this.{data};
              var results = queryString ? {data}.filter(this.createFilter(queryString)) : {data};
              // 调用 callback 返回建议列表的数据
              cb(results);
          }`
    ,
    createFilter: `
          createFilter(queryString) {
            return (item) => {
              return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          }`
    ,
    searchSelect: `
          select{col}(item) {
            this.search.{id} = item.id
            this.selected{col} = item.value
          }`
    ,
    toLabelMethod: `
          {col}ToLabel({col}) {
            return this.{data}.map(v => {
              if (v.value == {col}) return v.label
            })[0]
          }`
    ,
    toLabel: `
          v.{col}Label = this.{col}ToLabel(v.{col});
          `
    ,
    getList: `
          getList() {
            console.log('getList')
            {model}.{action}(this.search, res => {
              this.total = res.total_records
              this.tableData = res.data.map((v) => {
                {toLabel}
                return v;
              })
            }, err => {
              console.log(err)
            })
          }`
    ,
    getItem: `
          getItem() {
            {model}.{action}(this.id, res => {
              this.data = res.data
            })
          }
    `,
    onClose: `
          onClose() {
            this.$emit("onClose");
          }
    `,
    onSubmit: `
          onSubmit() {
            let d = this.data
            if({cols}) {
              return Message.warning('请填完整信息');
            }
          }
    `,
    pageCurrentChange: `
          handleCurrentChange(val) {
            this.search.page = val;
            this.getList()
          }`
    ,
    tableSelectionChange: `
          handleSelectionChange(val) {
            console.log('handleSelectionChange', val)
            this.multipleSelection = val;
          }`
  },
  route: `,
      {
        path: '/{path}',
        name: '{name}',
        component: () => import('../views/{file}.vue')
      }//append
  `,
  detail: {
    module: `
      <h2 class="detail-title">{title}</h2>
      <div class="detail-info">
        {items}
      </div>
    `,
    item: `
      <div class="detail-item">
        {content}
      </div>
    `,
    string: `{label}:{{{con}}}`,
    img: `{label}:<img :src="{con}" width=100 height=100 />`,
    goBackBtn: `
      <el-button class="go-back-btn" @click="goBack" type="primary" >返回</el-button>`
  },
  watch: `
    watch: {
      {props}
    }
  `,
  watchProp: `
    {pro}: function (value) {

    }
  `
}