<template>
  <div id="app">
    <formEit />
  </div>
</template>

<script>
import formEit from './packages/formEdit/TableFormEdit.vue';

export default {
  name: 'App',
  components: {
    formEit,
  },
  data() {
    return {
      list: [],
    };
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
