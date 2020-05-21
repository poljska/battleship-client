<template>
  <main>
    <h3>Game ID: {{ gameId }}</h3>
    <v-row justify="space-around">
      <grid :grid="playerGrid" @cellClicked="onCellClicked" />
      <v-radio-group v-model="selectedShip" class="column">
        <div v-for="(ship, index) in ships" :key="index" class="d-flex">
          <v-radio
            :label="ship.name + ' orientation: ' + ship.orientation"
            :value="index"
          />
          <v-btn @click="rotateLeft(index)">Rotate left</v-btn>
          <v-btn @click="rotateRight(index)">Rotate right</v-btn>
        </div>
      </v-radio-group>
      <v-btn @click="sendShipsPositions">Confirm</v-btn>
    </v-row>
  </main>
</template>

<script>
import Grid from "@/components/Grid.vue";

export default {
  data() {
    return {
      ships: [
        { name: "carrier", size: 5, positions: [], orientation: "north" },
        { name: "destroyer", size: 3, positions: [], orientation: "north" },
        { name: "submarine", size: 3, positions: [], orientation: "north" },
        { name: "battleship", size: 4, positions: [], orientation: "north" },
        { name: "patrol_boat", size: 2, positions: [], orientation: "north" }
      ],
      selectedShip: 0
    };
  },
  components: {
    Grid
  },
  computed: {
    gameId() {
      return this.$store.state.game.game_id;
    },
    playerGrid() {
      return this.$store.state.playerGrid;
    }
  },
  methods: {
    rotateLeft(index) {
      switch (this.ships[index].orientation) {
        case "north":
          this.ships[index].orientation = "west";
          break;
        case "west":
          this.ships[index].orientation = "south";
          break;
        case "south":
          this.ships[index].orientation = "est";
          break;
        case "est":
          this.ships[index].orientation = "north";
          break;
      }
    },
    rotateRight(index) {
      switch (this.ships[index].orientation) {
        case "north":
          this.ships[index].orientation = "est";
          break;
        case "west":
          this.ships[index].orientation = "north";
          break;
        case "south":
          this.ships[index].orientation = "west";
          break;
        case "est":
          this.ships[index].orientation = "south";
          break;
      }
    },
    onCellClicked(row, cell) {
      const ship = this.ships[this.selectedShip];
      let x = 0;
      let y = 0;
      switch (ship.orientation) {
        case "north":
          x = 1;
          break;
        case "west":
          y = 1;
          break;
        case "south":
          x = -1;
          break;
        case "est":
          y = -1;
          break;
      }
      if (
        row + (ship.size - 1) * x < 10 &&
        row + (ship.size - 1) * x >= 0 &&
        cell + (ship.size - 1) * y < 10 &&
        cell + (ship.size - 1) * y >= 0
      ) {
        ship.positions = [];
        for (let i = 0; i < ship.size; i++) {
          ship.positions.push([row + x * i + 1, cell + y * i + 1]);
        }
        this.$store.dispatch("placeShip", {
          newPosition: ship.positions,
          shipName: ship.name
        });
      }
    },
    sendShipsPositions() {
      this.$store.dispatch("sendShipsPositions", this.ships);
    }
  }
};
</script>

<style scoped>
main {
  flex: 10;
}
h3 {
  font-size: 2vw;
  color: var(--v-primary-base);
  text-align: center;
}
.justify-space-around {
  justify-content: space-around;
}
</style>
