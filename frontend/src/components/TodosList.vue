<template>
   <div id="container" v-cloak>
     <h1>ToDo List</h1>
      <div v-for="todo in todos" :key="todo.id">
       <p v-bind:class=" todoComplete(todo.id) ? 'strike' : ''">
          <router-link :to="{name: 'Tasks', params: {id: todo.id, title: todo.name }}">{{ todo.name }} </router-link >
          <span> ({{ getTasksCompleted(todo.id) }}/{{ getTotalTasks(todo.id)}})</span>
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
                  console.log(resp.data);

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
        let tasks = this.todos.at(id).tasks;
        let tasksCompleted = tasks.filter((task) => task.completed === true).length;
      
        if (tasks.length > 0) {
           if (tasksCompleted === tasks.length) {
              return true;
            } else {
              return false;
            }
         } else {
            return false;
         }
      },
      getTotalTasks(id) {
        let tasks = this.todos.at(id).tasks;
        return tasks.length;
      },
      getTasksCompleted(id) {
         let tasks = this.todos.at(id).tasks;

        return tasks.filter((task) => task.completed == true).length;
      }
    },
    created() {
      this.getAllTodos();
    }
  }
</script>