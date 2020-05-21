<template>
  <div class="cell" @click="onClick">
    <div v-if="boat" class="mid">
      <div class="hit" v-if="striked === 'hit'"></div>
      <div class="miss" v-else-if="striked === 'miss'"></div>
    </div>
    <div class="empty" v-else>
      <div class="hit" v-if="striked === 'hit'"></div>
      <div class="miss" v-else-if="striked === 'miss'"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["row", "col", "boat", "striked"],
  methods: {
    onClick() {
      this.$emit("clicked", this.row, this.col);
    }
  }
};
</script>

<style scoped>
.cell {
  display: flex;
  border: 0.5px dashed #061a40;
  flex: 1;
}
.empty {
  display: flex;
  flex: 1;
}

.mid {
  display: flex;
  background-image: url("../assets/ship-mid.png");
  background-size: cover;
  flex: 1;
}

.hit {
  display: block;
  background-image: url("../assets/hit.png");
  background-size: cover;
  flex: 1;
}

.miss {
  display: block;
  background-image: url("../assets/miss.png");
  background-size: cover;
  flex: 1;
}
</style>
