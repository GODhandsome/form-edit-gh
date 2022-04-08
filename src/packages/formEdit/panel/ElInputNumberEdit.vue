<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="最小值">
      <el-input-number v-model="form.min" />
    </el-form-item>
    <el-form-item label="最大值">
      <el-input-number v-model="form.max" />
    </el-form-item>
    <el-form-item label="计数器步长">
      <el-input-number v-model="form.step" />
    </el-form-item>
    <el-form-item label="数值精度">
      <el-input-number v-model="form.precision" />
    </el-form-item>
    <!-- <el-form-item label="尺寸">
      <el-select v-model="form.size" placeholder="请选择尺寸">
        <el-option v-for="item in SIZE" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="控制按钮">
      <el-switch v-model="form.controls" />
    </el-form-item>
    <el-form-item v-if="form.controls" label="控制按钮位置">
      <el-select v-model="form['controls-position']" placeholder="请选择控制按钮位置">
        <el-option
          v-for="item in CONTROL_POSITION"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { SIZE, NUMBER_CONTROL_POSITION } from './config';

export default {
  name: 'ElInputNumberEdit',
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      CONTROL_POSITION: NUMBER_CONTROL_POSITION,
      SIZE,
    };
  },
  watch: {},
  methods: {},
};
</script>
<style scoped>
.input-number-wrapper {
  width: 100%;
}
</style>
