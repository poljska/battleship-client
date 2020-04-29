<template>
  <main>
    <v-btn color="#006daa" @click="onNewGame" tile x-large>New Game</v-btn>
    <v-btn color="#006daa" to="/join" tile x-large>Join Game</v-btn>
  </main>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    onNewGame() {
      this.$store.dispatch("createNewGame");
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 3;
}
</style>
