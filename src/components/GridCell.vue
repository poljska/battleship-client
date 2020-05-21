<template>
  <div class="cell" :style="style" @click="onClick"></div>
</template>

<script>
export default {
  computed: {
    style() {
      let style = "";
      let boatImage = "";
      if (this.$props.boat) {
        let [boatName, index, orientation] = this.$props.boat.split("-");
        let offset = 0;
        console.debug([boatName, index, orientation]);
        switch (boatName) {
          case "carrier":
            if (index == 0) {
              boatImage = "ship-back.png";
              offset = 180;
            } else if (index == 4) {
              boatImage = "ship-back.png";
            } else {
              boatImage = "ship-mid.png";
            }
            break;
          case "battleship":
            if (index == 0) {
              boatImage = "ship-front.png";
            } else if (index == 3) {
              boatImage = "ship-back.png";
            } else {
              boatImage = "ship-mid.png";
            }
            break;
          case "submarine":
          case "destroyer":
            if (index == 0) {
              boatImage = "ship-front.png";
            } else if (index == 2) {
              boatImage = "ship-back.png";
            } else {
              boatImage = "ship-mid.png";
            }
            break;
          case "patrol_boat":
            if (index == 0) {
              boatImage = "ship-front.png";
            } else if (index == 1) {
              boatImage = "ship-back.png";
            }
            break;
        }
        switch (orientation) {
          case "north":
            style += "transform: rotate(" + (0 + offset) + "deg);";
            break;
          case "est":
            style += "transform: rotate(" + (90 + offset) + "deg);";
            break;
          case "south":
            style += "transform: rotate(" + (180 + offset) + "deg);";
            break;
          case "west":
            style += "transform: rotate(" + (270 + offset) + "deg);";
            break;
        }
      }
      let hitImage = "";
      if (this.$props.striked === "hit") {
        hitImage = "hit.png";
      } else if (this.$props.striked === "miss") {
        hitImage = "miss.png";
      }

      style +=
        'background-image: url("../assets/' +
        hitImage +
        '"), url("../assets/' +
        boatImage +
        '");';
      return style;
    }
  },
  props: ["row", "col", "boat", "striked"],
  methods: {
    onClick() {
      this.$emit("clicked", this.row, this.col);
    }
  }
};
</script>

<style scoped>
.cell {
  display: flex;
  border: 0.5px dashed #061a40;
  background-size: cover;
  flex: 1;
}
</style>
