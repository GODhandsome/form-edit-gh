<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="是否可搜索">
      <el-switch v-model="form['filterable']" />
    </el-form-item>
    <el-form-item label="是否可清空">
      <el-switch v-model="form['clearable']" />
    </el-form-item>
    <!-- 当前el版本无此功能 -->
    <!-- <el-form-item label="显示完整路径">
      <el-tooltip
        slot="label"
        class="item"
        effect="dark"
        content="输入框中是否显示选中值的完整路径"
        placement="left"
      >
        <div>显示完整路径<i class="el-icon-warning" /></div>
      </el-tooltip>
      <el-switch v-model="form['show-all-levels']" />
    </el-form-item> -->
    <el-form-item label="尺寸">
      <el-select v-model="form.size" placeholder="请选择尺寸">
        <el-option v-for="item in SIZE" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>

    <DataSource :select-options="selectOptions" />
    <DataFormat :format-value="formatValue" />
  </el-form>
</template>

<script>
import { SIZE } from './config';
import DataSource from './DataSource.vue';
import DataFormat from './DataFormat.vue';

export default {
  name: 'ElCascaderEdit',
  components: { DataSource, DataFormat },
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    selectOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    formatValue: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return { SIZE };
  },
  methods: {},
};
</script>
