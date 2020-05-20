<template>
  <main>
    <h3>Game ID: {{ gameId }}</h3>
    <v-row justify="space-around">
      <div class="m-col">
        <h2>Player</h2>
        <grid :grid="playerGrid" />
      </div>
      <v-divider class="divider" vertical inset />
      <div class="m-col">
        <h2>Opponent</h2>
        <grid :grid="enemyGrid" @cellClicked="cellSelected" />
      </div>
    </v-row>
    <p>Target : {{ selectedCell }}</p>
    <v-btn @click="fire" :disabled="!canFire">fire</v-btn>
  </main>
</template>

<script>
import Grid from "@/components/Grid.vue";

export default {
  data() {
    return {
      selectedCell: []
    };
  },
  computed: {
    gameId() {
      return this.$store.state.game.game_id;
    },
    playerGrid() {
      return this.$store.state.playerGrid;
    },
    enemyGrid() {
      return this.$store.state.enemyGrid;
    },
    canFire() {
      return true;
    }
  },
  components: { Grid },
  methods: {
    fire() {
      this.$store.dispatch("fire", this.selectedCell);
    },
    cellSelected(row, col) {
      console.debug([row, col]);
      this.selectedCell = [row, col];
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 10;
}

h2 {
  font-size: 3em;
  color: #061a40;
}

h3 {
  color: #061a40;
  text-align: center;
}

.m-col {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
}
</style>
