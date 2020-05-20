<template>
  <div class="cell" @click="onClick">
    <div v-if="boat" class="mid">
      <div v-if="striked === 'hit'">Hit</div>
      <div v-else-if="striked === 'miss'">miss</div>
    </div>
    <div v-else>
      <div v-if="striked === 'hit'">Hit</div>
      <div v-else-if="striked === 'miss'">miss</div>
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

.mid {
  display: block;
  background-image: url("../assets/ship-mid.png");
  background-size: cover;
  flex: 1;
}
</style>
