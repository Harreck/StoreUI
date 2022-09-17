<template>
  <div style="display: flex; align-content: center; justify-content: center; margin: 0 0 13px 0; font-weight: bold"><h3>Order Creation</h3></div>
  <div style="margin: 0 15px 0 15px; display: flex; flex-direction: column">
    <table class="table table-bordered">
      <thead class="theadColor">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in productList" :key="index">
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{product.formattedPrice}}</td>
        <td>
          <!--Drop DOWN MENU-->
          <input v-model="product.toBuyQuantity" min="0" step="1" oninput="validity.valid||(value='')" type="number">
        </td>
        <td>
          <ButtonComponent @click="addToOrder(product)" msg="Add to Order">
            </ButtonComponent>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div v-if="showErrorMessage"><span style="color: darkred; font-weight: bold; margin-top: 2px">Quantity must be 1 or more</span></div>
  <div v-if="createdProductList.length !== 0">
    <div style="display: flex; align-content: flex-start; justify-content: flex-start; margin: 0 0 10px 17px; font-weight: bold">
      <h5>Your Order:</h5>
    </div>
    <div style="display: flex; align-content: flex-start; justify-content: flex-start; margin: 0 15px 10px 15px">
      <table class="table table-bordered">
        <thead class="theadColor">
        <tr>
          <th scope="col">Products</th>
          <th style="width: 250px" scope="col">Total Amount of Products</th>
          <th scope="col">Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in createdProductList" :key="index">
          <td>{{product.title}}</td>
          <td>{{product.toBuyQuantity}}</td>
          <td style="width: 200px">{{product.price * product.toBuyQuantity}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div style="display: flex; align-items: center; justify-content: space-between; margin: 0 15px 0 15px;">
      <ButtonComponent @click="() => createOrder(createdProductList.map(product => {return{productId:product.id, quantity: product.toBuyQuantity}}))" class="btn btn-info" msg="Create Order"/>
      <span style="font-weight: bold; font-size: 20px">Total: ${{createdProductList.reduce((acc,product) => (product.price*product.toBuyQuantity)+acc,0)}}</span>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent";
export default {
  name: "OrderCreationComponent",
  components: {ButtonComponent},
  data() {
    return{
      productList: [],
      quantity: null,
      createdProductList: [],
      showErrorMessage: false,
      totalPrice: null,
      productId_quantity: new Map()
    }
  },
  created() {
    this.getAllProducts()
  },
  methods: {
    getAllProducts() {
      fetch('https://localhost:7131/Products/All')
          .then(res => res.json())
          .then(data => {
            this.productList = data.map(p => {return {...p, toBuyQuantity:0}})
          })
          .catch(err => console.log(err.message))
    },
    createOrder(productID_QuantityList) {
      if(productID_QuantityList === []) {
        this.showErrorMessage = true
      }else {
        this.$emit('onOrderCreate', productID_QuantityList)
      }
    },
    addToOrder(product){
      this.createdProductList.push(product)
    },



  }//End of Methods
}
</script>

<style scoped>
.theadColor {
  background-color: rgba(33, 33, 33, 0.99);
  font-weight: bold;
  color: white;
}
</style>