<template>
   <div id="container" v-cloak>
    <h1>{{ this.$route.params.title }}</h1>
    <div v-for="task in tasks" :key="task.title">
        <p> <button>Edit</button>  {{ task.title }} {{ task.date }} {{ task.priority }}</p>
    </div>
    <TaskModal v-show="modalVisible" @close="closeModal" />
    <button @click="showModal">Add Task?</button>
   </div>
</template>
<style scoped>
</style>
<script>
  import axios from 'axios';
  import TaskModal from './TaskModal.vue';
  
  export default {
    name: "TaskList",
    data() {
        return {
            tasks: [],
            taskTitle: "",
            taskDate: "",
            taskPriority: "",
            taskComplete: false,
            modalVisible: false,
        };
    },
    methods: {
        async getTasks() {
            try {
                const resp = await axios.get("http://localhost:3000/tasks/" + this.$route.params.id);
                this.tasks = resp.data[0];
            }
            catch (err) {
                console.log(err);
            }
        },
        showModal() {
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
        }
    },
    created() {
        this.getTasks();
    },
    components: { TaskModal }
}
</script>