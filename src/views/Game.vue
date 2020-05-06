<template>
  <main>
    <div class="m-col">
      <h2>Player</h2>
      <grid />
    </div>
    <v-divider class="divider" vertical inset />
    <div class="m-col">
      <h2>Opponent</h2>
      <grid />
    </div>
  </main>
</template>

<script>
import Grid from "@/components/Grid.vue";

export default {
  components: { Grid }
};
</script>

<style scoped>
main {
  display: flex;
  justify-content: space-evenly;
  flex-grow: 10;
}

h2 {
  font-size: 3em;
  color: #061a40;
}

.m-col {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>
