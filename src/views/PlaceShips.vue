<template>
  <main>
    <h3>Game ID: {{ gameId }}</h3>
    <v-row justify="space-around">
      <grid />
      <v-radio-group v-model="selectedShip">
        <v-radio
          v-for="(ship, index) in ships"
          :label="ship.name + ' orientation: ' + ship.orientation"
          :key="index"
          :value="index"
        />
      </v-radio-group>
    </v-row>
  </main>
</template>

<script>
import Grid from "@/components/Grid.vue";

export default {
  data() {
    return {
      ships: [
        { name: "Plane Carrier", size: 5, positions: [], orientation: "north" },
        { name: "Destroyer", size: 3, positions: [], orientation: "north" },
        { name: "Submarine", size: 3, positions: [], orientation: "north" },
        { name: "Battleship", size: 4, positions: [], orientation: "north" },
        { name: "Patrol Boat", size: 2, positions: [], orientation: "north" }
      ],
      selectedShip: Number
    };
  },
  components: {
    Grid
  },
  computed: {
    gameId() {
      return this.$store.state.game.game_id;
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
  color: #061a40;
  text-align: center;
}
</style>
