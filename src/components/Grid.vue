<template>
  <div class="grid">
    <div v-for="row in grid" :key="row.index" class="row">
      <div
        v-for="cell in row.cells"
        :key="cell.index"
        class="cell"
        @click="onClick(row.index, cell.index)"
      >
        <div :v-if="cell.striked && cell.boat">Hit</div>
        <div :v-else-if="cell.striked === 'missed'">miss</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: []
    };
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.$data.grid.push({ index: i, cells: [] });
      for (let j = 0; j < 10; j++) {
        this.$data.grid[i].cells.push({
          index: j,
          boat: false,
          striked: false
        });
      }
    }
    console.log(this.$data.grid);
  },
  methods: {
    onClick(row, cell) {
      console.log([row, cell]);
      this.grid[row][cell].striked("hit");
    }
  }
};
</script>

<style scoped>
.cell {
  display: block;
  border: 0.5px dashed #061a40;
  background-color: #0353a4;
  flex-grow: 1;
}
.row {
  display: flex;
  flex-grow: 1;
}
.grid {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 500px;
}
</style>
