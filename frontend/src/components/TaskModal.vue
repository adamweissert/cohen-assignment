<template>
    <div class="modal-mask">
        <div class="modal">
            <header class="modal-header">
              <slot name="header">
                Add Task
                  <button type="button" class="btn-close" @click="close"> x </button>
            </slot>
            </header>
            <section class="modal-body">
                <slot name="body">
                    <label for="description">Description: </label>
                    <input type="text" name="description" id="description"/>
                    <br/>
                  <label for="date">Due Date: </label>
                    <input type="date" name="date" id="date"/>
                    <br/>
                  <label for="priority">Priority: </label>
                   <select name="Priority" id="priority">
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                   </select>
                </slot>
            </section>
            <footer class="modal-footer">
                <slot name="footer">
                  <p class="btn-cancel" @click="close">Cancel</p>
                <button disabled="true" type="button" class="btn-submit" @click="close">Submit</button>
                </slot>
            </footer>
        </div>
    </div>
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
    color: #4AAE9B;
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
    height: 100px;
    width: 250px;
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
    color: #4AAE9B;
    background: transparent;
  }

  .btn-submit {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
    padding: 10px;
    cursor: pointer;
  }
  .btn-cancel {
    color: red;
    cursor: pointer;
  }
</style>
<script>
  export default {
    name: "TaskModal",
    methods: {
       close() {
        this.$emit('close');
      },
    },
}
</script>