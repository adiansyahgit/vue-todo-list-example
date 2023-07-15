import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia"
import { allTasks, createTask, updateTask, completeTask, deleteTask } from "../http/task-api";

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

    const handleUpdatedTask = async (task) => {
        const { data: updatedTask } = await updateTask(task.id, {
            name: task.name
        })
        const currentTask = tasks.value.find(item => item.id == task.id)
        currentTask.name = updatedTask.data.name
    }

    const handleCompletedTask = async (task) => {
        const { data: updatedTask } = await completeTask(task.id, {
            is_complete: task.is_complete
        })
        const currentTask = tasks.value.find(item => item.id == task.id)
        currentTask.is_complete = updatedTask.data.is_complete
    }

    const handleRemovedTask = async (task) => {
        await deleteTask(task.id)
        const index = tasks.value.findIndex(item => item.id == task.id)
        tasks.value.splice(index, 1)
    }

    return {
        tasks,
        completedTask,
        uncompletedTask,
        fetchAllTask,
        handleAddedTask,
        handleUpdatedTask,
        handleRemovedTask,
        handleCompletedTask,
    }
})