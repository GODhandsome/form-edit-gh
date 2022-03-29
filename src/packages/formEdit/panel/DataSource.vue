<template>
  <div>
    <el-form-item label="数据来源">
      <el-select :value="dataSource" placeholder="请选择数据来源" @change="handleChangeDataSource">
        <el-option
          v-for="item in DATA_SOURCE"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <template v-if="selectOptions && selectOptions.request">
      <el-form-item label="使用系统请求">
        <el-tooltip
          slot="label"
          class="item"
          effect="dark"
          content="使用当前系统传入请求，便于携带请求头参数等"
          placement="left"
        >
          <div>系统请求<i class="el-icon-warning" /></div>
        </el-tooltip>
        <el-switch v-model="selectOptions.request['useClientRequest']" />
      </el-form-item>
      <el-form-item label="数据属性值">
        <el-tooltip
          slot="label"
          class="item"
          effect="dark"
          content="写入data.a.b可以获取请求返回数据的值"
          placement="left"
        >
          <div>数据属性值<i class="el-icon-warning" /></div>
        </el-tooltip>
        <el-input v-model="selectOptions.request['listKey']" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="是否格式化">
        <el-tooltip
          slot="label"
          class="item"
          effect="dark"
          content="当返回数据key-value不是字段不是label-value时需要进行格式化"
          placement="left"
        >
          <div>是否格式化<i class="el-icon-warning" /></div>
        </el-tooltip>
        <el-switch v-model="selectOptions.request['isFormat']" />
      </el-form-item>

      <template v-if="selectOptions.request['isFormat']">
        <el-form-item label="标签属性值">
          <el-input v-model="selectOptions.request['labelKey']" />
        </el-form-item>
        <el-form-item label="属性属性值">
          <el-input v-model="selectOptions.request['valueKey']" />
        </el-form-item>
        <el-form-item label="子节点属性值">
          <el-input v-model="selectOptions.request['childKey']" />
        </el-form-item>
      </template>

      <el-form-item label="请求地址">
        <el-input v-model="selectOptions.request.config.url" />
      </el-form-item>
      <el-form-item label="请求参数">
        <el-button type="primary" icon="el-icon-plus" circle @click="handleAddParams(-1)" />
      </el-form-item>
      <el-row
        v-for="(item, index) in requestParams"
        :key="index + 'params'"
        :gutter="4"
        style="padding: 1px 0"
      >
        <el-col :span="10">
          <el-input v-model="item.key" placeholder="请求参数key" size="mini" />
        </el-col>
        <el-col :span="10">
          <el-input v-model="item.value" size="mini" placeholder="请求参数value" />
        </el-col>
        <el-col :span="4" style="line-height: 30px; text-align: center; font-size: 16px">
          <i
            class="el-icon-circle-plus"
            style="color: #409eff; cursor: pointer"
            @click="handleAddParams(index)"
          />
          <i
            class="el-icon-remove"
            style="color: #f56c6c; cursor: pointer"
            @click="handleDeleteParams(index)"
          />
        </el-col>
      </el-row>
    </template>

    <template v-if="selectOptions && selectOptions.permanent">
      <el-form-item label="固定选项">
        <el-button type="primary" icon="el-icon-plus" circle @click="handleAddOption(-1)" />
      </el-form-item>
      <el-row
        v-for="(item, index) in selectOptions.permanent"
        :key="index + 'fixed'"
        :gutter="4"
        style="padding: 1px 0"
      >
        <el-col :span="10">
          <el-input
            v-model="selectOptions.permanent[index].label"
            placeholder="展示文本"
            size="mini"
          />
        </el-col>
        <el-col :span="10">
          <el-input v-model="selectOptions.permanent[index].value" size="mini" placeholder="值" />
        </el-col>
        <el-col :span="4" style="line-height: 30px; text-align: center; font-size: 16px">
          <i
            class="el-icon-circle-plus"
            style="color: #409eff; cursor: pointer"
            @click="handleAddOption(index)"
          />
          <i
            class="el-icon-remove"
            style="color: #f56c6c; cursor: pointer"
            @click="handleDeleteOption(index)"
          />
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import { DATA_SOURCE } from './config';

export default {
  name: 'DataSource',
  props: {
    selectOptions: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      DATA_SOURCE,
      requestParams: [],
    };
  },
  computed: {
    dataSource() {
      if (this.selectOptions && this.selectOptions.permanent && this.selectOptions.request) {
        return 'mix';
      }
      if (this.selectOptions && this.selectOptions.permanent) {
        return 'permanent';
      }
      if (this.selectOptions && this.selectOptions.request) {
        return 'request';
      }
      return null;
    },
  },
  watch: {
    requestParams: {
      deep: true,
      handler(val) {
        if (!val || val.length <= 0) return;
        const params = {};
        val.forEach(({ key, value }) => {
          params[key] = value;
        });
        this.selectOptions.request.config.params = params;
      },
    },
  },
  mounted() {
    if (!this.selectOptions.request) return;
    if (!this.selectOptions.request.config) return;
    if (!this.selectOptions.request.config.params) return;
    const requestParams = [];
    Object.keys(this.selectOptions.request.config.params).forEach((key) => {
      requestParams.push({
        key,
        value: this.selectOptions.request.config.params[key],
      });
    });
    this.requestParams = requestParams;
  },
  methods: {
    handleChangeDataSource(val) {
      switch (val) {
        case 'permanent':
          if (!this.selectOptions.permanent) this.$set(this.selectOptions, 'permanent', []);
          this.$delete(this.selectOptions, 'request');
          this.requestParams = [];
          break;
        case 'request':
          if (!this.selectOptions.request) this.$set(this.selectOptions, 'request', { config: { params: {} } });
          this.$delete(this.selectOptions, 'permanent');
          break;
        case 'mix':
          if (!this.selectOptions.permanent) this.$set(this.selectOptions, 'permanent', []);
          if (!this.selectOptions.request) this.$set(this.selectOptions, 'request', { config: { params: {} } });
          break;
        default:
          break;
      }
    },
    handleAddOption(index) {
      if (index > -1) {
        this.selectOptions.permanent.splice(index + 1, 0, {
          label: '',
          value: '',
        });
      } else this.selectOptions.permanent.push({ label: '', value: '' });
    },
    handleDeleteOption(index) {
      this.selectOptions.permanent.splice(index, 1);
    },
    handleAddParams(index) {
      if (index > -1) {
        this.requestParams.splice(index + 1, 0, {
          key: '',
          value: '',
        });
      } else this.requestParams.push({ key: '', value: '' });
    },
    handleDeleteParams(index) {
      this.requestParams.splice(index, 1);
    },
  },
};
</script>
