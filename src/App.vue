<template>
  <div id="app">
    <JobsListComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import JobsListComponent from "./components/JobsListComponent.vue";

export default {
  name: "app",
  components: {
    JobsListComponent
  },
  created() {
    this.$store.commit("setHeight", {});
  }
};
</script>

<style>
</style>
