<template>
  <div id="app">
    <header>
      <h1>BATTLESHIP</h1>
    </header>
    <router-view />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-content: stretch;
  justify-content: stretch;
  height: 100vh;
  width: 100vw;
  background-color: #b9d6f2;
  color: #061a40;
}

header {
  display: flex;
  justify-content: center;
  align-content: center;
  flex: 2;
  background: #0353a4;
}

h1 {
  font-size: 10vh;
  text-align: center;
  font-family: Helvetica, sans-serif;
  color: #061a40;
  flex: 0;
  margin: 4%;
}
/* HEX 
  $color1: #b9d6f2ff;
  $color2: #061a40ff;
  $color3: #0353a4ff;
  $color4: #006daaff;
  $color5: #003559ff;
*/
</style>
