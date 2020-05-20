<template>
  <div>
    <h1 v-if="isWinner">You Won !</h1>
    <h1 v-else>You losed ...</h1>
    <v-btn link="/">Home</v-btn>
  </div>
</template>

<script>
export default {
  computed: {
    isWinner() {
      return this.$store.state.game.status.winner === this.$store.state.player;
    }
  }
};
</script>
