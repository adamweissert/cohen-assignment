import http from "../http-common";

class TodoListService {
    getTodos() {
        return http.get("/todos");
    }

    getTask(id) {
        return http.get("/task/id")
    }
}

export default new TodoListService();