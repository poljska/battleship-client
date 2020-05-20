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
      <div class="grid-wrapper">
        <div class="grid">
          <div v-for="row in grid" :key="row.index" class="line">
            <grid-cell
              v-for="cell in row.cells"
              :row="row.index"
              :col="cell.index"
              :boat="cell.boat"
              :striked="cell.striked"
              :key="cell.index"
              @clicked="onClick"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GridCell from "@/components/GridCell.vue";

export default {
  components: {
    "grid-cell": GridCell
  },
  props: {
    grid: Array
  },
  methods: {
    onClick(row, cell) {
      this.$emit("cellClicked", row, cell);
    }
  }
};
</script>

<style scoped>
.line {
  display: flex;
  flex: 1;
}

.grid-wrapper {
  flex: 10;
}

.grid {
  display: flex;
  flex-direction: column;
  background-color: #0353a4;
  width: 100%;
  height: 100%;
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
