<template>
  <SlickList
    v-model="componentValue"
    :hide-sortable-ghost="false"
    append-to="#SlickList"
    helper-class="drag-add-item"
    @sort-end="handleSortEnd"
    @sort-move="handleSortMove"
  >
    <SlickItem :index="0">
      <el-button v-for="(item, index) in componentValue" :key="'aaa' + index" type="primary">{{
        item.label
      }}</el-button>
    </SlickItem>
  </SlickList>
</template>

<script>
import { throttle } from 'lodash';

export default {
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
      componentValue: [
        {
          label: '标签文本',
          fieldCode: '数据表字段',
          elType: 'el-input',
          disabled: false,
          canEdit: true,
          addHidden: false,
          editHidden: false,
          extraProps: {},
        },
        {
          label: '下拉框',
          fieldCode: '数据表字段',
          elType: 'el-input',
          disabled: false,
          canEdit: true,
          addHidden: false,
          editHidden: false,
          extraProps: {},
        },
      ],
    };
  },
  watch: {},
  methods: {
    handleSortEnd() {
      this.editList.splice(this.addIndex, 0, {
        label: '标签文本',
        fieldCode: '数据表字段',
        elType: 'el-input',
        disabled: false,
        canEdit: true,
        addHidden: false,
        editHidden: false,
        extraProps: {},
      });
      this.addIndex = null;
    },
    handleSortMove: throttle(function (event) {
      const node = event.event.toElement;
      if (node.getAttribute('id') === 'SlickList') return;
      this.addIndex = +node.getAttribute('index');
    }, 50),
  },
};
</script>

<style lang="scss" scoped>
.input-number-wrapper {
  width: 100%;
}
</style>
