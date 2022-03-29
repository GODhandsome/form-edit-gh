<template>
  <el-dialog
    title="预览"
    :close-on-click-modal="false"
    :visible="dialogVisible"
    width="600px"
    :before-close="handleClose"
  >
    <CustomerForm ref="CustomerForm" :isPreview="true" :list="list" />
    <div slot="footer">
      <el-button @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import CustomerForm from './CustomerForm.vue';

export default {
  name: 'PreviewDialog',
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
      this.$nextTick(() => {
        this.$refs.CustomerForm.resetForm(visible);
      });
    },
  },
  data() {
    return {
      previewData: {},
    };
  },
  methods: {
    handleClose() {
      this.$emit('handleChangeVisible', false);
    },
  },
};
</script>

<style scoped></style>
