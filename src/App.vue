<template>
  <div id="nav">
    <span class="m-1">
    <router-link :to="{name: 'Home'}">Home</router-link>
      </span>
    <span class="m-1">
    <router-link :to="{name: 'About'}">About</router-link>
      </span>
  </div>
  <router-view/>
  <div id="pos" v-if="!this.isAbout" class="mt-5 bottom-navigation-container">
    <span id="nav">
    <router-link :to="{name: 'ProductsComponent'}">Products</router-link>
    </span>
    <span id="nav">
    <router-link :to="{name: 'OrdersComponent'}">Orders</router-link>
    </span>
  </div>
</template>
<script>
export default {
name: "App",
  computed: {
  isAbout(){
    return this.$route.name === 'About'
  }
  }

}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#nav{
  padding: 30px;

}
#nav a{
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
  transition: background-color,color 0.5s;
}
#nav a.router-link-exact-active {
  color: white;
  background: darkgreen;
}
#nav a:hover {
  background-color: darkgreen;
  color: white;
}

::-webkit-scrollbar {
  width: 10px;
  scroll-padding: 10px;
}

/* Track /
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/ Handle /
::-webkit-scrollbar-thumb {
  background: #888;
}

/ Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.bottom-navigation-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  position: sticky;
  bottom: 0;
  box-shadow: 0 0 5px 0 #2c3e50;
}
</style>
