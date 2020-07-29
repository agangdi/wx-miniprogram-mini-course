<template>
  <el-dialog
    :close-on-click-modal="false"
    @close="onClose"
    :close-on-press-escape="closeOnPressEscape"
    :title="title"
    :visible.sync="visible"
    :fullscreen="fullscreen"
  >
    <slot></slot>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">保 存</el-button>
      <el-button @click="onCancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    fullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      closeOnClickModal: false,
      closeOnPressEscape: false,
      visible: false
    };
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    },

    onSubmit() {
      this.$emit("onSubmit");
    },

    onCancel() {
      this.$emit("onClose");
    }
  }
};
</script>

<style>
</style>