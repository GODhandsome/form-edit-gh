<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="无数据文字">
      <el-input v-model="form['no-data-text']" />
    </el-form-item>
    <el-form-item label="是否可清空">
      <el-switch v-model="form['clearable']" />
    </el-form-item>
    <el-form-item label="是否可搜索">
      <el-switch v-model="form['filterable']" />
    </el-form-item>
    <template v-if="form.filterable">
      <el-form-item label="无匹配文字">
        <el-input v-model="form['no-match-text']" />
      </el-form-item>
    </template>
    <el-form-item label="是否多选">
      <el-switch v-model="form['multiple']" />
    </el-form-item>
    <template v-if="form.multiple">
      <el-form-item label="仅显示选中数">
        <el-tooltip
          slot="label"
          class="item"
          effect="dark"
          content="多选时是否将选中值按文字的形式展示"
          placement="left"
        >
          <div>仅显示选中数<i class="el-icon-warning" /></div>
        </el-tooltip>
        <el-switch v-model="form['collapse-tags']" />
      </el-form-item>
      <el-form-item label="多选上限">
        <el-tooltip
          slot="label"
          class="item"
          effect="dark"
          content="多选时用户最多可以选择的项目数，为 0 则不限制"
          placement="left"
        >
          <div>多选上限<i class="el-icon-warning" /></div>
        </el-tooltip>
        <el-input-number v-model="form['multiple-limit']" :min="0" />
      </el-form-item>
    </template>

    <DataSource :select-options="selectOptions" />
  </el-form>
</template>

<script>
import DataSource from './DataSource.vue';

export default {
  name: 'ElSelectEdit',
  components: { DataSource },
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
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.input-number-wrapper {
  width: 100%;
}
</style>
