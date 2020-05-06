<template>
  <div class="outer-box">
    <div class="top-label">
      <div class="label"></div>
      <div
        v-for="(letter, index) in [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J'
        ]"
        :key="index"
        class="label"
      >
        {{ letter }}
      </div>
    </div>
    <div class="inner-box">
      <div class="side-label">
        <div v-for="index in 10" :key="index" class="label">
          {{ index }}
        </div>
      </div>
      <div class="grid">
        <div v-for="row in grid" :key="row.index" class="line">
          <div
            v-for="cell in row.cells"
            :key="cell.index"
            class="cell"
            @click="onClick(row.index, cell.index)"
          >
            <div v-if="cell.striked === 'hit'">Hit</div>
            <div v-else-if="cell.striked === 'missed'">miss</div>
            <div v-else>?</div>
          </div>
        </div>
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
    console.debug(this.$data.grid);
  },
  methods: {
    onClick(row, cell) {
      this.$emit("cellClicked", row, cell);
    }
  }
};
</script>

<style scoped>
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.5px dashed #061a40;
  flex: 1;
}

.line {
  display: flex;
  flex: 1;
}
.grid {
  display: flex;
  flex-direction: column;
  background-color: #0353a4;
  flex: 10;
}

.outer-box {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 500px;
}
.inner-box {
  display: flex;
  flex: 10;
}
.top-label {
  display: flex;
  flex: 1;
}
.side-label {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.label {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
