<template>
  <div>
    <h4 class="title">
      <span style="padding-right: 20px">校验属性</span>
      <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="handleAddRule" />
    </h4>
    <div v-for="(item, index) in rules" :key="index + 'rule'" class="rule-wrapper">
      <el-row :gutter="4" class="el-row">
        <el-col :span="8" class="item-title">校验类型</el-col>
        <el-col :span="8">
          <el-select v-model="rules[index].type" size="medium" clearable>
            <el-option
              v-for="item in TYPE"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col v-if="rules[index].type === 'min' || rules[index].type === 'max'" :span="8">
          <el-input-number
            v-model="rules[index].specialProp"
            :controls="false"
            :min="1"
            size="medium"
            placeholder="值"
            style="width: 100%"
          />
        </el-col>
        <el-col v-else-if="rules[index].type === 'pattern'" :span="8">
          <el-input
            v-model="rules[index].specialProp"
            placeholder="正则表达式"
            style="width: 100%"
          />
        </el-col>
      </el-row>
      <el-row :gutter="4" class="el-row">
        <el-col :span="8">
          <el-select v-model="rules[index].trigger" size="medium" clearable placeholder="触发">
            <el-option
              v-for="item in TRIGGER"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="14">
          <el-input v-model="rules[index].message" size="medium" placeholder="错误提示" />
        </el-col>
        <el-col :span="2"
          ><i
            class="el-icon-remove"
            style="color: #f56c6c; cursor: pointer; line-height: 32px; font-size: 16px"
            @click="handleDeleteRule(index)"
        /></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';

const TYPE = [
  { label: '必选', value: 'required' },
  { label: '最小长度', value: 'min' },
  { label: '最大长度', value: 'max' },
  { label: '字符串', value: 'string' },
  { label: '数值', value: 'number' },
  { label: '布尔值', value: 'boolean' },
  { label: '地址', value: 'url' },
  { label: '邮箱', value: 'email' },
  { label: '正则', value: 'pattern' },
];

const TRIGGER = [
  { label: '失焦', value: 'blur' },
  { label: '改变', value: 'change' },
];

export default {
  name: 'EditRules',
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
      TRIGGER,
      rules: [],
    };
  },
  watch: {
    rules: {
      deep: true,
      handler: debounce(function (newVal) {
        const rules = newVal.map(({
          specialProp, type, message, trigger,
        }) => {
          const rule = { message, trigger };
          switch (type) {
            case 'required':
              rule.required = true;
              break;
            case 'min':
              if (specialProp) rule.min = specialProp;
              break;
            case 'max':
              if (specialProp) rule.max = specialProp;
              break;
            case 'pattern':
              // eslint-disable-next-line no-eval
              if (specialProp) rule.pattern = eval(specialProp);
              break;
            default:
              rule.type = type;
              break;
          }
          return rule;
        });
        this.$set(this.form, 'rules', rules);
      }, 100),
    },
  },

  methods: {
    handleAddRule() {
      this.rules.push({});
    },
    handleDeleteRule(index) {
      this.rules.splice(index, 1);
    },
    resetRules(newVal) {
      if (!newVal.rules || newVal.rules.length <= 0) {
        this.rules = [];
        return;
      }
      const rules = newVal.rules.map(({
        required, min, max, type, message, trigger,
      }) => {
        const rule = { message, trigger };
        if (required) rule.type = 'required';
        else if (min) {
          rule.type = 'min';
          rule.specialProp = min;
        } else if (max) {
          rule.type = 'max';
          rule.specialProp = max;
        } else rule.type = type;
        return rule;
      });
      this.rules = rules || [];
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

.rule-wrapper {
  padding: 10px 5px 0;
  margin-bottom: 10px;
  border: 1px dashed #d6d6d6;
  border-radius: 8px;
}

.el-row {
  padding-bottom: 10px;
}

.item-title {
  vertical-align: middle;
  font-size: 14px;
  color: #606266;
  line-height: 32px;
  padding: 0 12px 0 0;
  font-weight: 700;
}
</style>
