<template>
  <div class="home">
    <button class="btn">New Game</button>
    <button class="btn">Join Game</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 500px;
}
.btn {
  height: 150px;
  width: 750px;
  font-size: 50px;
}
</style>
