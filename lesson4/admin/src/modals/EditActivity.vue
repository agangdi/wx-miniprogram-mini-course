<template>
  <div>
    <BaseModal @onSubmit="onSubmit" @onClose="onClose" :show="show" title="编辑活动">
      <div class="demo-input-suffix">
        <span class="form-input-label">名称：</span>
        <el-input v-model="data.name" placeholder="请输入名称"></el-input>
      </div>

      <div class="demo-input-suffix">
        <span class="form-input-label">签到开始：</span>
        <el-date-picker
          v-model="data.sign_from"
          type="datetime"
          placeholder="请输入签到开始时间">
        </el-date-picker> 
      </div>

      <div class="demo-input-suffix">
        <span class="form-input-label">签到结束：</span>
        <el-date-picker
          v-model="data.sign_to"
          type="datetime"
          placeholder="请输入签到结束时间">
        </el-date-picker>
      </div>
    </BaseModal>
  </div>
</template>
<script>
import modalClose from "@/mixins/modalClose";
import { activityModel } from "@/api/models";
import { Message } from "element-ui";
export default {
  mixins: [modalClose],
  components: {},
  data() {
    return {
      data: {
        name: null,
        sign_from: null,
        sign_to: null,
      },
    };
  },
  props: {
    obj: {
      type: Object,
      default: null
    }
  },
  watch: {
    obj: function (value) {
      if(value) {
        this.data.id = value.id
        this.data.name = value.name
        this.data.sign_from = value.sign_from
        this.data.sign_to = value.sign_to
      }else{
        this.data = {
          name: null,
          sign_from: null,
          sign_to: null,
        }
      }
    },
  },
  mounted() {},
  methods: {
    onSubmit() {
      let d = this.data;
      if (!d.name || !d.sign_from || !d.sign_to) {
        return Message.warning("请填完整信息");
      }
      activityModel.edit(this.data, () =>{
        Message.success('活动创建成功');
        this.onClose(); 
      })
    },
    onClose() {
      this.$emit("onClose");
      this.$emit('getList');
    },
  },
};
</script>
<style lang="scss">
</style>