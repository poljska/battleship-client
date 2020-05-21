<template>
  <main>
    <h3>Game ID: {{ gameId }}</h3>
    <v-row justify="space-around">
      <div class="m-col m-col-2">
        <h2>Player</h2>
        <grid :grid="playerGrid" />
      </div>
      <v-divider class="divider" vertical inset />
      <div class="m-col m-col-2">
        <h2>Opponent</h2>
        <grid :grid="enemyGrid" @cellClicked="cellSelected" />
      </div>
      <div class="m-col m-col-1">
        <v-card class="fire-control" dark color="#061a40">
          <v-card-title>
            Target : {{ selectedCell.col | toLetter }} -
            {{ selectedCell.row | plusOne }}
          </v-card-title>
          <v-btn tile color="#ba1313" dark @click="fire" :disabled="!canFire">
            fire
          </v-btn>
        </v-card>
      </div>
    </v-row>
  </main>
</template>

<script>
import Grid from "@/components/Grid.vue";

export default {
  data() {
    return {
      selectedCell: { row: 0, col: 0 }
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
      return this.$store.state.allowFire;
    }
  },
  components: { Grid },
  methods: {
    fire() {
      this.$store.dispatch("fire", this.selectedCell);
    },
    cellSelected(row, col) {
      this.selectedCell = { row: row, col: col };
    }
  },
  filters: {
    toLetter(value) {
      return String.fromCharCode(65 + value);
    },
    plusOne(value) {
      return value + 1;
    }
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 6;
}

h2 {
  font-size: 5vh;
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
}

.m-col-1 {
  flex: 1;
}
.m-col-2 {
  flex: 2;
}
.fire-control {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 30vh;
}
</style>
