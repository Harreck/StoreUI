<template>
  <PopUpContainerComponent v-if="showCreate" @onClose="toggleShowCreate">
    <OrderCreationComponent @onOrderCreate="this.orderCreate"/>
  </PopUpContainerComponent>
    <div class="container">
      <h2 class="text-center">Orders</h2>
    </div>
  <div class="d-flex align-content-end" style="margin-left: 15px">
    <ButtonComponent @click="toggleShowCreate" msg="Create Order"/>
  </div>
  <div class="p-3">
    <table class="table table-bordered">
      <thead id="theadColor">
      <tr>
        <th style="width: 200px" scope="col">Order#</th>
        <th scope="col">Products</th>
        <th style="width: 250px" scope="col">Total Amount of Products</th>
        <th scope="col">Total Price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(order, index) in orderList" :key="index">
        <td style="width: 200px">{{ orderList.indexOf(order)+1 }}</td>
        <td>{{order.products.map(p => p.product.title).join(',')}}</td>
        <td>{{ order.products.map(p => p.quantity).reduce((acc,nv) => acc+nv,0)  }}</td>
        <td style="width: 200px">{{order.formattedPrice}}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import ButtonComponent from "@/components/ButtonComponent";
import PopUpContainerComponent from "@/components/PopUpContainerComponent";
import OrderCreationComponent from "@/components/OrderCreationComponent";
export default {
  name: "OrdersComponent",
  components: {ButtonComponent, PopUpContainerComponent, OrderCreationComponent},
  created() {
    fetch('https://localhost:7131/Orders/All')
        .then(res => res.json())
        .then(data => this.orderList = data)
        .catch(err => console.log(err.message))
  },
  data(){
    return{
      orderList: [],
      showCreate: false
    }
  },//END OF DATA
  methods:{
    toggleShowCreate() {
      this.showCreate = !this.showCreate
    },
    orderCreate(productID_QuantityList){
      fetch(`https://localhost:7131/Orders`, {
        method:'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify(productID_QuantityList)})
          .then(res => res.json())
          .then(json => {
            this.orderList.push(json)
            this.toggleShowCreate()
          })
    }
  }//END OF METHODS

}

</script>

<style scoped>
#searchBtn {
  background-color: #2c3e50;
  color: white;
  font-weight: bold;
  border-color: #2c3e50;
}
#theadColor {
  background-color: rgba(33, 33, 33, 0.99);
  font-weight: bold;
  color: white;
}
</style>