<template>
   <div class="container" v-cloak>
        <h1>{{ todoTitle }}</h1>
        <p v-if="tasks.length===0">No Tasks. Add Some!</p>
                <p v-for="(task, id) in tasks" v-bind:class="task.completed ? 'strike' : ''" :key="id"> 
                {{ task.title }} {{ task.date }} {{ task.priority }}
                <button title="Edit Task" class="edit" :disabled="isDisabled(task)" @click="showModal(task, id)">
                    <font-awesome-icon icon="fa-solid fa-edit" />
                </button> 
                <button class="complete" :disabled="isDisabled(task)" @click="markComplete(this.$route.params.id, id)" title="Mark as Complete">
                    <font-awesome-icon icon="fa-solid fa-check-circle" />
                </button>
                <button title="Delete Task" class="delete" @click="deleteTask(id)" v-show="!isDisabled(task)">
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                </button>
                </p>
        <TaskModal 
        v-show="modalVisible" 
        :title="this.taskTitle" 
        :date="this.taskDate" 
        :priority="this.taskPriority" 
        @close="closeModal" 
        @callback="getTasks"/>

        <button @click="this.$router.go(-1)">Back</button>
        <button @click="showModal">Add Task?</button>
        <button @click="deleteTodo(this.$route.params.id)">Delete ToDo List?</button>
   </div>
</template>
<style scoped>
    div {
        margin: auto;
    }
    .strike {
        text-decoration: line-through;
    }
    p > button {
        border:0;
        background:none;
    }
    button:not([disabled]) {
        cursor: pointer;
    }
    .complete:not([disabled]), font-awesome{
        color: green;
        font-size: medium;
    }
    .edit:not([disabled]), font-awesome{
        color: orange;
        font-size: medium;
    }
    .delete:not([disabled]), font-awesome{
        color:red;
        font-size: medium;
    }
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
            todoTitle: this.$route.params.title,
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
        async markComplete(todoId, taskId) {
            try {
                var taskData = {"data": {"todoId": parseInt(todoId),"taskId": taskId, "markComplete": true}};

                const resp = await axios.put("http://localhost:3000/tasks/" + todoId, taskData);

                if (resp.status === 200) {
                    await this.getTasks();
                    this.$refs.edit.disabled = true;
                    this.$refs.complete.disabled = true;
                } else {
                    console.log("failure");
                }

            } catch (err) {
                console.log(err);
            }
        },
        async deleteTask(id) {
            try {
                const resp = await axios.delete(`http://localhost:3000/tasks/${this.$route.params.id}/${id}`);

                if (resp.status === 200) {
                    console.log("success");
                    await this.getTasks();
                }

            } catch (err){
                console.log(err);
            }
        },
        async deleteTodo(id) {
            try {
                console.log("id in delete" + id);
                const resp = await axios.delete(`http://localhost:3000/todos/${id}`);

                if (resp.status === 200) {
                    console.log("success");
                   this.$router.push({path: '/'});
                }
            } catch (err) {
                console.log(err);
            }
        },
        isDisabled(task) {
            if (task.completed) {
                return true;
            } 

            return false;
        },
        showModal(task, id) {
            TaskModal.props = [id, task.title, task.date, task.priority];
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