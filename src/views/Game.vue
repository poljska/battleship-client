<template>
  <main>
    <grid />
    <grid />
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
  justify-content: space-around;
  align-items: center;
  flex-grow: 8;
}
</style>
