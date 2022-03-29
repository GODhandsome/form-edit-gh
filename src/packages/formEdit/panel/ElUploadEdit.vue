<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="上传地址" required>
      <el-input v-model="form['action']" />
    </el-form-item>
    <el-form-item label="文件字段名">
      <el-input v-model="form['name']" />
    </el-form-item>
    <el-form-item label="文件类型">
      <el-tooltip
        slot="label"
        class="item"
        effect="dark"
        content="接受上传的文件类型，多个类型使用,分隔"
        placement="left"
      >
        <div>文件类型<i class="el-icon-warning" /></div>
      </el-tooltip>
      <el-input v-model="form['accept']" placeholder="使用,分隔" />
    </el-form-item>
    <el-form-item label="最大上传数量">
      <el-input-number v-model="form['limit']" :min="1" />
    </el-form-item>
    <el-form-item label="是否支持多选">
      <el-switch v-model="form['multiple']" />
    </el-form-item>
    <el-form-item label="发送cookie">
      <el-switch v-model="form['with-credentials']" />
    </el-form-item>
    <el-form-item label="已上传列表">
      <el-switch v-model="form['show-file-list']" />
    </el-form-item>
    <el-form-item label="拖拽上传">
      <el-switch v-model="form['drag']" />
    </el-form-item>
    <el-form-item label="文件列表类型">
      <el-radio-group v-model="form['list-type']" size="mini">
        <el-radio-button label="text">文本</el-radio-button>
        <el-radio-button label="picture">图片</el-radio-button>
        <el-radio-button label="picture-card">图片卡</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="请求头">
      <el-button type="primary" icon="el-icon-plus" circle @click="handleAddHeaders(-1)" />
    </el-form-item>
    <el-row
      v-for="(item, index) in requestHeaders"
      :key="index + 'headers'"
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
          @click="handleAddHeaders(index)"
        />
        <i
          class="el-icon-remove"
          style="color: #f56c6c; cursor: pointer"
          @click="handleDeleteHeaders(index)"
        />
      </el-col>
    </el-row>

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
  </el-form>
</template>

<script>
export default {
  name: 'ElUploadEdit',
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
      requestParams: [],
      requestHeaders: [],
    };
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
        this.form.data = params;
      },
    },
    requestHeaders: {
      deep: true,
      handler(val) {
        if (!val || val.length <= 0) return;
        const headers = {};
        val.forEach(({ key, value }) => {
          headers[key] = value;
        });
        this.form.headers = headers;
      },
    },
  },
  mounted() {
    if (this.form.data) {
      const requestParams = [];
      Object.keys(this.form.data).forEach((key) => {
        requestParams.push({
          key,
          value: this.form.data[key],
        });
      });
      this.requestParams = requestParams;
    }
    if (this.form.headers) {
      const requestHeaders = [];
      Object.keys(this.form.headers).forEach((key) => {
        requestHeaders.push({
          key,
          value: this.form.headers[key],
        });
      });
      this.requestHeaders = requestHeaders;
    }
  },
  methods: {
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
    handleAddHeaders(index) {
      if (index > -1) {
        this.requestHeaders.splice(index + 1, 0, {
          key: '',
          value: '',
        });
      } else this.requestHeaders.push({ key: '', value: '' });
    },
    handleDeleteHeaders(index) {
      this.requestHeaders.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.input-number-wrapper {
  width: 100%;
}
</style>
