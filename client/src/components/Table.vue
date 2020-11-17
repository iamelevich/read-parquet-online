<template>
  <div>
    <md-empty-state
        md-rounded
        md-icon="backup"
        md-label="Please upload the parquet file"
        md-description="To read parquet file - please upload it first"
        v-show="parquet === null" />
    <md-table>
      <md-table-toolbar>
        <div class="md-table-pagination">
          <span>{{ pageOffset + 1 }}-{{ pageOffset + pageSize }} of {{ parquet.data.length }}</span>

          <md-button class="md-icon-button md-table-pagination-previous" @click="goToPrevious()" :disabled="page === 1">
            <md-icon>keyboard_arrow_left</md-icon>
          </md-button>

          <md-button class="md-icon-button md-table-pagination-next" @click="goToNext()" :disabled="page === pagesCount">
            <md-icon>keyboard_arrow_right</md-icon>
          </md-button>
        </div>
      </md-table-toolbar>
      <md-table-row>
        <md-table-head>#</md-table-head>
        <md-table-head v-for="val in header" v-bind:key="val">{{ val }}</md-table-head>
      </md-table-row>
      <md-table-row v-for="(row, index) in data" v-bind:key="row">
        <md-table-cell>{{ index + 1 + pageOffset }}</md-table-cell>
        <md-table-cell v-for="el in row" v-bind:key="el">{{ el }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ['parquet'],
  data() {
    return {
      page: 1,
      pageSize: 100,
    }
  },
  methods: {
    goToPrevious () {
      this.page -= 1;
    },
    goToNext () {
      this.page += 1;
    }
  },
  computed: {
    header: function () {
      return this.parquet === null ? [] : Object.keys(this.parquet.schema)
    },
    pageOffset: function () {
      return (this.page - 1) * this.pageSize;
    },
    pagesCount: function () {
      if (this.parquet === null) {
        return 0;
      }
      return ~~(this.parquet.data.length / this.pageSize)
    },
    data: function () {
      if (this.parquet === null) {
        return [];
      }
      const data = this.parquet.data.filter((el, index) => {
        return this.pageOffset <= index && index <= this.pageOffset + this.pageSize - 1;
      });
      return data.map(val => {
        return this.header.map(key => val[key]);
      });
    }
  }
}
</script>

<style scoped>

</style>
