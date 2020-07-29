<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html,body,#app{
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
#app {
  background-color: #fefefe;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration:none;

  &.router-link-exact-active {
    color: #42b983;
  }
}
.row-flex {
  display: flex;
  flex-direction: row;
}
.flex-between {
  justify-content: space-between;
}
.el-input {
  width: 200px !important;
  margin-left: 20px;
  margin-bottom: 10px;
}
.search-btn {
  float: right;
  margin-right: 10px;
}
.el-table thead, .el-table th {
  background: #f5f7fa !important;
}
.el-table{
  margin-top: 10px;
}
.el-table .cell{
  text-align: center;
}
.el-pagination{
  margin-top: 15px;
}
.el-pagination__editor{
  width: 100% !important;
}
.el-dialog__header{
  text-align: left;
  border-bottom: 1px solid #eeeeee;
}
.el-dialog__body {
  text-align: left;
}
.el-dialog__body .el-input{
  width: 370px !important;
}
.dialog-footer {
  text-align: left;
}
.form-input-label {
  width: 100px;
  display: inline-block;
}
.text-warning{
  color: orange !important;
}
.text-default{
  color: #333333 !important;
}
.detail-info{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.detail-info .detail-item, .detail-info .detail-item-half{
  width: 30%;
  margin-top: 15px;
  text-align: left;
  flex-direction: row;
  align-items: flex-start;
  display: flex;
}
.detail-info .detail-item-half {
  width: 50%;
}
.detail-title{
  text-align: left;
  padding-bottom: 5px;
  border-bottom: 1px solid #999999;
}
.go-back-btn{
  margin-top: 20px !important;
  float:left;
}
.base-info, .class-info{
  border: 1px solid #cccccc;
  padding: 15px;  
  width: 95%;
}
.text-orange{
  color: orange !important;
}
.text-error{
  color: red !important;
}
</style>
