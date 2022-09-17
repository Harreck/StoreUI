<template>
  <PopUpContainerComponent v-if="showCreate" @onClose="toggleShowCreate">
    <ProductCreationComponent @onProductCreate="this.onCreateProduct"/>
  </PopUpContainerComponent>
<div class="container">
  <h2 class="text-center">Products</h2>
</div>
  <div class="d-flex p-3">
    <input v-model="keyWord" type="text" placeholder="Search Product" class="form-control">
    <ButtonComponent @click="onSearch(keyWord)" msg="Search"/>
  </div>
  <div class="d-flex align-content-end" style="margin-left: 15px">
    <button class="hardCodedButton btn btn-secondary rounded-2" @click="toggleShowCreate">
    Add product
    </button>
  </div>


  <div class="p-3">
    <table class="table table-bordered">
      <thead id="theadColor">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Price</th>
        <th scope="col">#</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in productList" :key="index">
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{product.formattedPrice}}</td>
        <td style="width: 200px">
          <b-button @click="() => deleteProduct(product.id)" class="removeButton">
            <b-icon-trash-fill></b-icon-trash-fill>
            Remove</b-button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent";
import PopUpContainerComponent from "@/components/PopUpContainerComponent";
import ProductCreationComponent from "@/components/ProductCreationComponent";
export default {
  created() {
      this.getAllProducts()
  },
  name: "ProductsComponent",
  components: {
    ButtonComponent,
    PopUpContainerComponent,
    ProductCreationComponent
  },
  data() {
    return{
      productList: [],
      title:'',
      description:'',
      price: null,
      showCreate: false,
      keyWord:'',
      searchedProductsList: [],
    }
  },
  methods: {
    deleteProduct(id){
      fetch(`https://localhost:7131/Products?id=${id}`, {method:'DELETE'})
          .then(res => res.status===200 ? this.productList=this.productList.filter(t => t.id !== id):console.log(res))
    },
    searchProductByText(keyWord){
      fetch(`https://localhost:7131/Products/search/${keyWord}`)
          .then(res => res.json())
          .then(json => this.productList=json)
    },
    toggleShowCreate() {
      this.showCreate = !this.showCreate
      this.showErrorMessage = false
    },
    resetProductState(){
      this.description =''
      this.title =''
      this.price=null
      this.errorMessage=''
    },
    onCreateProduct(product) {
      fetch(`https://localhost:7131/Products?title=${product.title}&description=${product.description}&price=${product.price}`, {method: 'POST'})
          .then(res => res.json())
          .then(json => {
            this.productList.push(json)
            this.toggleShowCreate()
          })
    },
    getAllProducts() {
      fetch('https://localhost:7131/Products/All')
          .then(res => res.json())
          .then(data => this.productList = data)
          .catch(err => console.log(err.message))
    },
    onSearch(keyWord) {
      if (keyWord){
        this.searchProductByText(keyWord)
      } else {
        this.getAllProducts()
      }
    }
  },//END OF METHODS
  watch: {
    keyWord: function(val) {
      this.onSearch(val)
    }
  }


}
</script>

<style scoped>
#theadColor {
  background-color: rgba(33, 33, 33, 0.99);
  font-weight: bold;
  color: white;
}
.hardCodedButton {
  background-color: #2c3e50;
  color: white;
  font-weight: bold;
  border-color: #2c3e50;
}
.removeButton {
  font-size: 13px;
  font-weight: bold;
  color: #2c3e50;
  border-radius: 4px;
  border-style: none;
  transition: background-color 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 5px;
}
.removeButton:hover {
  background-color: darkred;
  color: white;
}
</style>