<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <el-form-item label="透明度选择">
      <el-switch v-model="form['show-alpha']" @change="handleChangeAlpha" />
    </el-form-item>
    <el-form-item label="尺寸">
      <el-select v-model="form.size" placeholder="请选择尺寸">
        <el-option v-for="item in SIZE" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="预定义颜色">
      <el-button type="primary" icon="el-icon-plus" circle @click="handleAddColor" />
    </el-form-item>
    <div v-if="form.predefine">
      <div v-for="(item, index) in form.predefine" :key="index" class="color-wrapper">
        <el-color-picker v-model="form.predefine[index]" color-format="rgb" />
        <i class="el-icon-error" @click="handleDeleteColor(index)" />
      </div>
    </div>
  </el-form>
</template>

<script>
import { SIZE } from './config';

export default {
  name: 'ElColorEdit',
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
      SIZE,
    };
  },
  watch: {},
  methods: {
    handleAddColor() {
      if (this.form.predefine) {
        this.form.predefine.push(
          `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(
            Math.random() * 256,
          )})`,
        );
      } else this.$set(this.form, 'predefine', ['rgb(255,255,255)']);
    },
    handleDeleteColor(index) {
      this.form.predefine.splice(index, 1);
    },
    handleChangeAlpha(val) {
      this.$set(this.form, 'color-format', val ? 'rgb' : 'hex');
    },
  },
};
</script>

<style scoped>
.color-wrapper {
  position: relative;
  display: inline-block;
  padding: 5px;
}

.color-wrapper:hover .el-icon-error {
  display: block;
}

.el-icon-error {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 18px;
  color: rgb(255, 0, 0);
  cursor: pointer;
}
</style>
