<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="最大长度">
      <el-input-number v-model="form.maxlength" :min="0" />
    </el-form-item>
    <el-form-item label="是否可清空">
      <el-switch v-model="form.clearable" />
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
    <el-form-item>
      <el-tooltip
        slot="label"
        class="item"
        effect="dark"
        content="参考element icon, 如输入el-icon-edit"
        placement="left"
      >
        <div>尾部图标<i class="el-icon-warning" /></div>
      </el-tooltip>
      <el-input v-model="form['suffix-icon']" />
    </el-form-item>
    <el-form-item label="自动补全">
      <el-switch v-model="form.autocomplete" active-value="on" inactive-value="off" />
    </el-form-item>
    <el-form-item label="文本框类型">
      <el-select v-model="form.type" placeholder="请选择类型">
        <el-option v-for="item in TYPE" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="form.type === 'textarea' || form.type === 'text'" label="字数统计">
      <el-switch v-model="form['show-word-limit']" />
    </el-form-item>
    <el-form-item v-if="form.type !== 'textarea'" label="尺寸">
      <el-select v-model="form.size" placeholder="请选择尺寸">
        <el-option v-for="item in SIZE" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <template v-if="form.type === 'textarea'">
      <el-form-item label="是否自适应高度">
        <el-switch v-model="customRow" />
      </el-form-item>
      <el-form-item v-if="!customRow" label="输入框行数">
        <el-input-number v-model="form.rows" :min="2" />
      </el-form-item>
      <el-form-item v-else label="自适应高度">
        <el-row>
          <el-col :span="8"
            ><el-input-number
              v-model="form.autosize.minRows"
              :controls="false"
              :min="2"
              class="input-number-wrapper"
          /></el-col>
          <el-col :span="4" style="text-align: center">至</el-col>
          <el-col :span="8"
            ><el-input-number
              v-model="form.autosize.maxRows"
              :controls="false"
              :min="2"
              class="input-number-wrapper"
          /></el-col>
          <el-col :span="4" style="text-align: center">行</el-col>
        </el-row>
      </el-form-item>
    </template>
    <template v-if="form.type === 'password'">
      <el-form-item label="显示密码图标">
        <el-switch v-model="form['show-password']" />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import { SIZE, INPUT_TYPE } from './config';

export default {
  name: 'ElInputEdit',
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
      TYPE: INPUT_TYPE,
      SIZE,
      customRow: false,
    };
  },
  watch: {
    customRow(newVal) {
      if (newVal) {
        this.$delete(this.form, 'rows');
        this.$set(this.form, 'autosize', { minRows: 2, maxRows: 4 });
      } else {
        this.$delete(this.form, 'autosize');
      }
    },
  },
  methods: {},
};
</script>

<style scoped>
.input-number-wrapper {
  width: 100%;
}
</style>
