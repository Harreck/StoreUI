<template>
  <div style="margin-left: 15px; display: flex; flex-direction: column">
    <div class="d-flex m-3"><input v-model="title" type="text" placeholder="Title" class="form-control"></div>
    <div class="d-flex m-3"><textarea rows="3" v-model="description" type="text" placeholder="Description" class="form-control"/>
    </div>
    <div class="d-flex m-3"><span><input v-model="price" type="number" placeholder="Price" class="form-control"></span>
    </div>
    <div v-if="showErrorMessage"><span style="color: darkred; font-weight: bold; margin-top: 2px">Please fill up all the fields</span></div>
    <div class="d-flex m-3">
      <ButtonComponent @click="() => {createProduct(title, description, price)}" msg="Add"/>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent";
export default {
  name: "ProductCreationComponent",
  components:{
    ButtonComponent
  },
  data() {
    return{
      title:'',
      description:'',
      price: null,
      showErrorMessage: false
    }
  },
  methods:{
    createProduct(title, description, price) {
      if(title === '' || description === '' || price === null) {
              this.showErrorMessage = true
      }else {
        this.$emit('onProductCreate', {title, description, price})
      }
    }
  }
}

</script>

<style scoped>

</style>