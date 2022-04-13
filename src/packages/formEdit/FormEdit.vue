<template>
  <el-container class="container">
    <el-main style="display: flex; flex-direction: column; height: 100%">
      <div>
        <el-button type="primary" @click="handleAddFormItem">增加</el-button>
        <el-button type="primary" @click="handlePreview">预览</el-button>
      </div>
      <el-form
        :rules="formRules"
        :model="formData"
        :validate-on-rule-change="false"
        label-width="120px"
        class="form"
      >
        <SlickList
          id="SlickList"
          ref="list2"
          v-model="editList"
          :distance="10"
          style="height: 100%; overflow: auto"
          lock-axis="y"
          helper-class="drag-item"
        >
          <div
            v-if="addIndex !== null"
            :style="`transform: translate3d( 0, ${topHeight}px, 0)`"
            class="line"
          />
          <SlickItem
            v-for="(item, index) in editList"
            :index="index"
            :key="item.label + index"
            :collection="1"
            :style="`transform: translate3d( 0, ${addIndex > index ? '-5px' : 0}, 0)`"
            class="slick-item"
          >
            <div
              :class="item === currentDetail ? 'select-form-item' : ''"
              :index="index + 1"
              class="form-item-wrapper"
              @click="handleSelectItem(item, index)"
            >
              <el-form-item :label="item.label" :prop="item.fieldCode" class="form-item">
                <el-radio-group v-if="item.elType === 'el-radio'" v-bind="item.extraProps">
                  <el-radio :label="1">选项一</el-radio>
                  <el-radio :label="2">选项二</el-radio>
                  <el-radio :label="3">选项三</el-radio>
                </el-radio-group>
                <el-checkbox-group
                  v-else-if="item.elType === 'el-checkbox'"
                  v-bind="item.extraProps"
                  v-model="checkboxGroup"
                >
                  <el-checkbox :label="1">选项一</el-checkbox>
                  <el-checkbox :label="2">选项二</el-checkbox>
                  <el-checkbox :label="3">选项三</el-checkbox>
                </el-checkbox-group>
                <el-select
                  v-else-if="item.elType === 'el-select'"
                  v-model="formData[item.fieldCode]"
                  :placeholder="item.placeholder"
                  class="input-wrapper"
                />
                <el-upload
                  v-else-if="item.elType === 'el-upload'"
                  v-model="formData[item.fieldCode]"
                  :placeholder="item.placeholder"
                  v-bind="item.extraProps"
                  action="123"
                  class="input-wrapper"
                  ><el-button
                    v-if="item.extraProps && item.extraProps['list-type'] !== 'picture-card'"
                    size="small"
                    type="primary"
                    >点击上传</el-button
                  ></el-upload
                >
                <component
                  v-else-if="item.elType === 'el-tag'"
                  :is="item.elType"
                  v-model="formData[item.fieldCode]"
                  :placeholder="item.placeholder"
                  v-bind="item.extraProps"
                  autocomplete="off"
                  >{{ item.content }}</component
                >
                <component
                  v-else
                  :is="item.elType"
                  v-model="formData[item.fieldCode]"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder"
                  v-bind="item.extraProps"
                  autocomplete="off"
                  class="input-wrapper"
                />
              </el-form-item>
              <i class="el-icon-delete" @click="handleDeleteItem(index)" />
            </div>
          </SlickItem>
        </SlickList>
      </el-form>
    </el-main>
    <el-aside width="25%" style="border-left: 1px solid #d8dce5" class="aside-wrapper">
      <el-tabs v-if="isSelectItem" v-model="tabName" class="tab">
        <el-tab-pane label="基本配置" name="basicConfig">
          <el-scrollbar class="scrollbar" wrap-class="custom-scrollbar-wrapper">
            <EditForm :form="currentDetail" />
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="校验配置" name="ruleConfig">
          <EditRules ref="rulesEl" :form="currentDetail" />
        </el-tab-pane>
      </el-tabs>
      <div v-else class="empty-wrapper">
        <p>请选择编辑条目</p>
      </div>
    </el-aside>
    <PreviewDialog
      :dialogVisible="previewDialogVisible"
      :list="previewData"
      @handleChangeVisible="previewDialogVisible = false"
    />
  </el-container>
</template>

<script>
import { cloneDeep } from 'lodash';
import { SlickList, SlickItem } from 'vue-slicksort';

import EditForm from './panel/EditForm.vue';
import EditRules from './panel/EditRules.vue';
import PreviewDialog from '../components/PreviewDialog.vue';

import randomString from '../utils/randomString';

export default {
  name: 'FormEdit',
  components: {
    EditForm,
    EditRules,
    SlickItem,
    SlickList,
    PreviewDialog,
  },
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: Array,
      require: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      addIndex: null,
      tabName: 'basicConfig',
      formData: {},
      currentDetail: {},
      currentTreeItemDetail: {},
      previewDialogVisible: false,
      previewData: [],
      checkboxGroup: [],
      editList: [],
    };
  },
  created() {
    this.editList = cloneDeep(this.value);
  },
  watch: {
    editList: {
      deep: true,
      handler(newVal) {
        this.$emit('update', newVal);
      },
    },
  },
  computed: {
    isSelectItem() {
      return Object.keys(this.currentDetail).length > 0;
    },
    formRules() {
      const rules = {};
      this.editList.forEach((item) => {
        if (item.rules) {
          rules[item.fieldCode] = item.rules || [];
        }
      });
      return rules;
    },
    topHeight() {
      let height = 0;
      const { addIndex } = this;
      if (addIndex === null || addIndex === 0) {
        return 0;
      }
      this.$refs.list2.manager.refs['1']
        .filter((item, index) => index < addIndex)
        .forEach(({ node }) => {
          height += node.clientHeight;
        });
      return height;
    },
  },
  methods: {
    handlePreview() {
      this.previewData = cloneDeep(this.editList);
      this.previewDialogVisible = true;
    },
    handleSelectItem(item) {
      this.currentDetail = item;
      this.$nextTick(() => {
        this.$refs.rulesEl.resetRules(item);
      });
    },
    handleDeleteItem(index) {
      window.event.stopPropagation();
      this.editList.splice(index, 1);
      this.$nextTick(() => {
        this.currentDetail = {};
      });
    },
    handleAddFormItem() {
      this.editList.push({
        label: '标签文本',
        fieldCode: randomString(12),
        itemId: randomString(12),
        elType: 'el-input',
        disabled: false,
        canEdit: true,
        addHidden: false,
        editHidden: false,
        extraProps: {},
        selectOptions: {},
        formatValue: {},
        rules: [],
      });
    },
    resetFormEdit(list) {
      this.editList = cloneDeep(list || []);
    },
  },
};
</script>

<style scoped>
.tab {
  display: flex;
  padding: 0 10px;
  height: 100%;
  flex-direction: column;
}

.tab /deep/ .el-tabs__content {
  flex: 1;
}

.tab /deep/ .el-tabs__content .el-tab-pane {
  height: 100%;
}

.container {
  height: 100%;
}

.container /deep/ .el-form-item {
  margin-bottom: 15px;
}

.aside-wrapper {
  padding: 5px 0;
  height: 100%;
  border-right: 1px solid #d8dce5;
}
.scrollbar {
  height: 100%;
  flex: 1;
}
.scrollbar /deep/ .custom-scrollbar-wrapper {
  height: 100%;
  overflow-x: hidden;
}

.drag-item {
  opacity: 0.5;
  border: 1px dashed #409eff;
}

.form {
  flex: 1;
  height: 100px;
  padding: 20px 0;
}

.form-item {
  pointer-events: none;
  margin-bottom: 15px;
}

.select-form-item {
  position: relative;
  background-color: #ecf5ff;
}

.select-form-item::before {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  content: '';
  width: 3px;
  height: 100%;
  background-color: #409eff;
}

.select-form-item .el-icon-delete {
  display: inline-block;
}

.el-icon-delete {
  position: absolute;
  display: none;
  padding: 8px;
  right: 5px;
  bottom: -5px;
  font-size: 16px;
  border-radius: 50%;
  color: #fff;
  background-color: #f56c6c;
  cursor: pointer;
}

.form-item-wrapper {
  padding: 5px;
  transition: all 0.2s;
}

.form-item-wrapper:hover {
  background-color: #ecf8ff;
}
.form-item-wrapper /deep/ .el-tag {
  width: auto;
}

.input-wrapper {
  width: 100%;
}

.input-wrapper /deep/ .el-input__inner {
  text-align: left;
}

.drag-add-item {
  display: none;
}

.line {
  position: relative;
  width: 100%;
  height: 5px;
  background-color: #409eff;
  transition: all 300ms ease;
  z-index: 1;
}

.slick-item {
  position: relative;
  z-index: 2;
}

.empty-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.empty-wrapper > p {
  color: #bebebe;
  text-align: center;
  font-size: 16px;
}

.empty-wrapper > img {
  width: 150px;
  margin-bottom: 5px;
}
</style>
