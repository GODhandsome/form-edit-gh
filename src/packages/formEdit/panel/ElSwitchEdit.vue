<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="打开文字">
      <el-input v-model="form['active-text']" />
    </el-form-item>
    <el-form-item label="关闭文字">
      <el-input v-model="form['inactive-text']" />
    </el-form-item>
    <el-form-item label="打开时的值">
      <el-input v-model="form['active-value']" />
    </el-form-item>
    <el-form-item label="关闭时的值">
      <el-input v-model="form['inactive-value']" />
    </el-form-item>
    <el-form-item label="打开时颜色">
      <el-color-picker v-model="form['active-color']" size="mini" />
    </el-form-item>
    <el-form-item label="关闭时颜色">
      <el-color-picker v-model="form['inactive-color']" size="mini" />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ElSwitchEdit',
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
};
</script>
