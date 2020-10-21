<template>
  <div>
    <md-speed-dial
        v-show="parquet != null"
        md-event="click"
        class="md-top-right"
        md-direction="bottom">
      <md-speed-dial-target>
        <md-icon>get_app</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="csvExport">
          CSV
        </md-button>

        <md-button class="md-icon-button" @click="jsonExport">
          JSON
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
  </div>
</template>

<script>
export default {
  name: "Download",
  props: ['parquet'],
  computed: {
    csvData() {
      if (!this.parquet) {
        return [];
      }
      const fields = Object.keys(this.parquet.schema);
      const data = this.parquet.data.map(val => {
        return fields.map(key => val[key]);
      });
      return [fields, ...data];
    }
  },
  methods: {
    csvExport() {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += this.csvData
          .map(item => item.join(";"))
          .join("\n")
          .replace(/(^\[)|(\]$)/gm, "");

      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "parquet.csv");
      link.click();
    },
    jsonExport() {
      let jsonContent = "data:text/json;charset=utf-8,";
      jsonContent += JSON.stringify(this.parquet, null, 2);
      const data = encodeURI(jsonContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "parquet.json");
      link.click();
    }
  },
}
</script>

<style scoped>

</style>
