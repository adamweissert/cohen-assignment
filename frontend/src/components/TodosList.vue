<template>
   <div id="container">
      <h1 class="text-3xl font-bold underline">ToDo List</h1>
      <div class="card" v-for="todo in todos" :key="todo.id">
        <div class="text-3xl font-bold underline">
          <p>{{ todo.name }}</p>
        </div>
      </div>
   </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: 'TodosList',
    data(){
      return {
        todos: []
      }
    }, methods: {
      async getAllTodos() {
        try {
          const resp = await axios.get('http://localhost:3000/todos');
          console.log(resp);
          this.todos = resp.data;
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