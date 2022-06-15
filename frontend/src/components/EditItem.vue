<template>
   <div id="container" v-cloak>
   </div>
</template>
<style scoped>
</style>
<script>
  import axios from 'axios';
  export default {
    name: 'EditItem',
    data(){
      return {
        // todos: [],
        // todoTitle: ""
      }
    }, methods: {
      async getTasks() {
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
      this.getTasks();
    }
  }
</script>