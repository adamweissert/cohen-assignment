import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import './css/index.css'
import "./css/tailwind.css";
import VueTailwind from "vue-tailwind";
import VueTailwindSettings from "/VueTailwindSettings.js";


import ItemsList from './components/ItemsList.vue';
import AddItem from './components/AddItem.vue';
import EditItem from './components/EditItem.vue';
import TodosList from './components/TodosList.vue';

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'Todos', path: '/todos', component: TodosList },
        { name: 'Tasks', path: '/tasks', component: ItemsList },
        { name: 'AddItem', path: '/add-item', component: AddItem },
        { name: 'EditItem', path: '/edit-item', component: EditItem },
    ]
});

app.use(VueTailwind, VueTailwindSettings);
app.use(router);
app.mount('#app')