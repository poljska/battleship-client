<template>
  <div class="cell" :style="style" @click="onClick"></div>
</template>

<script>
export default {
  computed: {
    style() {
      let style = "";
      let image = [];
      if (this.$props.boat) {
        let [boatName, index, orientation] = this.$props.boat.split("-");
        let offset = 0;
        console.debug([boatName, index, orientation]);
        switch (boatName) {
          case "carrier":
            if (index == 0) {
              image.push("ship-back.png");
              offset = 180;
            } else if (index == 4) {
              image.push("ship-back.png");
            } else {
              image.push("ship-mid.png");
            }
            break;
          case "battleship":
            if (index == 0) {
              image.push("ship-front.png");
            } else if (index == 3) {
              image.push("ship-back.png");
            } else {
              image.push("ship-mid.png");
            }
            break;
          case "submarine":
          case "destroyer":
            if (index == 0) {
              image.push("ship-front.png");
            } else if (index == 2) {
              image.push("ship-back.png");
            } else {
              image.push("ship-mid.png");
            }
            break;
          case "patrol_boat":
            if (index == 0) {
              image.push("ship-front.png");
            } else if (index == 1) {
              image.push("ship-back.png");
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
      if (this.$props.stricked === "hit") {
        image.push("hit.png");
      } else if (this.$props.stricked === "miss") {
        image.push("miss.png");
      }

      for (let img in image) {
        style += 'background-image: url("../assets/' + image[img] + '/");';
      }
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
