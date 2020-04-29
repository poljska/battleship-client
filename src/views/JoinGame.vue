<template>
  <main>
    <v-text-field
      color="#006daa"
      class="flex-grow-0"
      v-model="gameId"
      placeholder="Game ID"
      outlined
    />
    <v-btn color="#006daa" @click="onJoin" tile x-large>Join</v-btn>
  </main>
</template>

<script>
export default {
  data() {
    return {
      gameId: ""
    };
  },
  methods: {
    onJoin() {
      console.debug("Join game: " + this.gameId);
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
  flex: 3;
}

.flex-grow-0 {
  flex-grow: 0;
}
</style>
