<template>
  <div class="cell" @click="onClick">
    <div v-if="striked && boat">Hit</div>
    <div v-else-if="striked">miss</div>
    <div v-else>?</div>
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
  justify-content: center;
  align-items: center;
  border: 0.5px dashed #061a40;
  flex: 1;
}
</style>
