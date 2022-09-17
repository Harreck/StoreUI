<template>
<div class="popUp" @click="onClose">
  <div class="popUpContainer animatePop" @click.stop="">
    <div class="closePopUp"><b-icon-x-lg class="closePopUp" @click="onClose"></b-icon-x-lg></div>
    <div style="flex: 1; overflow-y: auto">
      <slot></slot>
    </div>
    <div style="height: 40px"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "PopUpContainerComponent",
  props:{
    isShowing: Boolean
  },
  methods: {
    onClose(){
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>
.popUp{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000BF;
  z-index: 2;
  animation-name: animate-background;
  animation-timing-function: linear;
  animation-duration: 0.3s;
}
.popUpContainer {
  width: 600px;
  max-height: 600px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}
.closePopUp {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 7px 7px 7px 0;
}
.closePopUp svg{
  width: 15px;
  height: 15px;
  transition: all 0.5s;
  cursor: pointer;
}
.closePopUp svg:hover{
  transform: scale(1.4);
}

.animatePop {
  animation-duration: 0.3s;
  animation-name: animate-pop;
  animation-timing-function: cubic-bezier(.20, .47, .70, 1.55);
}
@keyframes animate-background {
  0%{
  opacity: 0;
  }

  100%{
    opacity: 1;
  }
}
@keyframes animate-pop {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}
</style>