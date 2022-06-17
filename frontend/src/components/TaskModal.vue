<template>
  <transition name="modal-fade" v-on:open-modal="handleData">
    <div class="modal-mask">
        <div class="modal" role="dialog" aria-labelledby="modalTitle"
        aria-describedby="modalDescription">
            <form @submit.prevent="addTask" ref="taskForm"  >
               <section class="modal-body">
                <slot name="body">
                    <label for="description">Description: </label>
                    <input type="text" required name="description" :taskTitle="taskTitle" v-model="taskTitle" placeholder="Add Description..."/>
                    <br/>
                  <label for="date">Due Date: </label>
                    <input type="date" name="date" min="2022-06-15" :taskDate="taskDate" required v-model="taskDate"/>
                    <br/>
                  <label for="priority">Priority: </label>
                   <select name="Priority" required id="Priority" :taskPriorty="taskPriority" v-model="taskPriority">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                   </select>
                </slot>
            </section>
            <footer class="modal-footer">
                <slot name="footer">
                  <p class="btn-cancel" @click="close"             aria-label="Close modal">Cancel</p>
                <button type="submit" class="btn-submit">Submit</button>
                </slot>
            </footer>
            </form>
        </div>
    </div>
  </transition>
</template>
<style scoped>
 .modal-mask {
       position: fixed;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       background-color: rgba(0, 0, 0, 0.3);
       display: flex;
       justify-content: center;
       align-items: center;
    }
  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 20px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #000;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: row;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 10px 10px;
    height: 200px;
    width: 450px;
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  .modal-body input, select {
    padding: 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #000;
    background: transparent;
  }
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
  .btn-submit {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    padding: 10px;
    font-size: medium;
    cursor: pointer;
  }
  .btn-cancel {
    color: red;
    cursor: pointer;
    font-size: smaller;
    margin: 10px;
  }
</style>
<script>
  import axios from 'axios';

  export default {
    name: "TaskModal",
    props: ['title', 'date', 'priority'],
    data() {
      return {
        taskId: "",
        taskTitle: "",
        taskDate: "",
        taskPriority: "",
      }
    },
    methods: {
       close() {
         this.taskTitle = "",
        this.taskDate = "",
        this.taskPriority = "Low",
        this.$refs.taskForm.reset();
        this.$emit('close');
      },
      async addTask() {
        try {
          let todoId = this.$route.params.id;

          let data = { 
            'data':  {
              'todoId': todoId, 
              'title': this.taskTitle, 
              'date': this.taskDate, 
              'priority': this.taskPriority
            } 
          };

          const resp = await axios.post("http://localhost:3000/tasks/" + this.$route.params.id, data);

          if (resp.status == 200) {
            if (resp.data.taskId) {
              this.$emit('callback');
              this.close();
            } else {
              alert(resp.data.message);
            }

            this.$refs.taskForm.reset();
          }
        } catch (err) {
          console.log(err);
        }
      },
      handleData(taskData) {
        console.log(taskData);
      }
    },
    }
</script>