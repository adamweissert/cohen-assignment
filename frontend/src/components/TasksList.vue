<template>
   <div id="container" v-cloak>
    <h1>{{ this.$route.params.title }}</h1>
   </div>
</template>
<style scoped>
</style>
<script>
  import axios from 'axios';
  export default {
    name: 'TaskList',
    data(){
      return {
        taskTitle: "",
        taskDate: "",
        taskPriority: "",
        taskComplete: false,
      }
    }, methods: {
      async getTasks() {
        try {
          const resp = await axios.get('http://localhost:3000/tasks/'+this.$route.params.id);
          this.todos = resp.data;
        } catch (err) {
          console.log(err);
        }
      },
    },
    created() {
      this.getTasks();
    }
  }
</script>