<template>
  <div id="app">
    <formEdit ref="formEdit" v-model="list" />
    <el-button type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script>
import formEdit from './packages/formEdit/FormEdit.vue';

export default {
  name: 'App',
  components: {
    formEdit,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    handleSave() {
      console.log(this.list);
    },
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
