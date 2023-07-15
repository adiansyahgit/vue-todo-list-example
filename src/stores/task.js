import { defineStore } from "pinia"
import { allTasks } from "../http/task-api";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        task: {
            id: 1,
            name: "first task",
            is_complete: false
        }
    }),
    getters: {
        completedTask: (state) => state.tasks.filter(task => task.is_complete),
        uncompletedTask() {
            return this.tasks.filter(task => !task.is_complete)
        }
    },
    actions: {
        async fetchAllTask () {
            const { data } = await allTasks()
            this.tasks = data.data
        }
    }
})