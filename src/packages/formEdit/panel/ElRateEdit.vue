<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="最大分值">
      <el-input-number v-model="form.max" :min="0" />
    </el-form-item>
    <el-form-item label="是否允许半选">
      <el-switch v-model="form['allow-half']" />
    </el-form-item>
    <el-form-item label="辅助文字">
      <el-switch v-model="form['show-text']" />
    </el-form-item>

    <template v-if="form['show-text']">
      <el-form-item label="辅助文字颜色">
        <el-color-picker v-model="form['text-color']" size="mini" />
      </el-form-item>
      <el-form-item label="辅助文字组">
        <el-tooltip
          slot="label"
          class="item"
          effect="dark"
          content="请输入后点击回车或者选择创建文字，文字最好与最大分值保持相同数量"
          placement="left"
        >
          <div>辅助文字组<i class="el-icon-warning" /></div>
        </el-tooltip>
        <el-select
          v-model="form.texts"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请创建辅助文字"
        />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { SIZE, ALIGNS } from './config';

const DATE_TYPE = [
  {
    label: '年',
    value: 'year',
  },
  {
    label: '月',
    value: 'month',
  },
  {
    label: '日期',
    value: 'date',
  },
  {
    label: '日期时间',
    value: 'datetime',
  },
  {
    label: '范围日期时间',
    value: 'datetimerange',
  },
  {
    label: '范围日期',
    value: 'daterange',
  },
  {
    label: '范围月份',
    value: 'monthrange',
  },
];

const HAS_RANGE = ['datetimerange', 'daterange', 'monthrange'];

export default {
  name: 'ElRateEdit',
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { SIZE, ALIGNS, DATE_TYPE };
  },
  computed: {
    isRange() {
      return HAS_RANGE.includes(this.form.type);
    },
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
