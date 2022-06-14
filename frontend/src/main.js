import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

import ItemsList from './components/ItemsList.vue';
import AddItem from './components/AddItem.vue';
import EditItem from './components/EditItem.vue';
import TodosList from './components/TodosList.vue';

const app = createApp(App)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'Todos', path: '/', component: TodosList },
        { name: 'Tasks', path: '/tasks', component: ItemsList },
        { name: 'AddItem', path: '/add-item', component: AddItem },
        { name: 'EditItem', path: '/edit-item', component: EditItem },
    ]
});

app.use(router);
app.mount('#app')