<template>
  <div class="corp">
    <header>
      <h1>BATTLESHIP</h1>
    </header>
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
  </div>
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
.corp {
  display: flex;
  flex-direction: column;
  align-content: stretch;
  justify-content: stretch;
  width: 100%;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 3;
}

header {
  display: flex;
  justify-content: center;
  align-content: center;
  flex: 2;
  background: #0353a4;
}

h1 {
  font-size: 10em;
  font-family: Helvetica, sans-serif;
  color: #061a40;
  flex: 0;
  margin: 4%;
}

.flex-grow-0 {
  flex-grow: 0;
}
</style>
