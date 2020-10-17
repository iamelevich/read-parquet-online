<template>
  <b-container fluid="true">
    <!-- Styled -->
    <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
    ></b-form-file>
    <b-button @click="parseFile" v-show="file !== null" class="mr-2">Parse file: {{ file ? file.name : '' }}</b-button>
    <b-table ref="data_table" striped hover :items="items" :fields="fields"></b-table>

    <!-- Info modal -->
    <b-modal :id="errorModal.id" :title="errorModal.title" ok-only @hide="resetErrorModal">
      <pre>{{ errorModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: "File",
  data() {
    return {
      file: null,
      error_message: null,
      items: [],
      fields: [],
      errorModal: {
        id: 'error-modal',
        title: '',
        content: ''
      }
    }
  },
  methods: {
    error(title, text) {
      this.errorModal.title = title;
      this.errorModal.content = text;
      this.$root.$emit('bv::show::modal', this.errorModal.id);
    },
    resetErrorModal() {
      this.errorModal.title = '';
      this.errorModal.content = '';
    },
    async parseFile() {
      this.error_message = null;
      this.items = [];
      this.fields = [];
      const formData = new FormData();
      formData.append('file', this.file);

      const res = await fetch('/v1/parquet', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (res.status === 200) {
        this.items = json.data.map((val, index) => {
          val.index = index+1;
          return val;
        });
        this.fields = ['index'].concat(Object.keys(json.schema));
      } else {
        this.error(json.error, json.message);
        this.file = null;
      }
    }
  }
}
</script>

<style scoped>

</style>
