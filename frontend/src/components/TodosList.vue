<template>
   <div id="container">
      <h1>ToDo List</h1>
      <div v-for="todo in todos" :key="todo.id">
          <p>{{ todo.name }} <input type="checkbox" /></p> 
      </div>
      <router-link :to="{ name: 'AddItem' }">Add Item</router-link>
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
        todos: []
      }
    }, methods: {
      async getAllTodos() {
        try {
          const resp = await axios.get('http://localhost:3000/todos');
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