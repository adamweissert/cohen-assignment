<template>
   <div id="container" v-cloak>
     <h1>ToDo List</h1>
      <div v-for="todo in todos" :key="todo.id">
       <p v-bind:class=" todoComplete(todo.id) ? 'strike' : ''">
          <router-link :to="{name: 'Tasks', params: {id: todo.id, title: todo.name }}">{{ todo.name }} </router-link >
          <span> ({{ getTasksCompleted(todo.id) }}/{{getAllTasks(todo.id).length}})</span>
      </p>
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
.strike {
  text-decoration: line-through;
}
</style>
<script>
  import axios from 'axios';
  export default {
    name: 'TodosList',
    data(){
      return {
        todos: [],
        todoTitle: "",
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
                }).then(async (resp)=> {
                  if (resp.data.created) {
                     this.todoTitle = "";
                     await this.getAllTodos();
                  } else {
                    alert("Todo exists!");
                    this.todoTitle = "";
                  }
                });
            } else {
               alert('This todo needs a name!');
            }
         } catch (err) {
            console.log(err);
         }
      },
      todoComplete(id) {
        let tasks = this.getAllTasks(id);
        let tasksCompleted = tasks.filter((task) => task.completed === true).length;
            
        if (tasks.length >= 1 && tasksCompleted === tasks.length) {
           if (tasksCompleted === tasks.length) {
              return true;
            } else {
              return false;
            }
         }
      },
      getTasksCompleted(id) {
         let tasks = this.getAllTasks(id);

        return tasks.filter((task) => task.completed == true).length;
      },
      getAllTasks(id) {
        return this.todos.at(id).tasks;
      }
    },
    created() {
      this.getAllTodos();
    }
  }
</script>