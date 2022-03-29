<template>
  <el-dialog
    title="新增"
    :close-on-click-modal="false"
    :visible="dialogVisible"
    width="600px"
    :before-close="handleClose"
  >
    <CustomerForm ref="CustomerForm" :form.sync="form" :list="list" @handleSubmit="handleSubmit" />
    <div slot="footer">
      <el-button @click="handleClose">关闭11</el-button>
      <el-button @click="handleSave">保存22</el-button>
    </div>
  </el-dialog>
</template>

<script>
import CustomerForm from './CustomerForm.vue';

export default {
  name: 'aaaa',
  components: { CustomerForm },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  watch: {
    dialogVisible(visible) {
      if (this.$refs.CustomerForm) {
        this.$refs.CustomerForm.resetForm(visible);
      }
    },
  },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    handleClose() {
      this.$emit('handleChangeVisible', false);
    },
    handleSave() {
      this.$refs.CustomerForm.handleSubmit();
    },
    handleSubmit(values, edit) {
      console.log(values, edit);
    },
  },
};
</script>

<style scoped></style>
