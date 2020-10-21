<template>
  <div>
    <md-empty-state
        md-rounded
        md-icon="backup"
        md-label="Please upload the parquet file"
        md-description="To read parquet file - please upload it first"
        v-show="parquet === null" />
    <md-table>
      <md-table-row>
        <md-table-head v-for="val in header" v-bind:key="val">{{ val }}</md-table-head>
      </md-table-row>
      <md-table-row v-for="row in data" v-bind:key="row">
        <md-table-cell v-for="el in row" v-bind:key="el">{{ el }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ['parquet'],
  computed: {
    header: function () {
      return this.parquet === null ? [] : Object.keys(this.parquet.schema)
    },
    data: function () {
      return this.parquet === null ? [] : this.parquet.data.map(val => {
        return this.header.map(key => val[key]);
      });
    }
  }
}
</script>

<style scoped>

</style>
