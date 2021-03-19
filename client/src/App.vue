<template>
  <div id="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="1" style="z-index: 3">
        <h1 class="md-title" style="flex: 1">Apache Parquet Online Viewer (version: {{ version }})</h1>
        <Download v-bind:parquet="parquet" />
      </md-app-toolbar>
      <md-app-content>
        <File @parsed-parquet="parquet = $event" />
        <Table v-bind:parquet="parquet" />
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import File from "./components/File.vue";
import Table from "./components/Table.vue";
import Download from "./components/Download.vue";

export default {
  name: "App",
  data() {
    return {
      parquet: null,
      version: process.env.VUE_APP_VERSION,
    }
  },
  components: {
    File,
    Table,
    Download,
  }
};
</script>

<style lang="scss" scoped>
  @import "//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons";
</style>
