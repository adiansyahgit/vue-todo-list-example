import { defineStore } from "pinia"

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
        uncompletedTask () {
            return this.tasks.filter(task => !task.is_complete)
        }
    }
})