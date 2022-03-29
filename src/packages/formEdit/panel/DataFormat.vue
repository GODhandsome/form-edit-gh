<template>
  <div>
    <el-form-item label="数据截取类型">
      <el-tooltip
        slot="label"
        class="item"
        effect="dark"
        content="最后一位：取数组最后一位，指定序号：取指定序号数据，范围截取：截取指定序号范围内数据"
        placement="left"
      >
        <div>数据截取类型<i class="el-icon-warning" /></div>
      </el-tooltip>
      <el-select :value="formatType" @change="handleChangeType">
        <el-option value="last" label="最后一位" />
        <el-option value="index" label="指定序号" />
        <el-option value="slice" label="范围截取" />
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="formatValue.index !== 'last' && !formatValue.slice"
      v-model="formatValue.index"
      label="序号"
    >
      <el-input-number v-model="formatValue.index" :min="1" :precision="0" />
    </el-form-item>
    <template v-else-if="formatValue.slice">
      <el-row :gutter="4">
        <el-col :span="12">
          <el-input-number
            v-model="formatValue.slice[0]"
            :min="1"
            :precision="0"
            placeholder="起始序号"
            size="mini"
          />
        </el-col>
        <el-col :span="12">
          <el-input-number
            v-model="formatValue.slice[1]"
            :min="1"
            :precision="0"
            size="mini"
            placeholder="终止序号"
          />
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
export default {
  name: 'DataFormat',
  props: {
    formatValue: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    formatType() {
      if (this.formatValue.index === 'last') {
        return 'last';
      }
      if (this.formatValue.index) {
        return 'index';
      }
      if (this.formatValue.slice) {
        return 'slice';
      }
      return null;
    },
  },
  created() {
    this.formatValue.type = 'array';
  },
  methods: {
    handleChangeType(val) {
      switch (val) {
        case 'last':
          this.$delete(this.formatValue, 'slice');
          this.$set(this.formatValue, 'index', 'last');
          break;
        case 'index':
          this.$delete(this.formatValue, 'slice');
          this.$set(this.formatValue, 'index', 1);
          break;
        case 'slice':
          this.$delete(this.formatValue, 'index');
          this.$set(this.formatValue, 'slice', []);
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.input-number-wrapper {
  width: 100%;
}
</style>
