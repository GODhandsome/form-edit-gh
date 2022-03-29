<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="最小值">
      <el-input-number v-model="form.min" />
    </el-form-item>
    <el-form-item label="最大值">
      <el-input-number v-model="form.max" />
    </el-form-item>
    <el-form-item label="步长">
      <el-input-number v-model="form.step" />
    </el-form-item>
    <el-form-item label="显示间断点">
      <el-switch v-model="form['show-stops']" />
    </el-form-item>
    <el-form-item label="显示提示">
      <el-switch v-model="form['show-tooltip']" />
    </el-form-item>
    <el-form-item label="显示输入框">
      <el-switch v-model="form['show-input']" />
    </el-form-item>
    <template v-if="form['show-input']">
      <el-form-item label="输入框控制器">
        <el-switch v-model="form['show-input-controls']" />
      </el-form-item>
      <el-form-item label="尺寸">
        <el-select v-model="form['input-size']" placeholder="请选择尺寸">
          <el-option
            v-for="item in SIZE"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="输入延迟">
        <el-input-number v-model="form.debounce" :min="0" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { SIZE } from './config';

export default {
  name: 'ElSliderEdit',
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { SIZE };
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
