<template>
  <el-form ref="form" :model="form" size="medium" label-width="110px" label-position="left">
    <DataSource :select-options="selectOptions" />
  </el-form>
</template>

<script>
import DataSource from './DataSource.vue';

export default {
  name: 'ElRadioEdit',
  components: { DataSource },
  props: {
    form: {
      type: Object,
      default() {
        return {};
      },
    },
    selectOptions: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
