<template>
  <el-form
    ref="form"
    :model="currentForm"
    :rules="formRules"
    :label-width="labelWidth"
    class="el-form"
  >
    <template v-for="item in list">
      <el-form-item
        v-if="(isEdit && !item.editHidden) || (!isEdit && !item.addHidden)"
        :key="item.fieldCode"
        :label="item.label"
        :prop="item.fieldCode"
        :class="item.rules && item.rules.length > 0 ? 'rule-item' : ''"
      >
        <el-cascader
          v-if="item.elType === 'el-cascader'"
          :options="item.selectOptions.optionList"
          v-model="currentForm[item.fieldCode]"
          :disabled="item.disabled || (!item.canEdit && isEdit)"
          :placeholder="item.placeholder"
          v-bind="item.extraProps"
          class="input-wrapper"
        />
        <el-upload
          v-else-if="item.elType === 'el-upload'"
          v-model="currentForm[item.fieldCode]"
          :placeholder="item.placeholder"
          v-bind="item.extraProps"
          class="input-wrapper"
          ><el-button
            v-if="item.extraProps && item.extraProps['list-type'] !== 'picture-card'"
            size="small"
            type="primary"
            >点击上传</el-button
          ></el-upload
        >
        <el-checkbox-group
          v-else-if="item.elType === 'el-checkbox'"
          v-model="currentForm[item.fieldCode]"
          :disabled="item.disabled || (!item.canEdit && isEdit)"
          :placeholder="item.placeholder"
          v-bind="item.extraProps"
          class="input-wrapper"
        >
          <template v-if="item.selectOptions && item.selectOptions.optionList">
            <el-checkbox
              v-for="checkboxItem in item.selectOptions.optionList"
              :key="checkboxItem.value"
              :label="checkboxItem.value"
              >{{ checkboxItem.label }}</el-checkbox
            >
          </template>
        </el-checkbox-group>
        <el-radio-group
          v-else-if="item.elType === 'el-radio'"
          v-model="currentForm[item.fieldCode]"
          :disabled="item.disabled || (!item.canEdit && isEdit)"
          :placeholder="item.placeholder"
          v-bind="item.extraProps"
          class="input-wrapper"
        >
          <template v-if="item.selectOptions && item.selectOptions.optionList">
            <el-radio
              v-for="radioItem in item.selectOptions.optionList"
              :key="radioItem.value"
              :label="radioItem.value"
              >{{ radioItem.label }}</el-radio
            >
          </template>
        </el-radio-group>
        <el-select
          v-else-if="item.elType === 'el-select'"
          v-model="currentForm[item.fieldCode]"
          :disabled="item.disabled || (!item.canEdit && isEdit)"
          :placeholder="item.placeholder"
          v-bind="item.extraProps"
          class="input-wrapper"
        >
          <template v-if="item.selectOptions && item.selectOptions.optionList">
            <el-option
              v-for="selectItem in item.selectOptions.optionList"
              :key="selectItem.value"
              :label="selectItem.label"
              :value="selectItem.value"
            />
          </template>
        </el-select>
        <component
          v-else-if="item.elType === 'el-tag'"
          :is="item.elType"
          v-model="currentForm[item.fieldCode]"
          :placeholder="item.placeholder"
          v-bind="item.extraProps"
          >{{ currentForm[item.fieldCode] || item.content }}</component
        >
        <component
          v-else
          :is="item.elType"
          v-model="currentForm[item.fieldCode]"
          :disabled="item.disabled || (!item.canEdit && isEdit)"
          :placeholder="item.placeholder"
          v-bind="item.extraProps"
          class="input-wrapper"
        />
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import axios from 'axios';

const VALUE_TYPE = {
  number: Number,
  boolean: Boolean,
  string: String,
};

export default {
  name: 'CustomerForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    clientRequest: {
      type: Function,
      default() {},
    },
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
    labelWidth: {
      type: String,
      default: '120px',
    },
  },
  data() {
    return {
      previewData: {},
    };
  },
  computed: {
    formRules() {
      const rules = {};
      this.list.forEach((item) => {
        rules[item.fieldCode] = item.rules || [];
      });
      return rules;
    },
    currentForm() {
      return this.isPreview ? this.previewData : this.form;
    },
  },
  watch: {
    list(value) {
      this.initFormSelect(value);
    },
  },
  created() {
    this.initFormSelect(this.list);
  },
  methods: {
    handleClose() {
      this.$emit('handleChangeVisible', false);
    },
    initFormSelect(list) {
      // 当下拉框 单选 多选 需要发出请求获取数据时需要获取数据
      if (!list || list.length <= 0) return;
      list
        .filter((item) => {
          const { selectOptions } = item;
          return selectOptions && (selectOptions.request || selectOptions.permanent);
        })
        .forEach((item) => {
          const {
            valueType,
            selectOptions: { request, permanent = [] },
          } = item;
          const {
            useClientRequest,
            labelKey,
            valueKey,
            childKey = 'children',
            listKey,
            isFormat,
            config,
          } = request || {};
          const currentRequest = useClientRequest ? this.clientRequest : this.selectRequest;
          if (!request || Object.getOwnPropertyNames(request).length === 0) {
            // 当没有请求时直接使用固定选项
            this.$set(item.selectOptions, 'optionList', [...permanent]);
            this.$forceUpdate();
            return;
          }
          currentRequest(config).then((data) => {
            try {
              // eslint-disable-next-line no-new-func
              const options = new Function('data', `return data.${listKey}`)(data);
              const requestList = isFormat
                ? this.formatOptions(options, labelKey, valueKey, childKey, valueType)
                : options;
              this.$set(item.selectOptions, 'optionList', [...permanent, ...requestList]);
              this.$forceUpdate();
            } catch (error) {
              console.error(error);
            }
          });
        });
    },
    formatOptions(list, labelKey, valueKey, childKey, valueType) {
      return list.map((item) => {
        const obj = {
          label: item[labelKey],
          value: valueType ? VALUE_TYPE[valueType](item[valueKey]) : item[valueKey],
        };
        if (item[childKey]) {
          obj.children = this.formatOptions(item[childKey], labelKey, valueKey, childKey);
        }
        return obj;
      });
    },
    selectRequest(config) {
      return axios(config).then(({ data }) => data);
    },
    formatValues() {
      // 用于格式化返回数据
      const values = { ...this.form };
      this.list.forEach((item) => {
        const { fieldCode } = item;
        const formatValue = this.formatValue(item);
        if (formatValue) values[fieldCode] = this.formatValue(item);
      });
      return values;
    },
    resetForm(value) {
      if (!value) return;
      this.list.forEach((item) => {
        // 防止checkbox没有默认值报错问题
        if (item.elType === 'el-checkbox' && !this.form[item.fieldCode]) {
          this.$set(this.form, item.fieldCode, []);
        }
      });
      if (this.$refs.form) this.$refs.form.resetFields();
      if (this.isPreview) {
        this.previewData = {};
        this.list.forEach((item) => {
          // 防止checkbox没有默认值报错问题
          if (item.elType === 'el-checkbox' && !this.previewData[item.fieldCode]) {
            this.$set(this.previewData, item.fieldCode, []);
          }
        });
        this.$nextTick(() => {
          if (this.$refs.form) this.$refs.form.clearValidate();
        });
      }
    },
    formatValue(item) {
      const { valueType, fieldCode, formatValue } = item;
      let value = this.form[fieldCode];
      if (!value) return value;
      try {
        const { type, index, slice } = formatValue;
        switch (type) {
          case 'array':
            if (!Array.isArray(value)) break;
            if (index || index === 0) {
              value = index === 'last' ? value.slice(-1)[0] : value[index - 1];
            }
            if (slice) {
              value = value.slice(slice[0] - 1, slice[1]);
            }
            break;

          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
      // 返回用户想要的数据类型
      try {
        if (Array.isArray(value)) value = value.map(VALUE_TYPE[valueType]);
        else {
          value = VALUE_TYPE[valueType](value);
        }
      } catch (error) {
        console.error(error);
      }

      return value;
    },
    async handleSubmit() {
      await this.$refs.form.validate();
      const values = this.formatValues();
      this.$emit('handleSubmit', values, this.isEdit);
    },
  },
};
</script>

<style scoped>
.validate-item {
  margin-bottom: 15px;
}

.input-wrapper {
  width: 100%;
}

.input-wrapper /deep/ .el-input__inner {
  text-align: left;
}

.el-form .rule-item {
  margin-bottom: 15px;
}
</style>
