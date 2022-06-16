import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

import TasksList from './components/TasksList.vue';
import EditItem from './components/EditItem.vue';
import TodosList from './components/TodosList.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashCan, faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faTrashCan, faEdit, faCheckCircle)


const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'Todos', path: '/', component: TodosList },
        { name: 'Tasks', path: '/tasks/:id', component: TasksList },
        { name: 'EditItem', path: '/edit-item', component: EditItem },
    ]
});

app.use(router);
app.mount('#app')