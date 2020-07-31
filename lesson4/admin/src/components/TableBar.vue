<template>
  <div id="table-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  #table-bar{
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    width: calc(100% - 30px);
    text-align: left;
  }
</style>