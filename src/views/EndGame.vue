<template>
  <main>
    <h1 v-if="isWinner">You Won !</h1>
    <h1 v-else>You losed ...</h1>
    <v-btn color="#061a40" dark @click="onClick">Home</v-btn>
  </main>
</template>

<script>
export default {
  computed: {
    isWinner() {
      console.debug(this.$store.state.player);
      console.debug(this.$store.state.game.status.winner);
      return this.$store.state.game.status.winner === this.$store.state.player;
    }
  },
  methods: {
    onClick() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 6;
}
</style>
