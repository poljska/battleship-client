<template>
  <div id="app">
    <div class="title-bar">
      <h1>Battle ship</h1>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
  width: 100%;
}
.title-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  color: blue;
  background-color: lightblue;
  height: 300px;
  margin: 0px;
  font-size: 100px;
}
</style>
