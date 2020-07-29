<template>
  <div id="searchbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  #searchbar{
    border: 1px solid #ececec;
    padding: 10px;
    margin: 0 auto;
    width: calc(100% - 30px);
    text-align: left;
  }
</style>