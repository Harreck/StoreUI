import {createRouter, createWebHistory} from "vue-router";
import Home from '../views/HomePage.vue'
import About from '../views/AboutPage.vue'
import ProductsComponent from "@/views/Products/ProductsComponent";
import OrdersComponent from "@/views/Orders/OrdersComponent";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/products',
        name: 'ProductsComponent',
        component: ProductsComponent
    },
    {
        path: '/orders',
        name: 'OrdersComponent',
        component: OrdersComponent
    }
]

const router = createRouter({
    history: createWebHistory(process.env.Base_URL),
    routes
})

export default router