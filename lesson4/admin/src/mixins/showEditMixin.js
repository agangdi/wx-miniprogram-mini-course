export default {
  data() {
    return {
      showEdit: false,
      editRow: null,
    }
  },
  methods: {
    onShowCreate() {
      this.editRow = null;
      this.showEdit = true;
      if(this.afterShowEdit) {
        this.afterShowEdit()
      }
    },

    onHideEdit() {
      this.showEdit = false;
      if(this.afterHideEdit) {
        this.afterHideEdit()
      }
    },

    onShowEdit(row) {
      this.editRow = row;
      this.showEdit = true;
    }

  }
}