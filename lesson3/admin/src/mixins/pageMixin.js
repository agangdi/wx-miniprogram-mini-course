export default {
  data() {
    return {
      page_sizes: [10, 20, 50, 100] 
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.search.page = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.search.page_size = val
      this.getList();
    }
  }
}