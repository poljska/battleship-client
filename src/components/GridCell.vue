<template>
  <div class="cell" @click="onClick">
    <div v-if="striked && boat">Hit {{ boat }}</div>
    <div v-else-if="striked">miss</div>
    <div v-else-if="boat" class="mid"></div>
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
