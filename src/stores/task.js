import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia"
import { allTasks, createTask } from "../http/task-api";

const tmp = {
    state: () => ({}),
    getters: {
    },
    actions: {

    }
}

export const useTaskStore = defineStore('taskStore', () => {
    const tasks = ref([])

    const completedTask = computed(() =>
        tasks.value.filter(task => task.is_complete)
    )
    const uncompletedTask = computed(() =>
        tasks.value.filter(task => !task.is_complete)
    )
    const fetchAllTask = async () => {
        const { data } = await allTasks()
        tasks.value = data.data
    }

    const handleAddedTask = async (newTask) => {
        const { data: createdTask } = await createTask(newTask)
        tasks.value.unshift(createdTask.data)
    }

    return {
        tasks, 
        completedTask, 
        uncompletedTask, 
        fetchAllTask,
        handleAddedTask
    }
})