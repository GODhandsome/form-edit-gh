<template>
  <el-form
    ref="form"
    :model="form"
    size="medium"
    label-width="100px"
    style="padding: 10px"
    label-position="left"
  >
    <h4 class="title">基本属性</h4>
    <el-form-item label="标题">
      <el-input v-model="form.label" />
    </el-form-item>
    <!-- <el-form-item label="属性值">
      <el-tooltip
        slot="label"
        class="item"
        effect="dark"
        content="对应数据库表字段"
        placement="left"
      >
        <div>属性值<i class="el-icon-warning" /></div>
      </el-tooltip>
      <el-input v-model="form.fieldCode" />
    </el-form-item> -->
    <el-form-item label="占位内容">
      <el-input v-model="form.placeholder" />
    </el-form-item>
    <el-form-item label="数据类型">
      <el-select v-model="form.valueType" placeholder="请选择数据类型">
        <el-option
          v-for="item in VALUE_TYPE"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="form.elType" placeholder="请选择类型" @change="handleChangeType">
        <el-option v-for="item in TYPE" :label="item.label" :value="item.value" :key="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item v-if="form.elType === 'el-tag'" label="标签文本">
      <el-input v-model="form.content" />
    </el-form-item>
    <el-form-item label="是否禁用">
      <el-switch v-model="form.disabled" />
    </el-form-item>
    <el-form-item label="是否可编辑">
      <el-switch v-model="form.canEdit" />
    </el-form-item>
    <el-form-item label="新增时隐藏">
      <el-switch v-model="form.addHidden" />
    </el-form-item>
    <el-form-item label="编辑时隐藏">
      <el-switch v-model="form.editHidden" />
    </el-form-item>
    <template v-if="form.elType">
      <h4 class="title">额外属性</h4>
      <component
        :is="COMPONENTS[form.elType]"
        :form="form.extraProps"
        :select-options="form.selectOptions"
        :format-value="form.formatValue"
      />
    </template>
  </el-form>
</template>

<script>
import ElInputEdit from './ElInputEdit.vue';
import ElInputNumberEdit from './ElInputNumberEdit.vue';
import ElSwitchEdit from './ElSwitchEdit.vue';
import ElSliderEdit from './ElSliderEdit.vue';
import ElTimePickerEdit from './ElTimePickerEdit.vue';
import ElDatePickerEdit from './ElDatePickerEdit.vue';
import ElRateEdit from './ElRateEdit.vue';
import ElColorPickerEdit from './ElColorPickerEdit.vue';
import ElRadioEdit from './ElRadioEdit.vue';
import ElCheckboxEdit from './ElCheckboxEdit.vue';
import ElSelectEdit from './ElSelectEdit.vue';
import ElCascaderEdit from './ElCascaderEdit.vue';
import ElUploadEdit from './ElUploadEdit.vue';
import ElTagEdit from './ElTagEdit.vue';

const COMPONENTS = {
  'el-input': 'ElInputEdit',
  'el-input-number': 'ElInputNumberEdit',
  'el-switch': 'ElSwitchEdit',
  'el-slider': 'ElSliderEdit',
  'el-time-picker': 'ElTimePickerEdit',
  'el-date-picker': 'ElDatePickerEdit',
  'el-rate': 'ElRateEdit',
  'el-color-picker': 'ElColorPickerEdit',
  'el-radio': 'ElRadioEdit',
  'el-checkbox': 'ElCheckboxEdit',
  'el-select': 'ElSelectEdit',
  'el-cascader': 'ElCascaderEdit',
  'el-upload': 'ElUploadEdit',
  'el-tag': 'ElTagEdit',
};
const TYPE = [
  { label: '输入框', value: 'el-input' },
  { label: '计数器', value: 'el-input-number' },
  { label: '开关', value: 'el-switch' },
  { label: '滑块', value: 'el-slider' },
  { label: '时间选择器', value: 'el-time-picker' },
  { label: '日期选择器', value: 'el-date-picker' },
  { label: '评分', value: 'el-rate' },
  { label: '颜色', value: 'el-color-picker' },
  { label: '单选框', value: 'el-radio' },
  { label: '多选框', value: 'el-checkbox' },
  { label: '下拉选择框', value: 'el-select' },
  { label: '级联选择器', value: 'el-cascader' },
  { label: '上传', value: 'el-upload' },
  { label: '标签', value: 'el-tag' },
];
const VALUE_TYPE = [
  { label: '字符', value: 'string' },
  { label: '数值', value: 'number' },
  { label: '布尔', value: 'boolean' },
];
export default {
  name: 'EditForm',
  components: {
    ElInputEdit,
    ElInputNumberEdit,
    ElSwitchEdit,
    ElSliderEdit,
    ElTimePickerEdit,
    ElDatePickerEdit,
    ElRateEdit,
    ElColorPickerEdit,
    ElRadioEdit,
    ElCheckboxEdit,
    ElSelectEdit,
    ElCascaderEdit,
    ElUploadEdit,
    ElTagEdit,
  },
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
      TYPE,
      VALUE_TYPE,
      COMPONENTS,
    };
  },

  methods: {
    handleChangeType(val) {
      if (!this.form.extraProps) {
        this.$set(this.form, 'extraProps', {});
      }
      if (!this.form.selectOptions) {
        this.$set(this.form, 'selectOptions', {});
      }
      if (!this.form.formatValue && val === 'el-cascader') {
        this.$set(this.form, 'formatValue', {});
      }
    },
  },
};
</script>

<style scoped>
.title {
  margin: 0;
  padding: 10px 0;
  font-size: 18px;
}

.title:nth-of-type(n):not(:first-child) {
  border-top: 1px solid #d6d6d6;
}
</style>
