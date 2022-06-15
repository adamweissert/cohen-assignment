<template>
   <div id="container" v-cloak>
     <h1>ToDo List</h1>
      <div v-for="todo in todos" :key="todo.id">
      <p><router-link :to="{name: 'Tasks', params: {id: todo.id, title: todo.name }}">{{ todo.name }}</router-link> (0/0) </p>
      </div>
      <div>
        <form @submit.prevent="addTodo">
           <label for="title">Title</label>
           <input type="text" id="title" v-model="todoTitle" placeholder="Enter todo name here..." />
           <button type="submit">Submit</button>
        </form>

      </div>
   </div>
</template>
<style scoped>
</style>
<script>
  import axios from 'axios';
  export default {
    name: 'TodosList',
    data(){
      return {
        todos: [],
        todoTitle: ""
      }
    }, methods: {
      async getAllTodos() {
        try {
          const resp = await axios.get('http://localhost:3000/todos');
          this.todos = resp.data;
        } catch (err) {
          console.log(err);
        }
      },
      async addTodo() {
         try {
            if (this.todoTitle) {
                 await axios.post('http://localhost:3000/todos', {
                     name: this.todoTitle,
                }).then((resp)=> {
                  console.log(resp.data);

                  if (resp.data.created) {
                     this.todoTitle = "";
                     this.getAllTodos();
                  }
                });
            } else {
               alert('This todo needs a name!');
            }
         } catch (err) {
            console.log(err);
         }
      }
    },
    created() {
      this.getAllTodos();
    }
  }
</script>