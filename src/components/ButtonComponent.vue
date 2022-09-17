<template>
  <button class="buttonC btn btn-secondary rounded-2">{{ msg }}</button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props:{
    msg: String
  }
}
</script>

<style scoped>
.buttonC {
  background-color: #2c3e50;
  color: white;
  font-weight: bold;
  border-color: #2c3e50;
}
</style>