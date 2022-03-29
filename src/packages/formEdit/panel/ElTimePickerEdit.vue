<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="只读">
      <el-switch v-model="form['readonly']" />
    </el-form-item>
    <el-form-item label="文本框可输入">
      <el-switch v-model="form['editable']" />
    </el-form-item>
    <el-form-item label="清除按钮">
      <el-switch v-model="form['clearable']" />
    </el-form-item>
    <el-form-item>
      <el-tooltip
        slot="label"
        class="item"
        effect="dark"
        content="参考element icon, 如输入el-icon-edit"
        placement="left"
      >
        <div>头部图标<i class="el-icon-warning" /></div>
      </el-tooltip>
      <el-input v-model="form['prefix-icon']" />
    </el-form-item>
    <el-form-item label="返回值格式">
      <el-tooltip
        slot="label"
        class="item"
        effect="dark"
        content="参考element时间格式"
        placement="left"
      >
        <div>返回值格式<i class="el-icon-warning" /></div>
      </el-tooltip>
      <el-input v-model="form['start-placeholder']" />
    </el-form-item>
    <el-form-item label="尺寸">
      <el-select v-model="form['size']" placeholder="请选择尺寸">
        <el-option v-for="item in SIZE" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="对齐方式">
      <el-select v-model="form['align']" placeholder="请选择对齐方式">
        <el-option
          v-for="item in ALIGNS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="是否范围选择">
      <el-switch v-model="form['is-range']" />
    </el-form-item>
    <template v-if="form['is-range']">
      <el-form-item label="开始占位内容">
        <el-input v-model="form['start-placeholder']" />
      </el-form-item>
      <el-form-item label="结束占位内容">
        <el-input v-model="form['end-placeholder']" />
      </el-form-item>
      <el-form-item label="分隔符">
        <el-input v-model="form['range-separator']" :maxlength="1" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { SIZE, ALIGNS } from './config';

export default {
  name: 'ElTimePickerEdit',
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { SIZE, ALIGNS };
  },
  watch: {},
  methods: {},
};
</script>
