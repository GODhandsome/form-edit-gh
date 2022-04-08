<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="边框">
      <el-switch v-model="form.hit" />
    </el-form-item>
    <el-form-item label="标签类型">
      <el-select v-model="form.type" clearable placeholder="请选择类型">
        <el-option
          v-for="item in TAG_TYPE"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="主题">
      <el-select v-model="form.effect" clearable placeholder="请选择主题">
        <el-option
          v-for="item in THEME"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- <el-form-item label="尺寸">
      <el-select v-model="form.size" clearable placeholder="请选择尺寸">
        <el-option v-for="item in SIZE" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item> -->

    <el-form-item label="背景色">
      <el-color-picker v-model="form.color" />
    </el-form-item>
  </el-form>
</template>

<script>
import { SIZE } from './config';

const TAG_TYPE = [
  {
    label: '成功',
    value: 'success',
  },
  {
    label: '信息',
    value: 'info',
  },
  {
    label: '警告',
    value: 'warning',
  },
  {
    label: '危险',
    value: 'danger',
  },
];

const THEME = [
  {
    label: '暗',
    value: 'dark',
  },
  {
    label: '光',
    value: 'light',
  },
  {
    label: '朴素',
    value: 'plain',
  },
];

export default {
  name: 'ElTagEdit',
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { TAG_TYPE, SIZE, THEME };
  },
  methods: {},
};
</script>
