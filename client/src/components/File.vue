<template>
  <div v-show="showFile">
    <md-field v-show="file === null">
      <label>Upload parquet file</label>
      <md-file
          v-model="file"
          @md-change="fileChanged($event)"
          placeholder="Add parquet file (Up to 25MB)" />
    </md-field>
    <md-progress-bar
        v-show="file != null"
        md-mode="query" />
    <md-dialog-alert
        :md-active.sync="errorModal.show"
        :md-title="errorModal.title"
        :md-content="errorModal.content" />
  </div>
</template>

<script>
export default {
  name: "File",
  data() {
    return {
      showFile: true,
      file: null,
      errorModal: {
        show: false,
        title: '',
        content: ''
      }
    }
  },
  methods: {
    async fileChanged(files) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/v1/parquet', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (res.status === 200) {
        this.$emit('parsed-parquet', json);
        this.showFile = false;
      } else {
        this.error(json.error, json.message);
        this.file = null;
        this.$emit('parsed-parquet', null);
      }
    },
    error(title, text) {
      this.errorModal.title = title;
      this.errorModal.content = text;
      this.errorModal.show = true;
    },
  }
}
</script>

<style scoped>
.md-progress-bar {
  margin: 24px;
}
</style>
