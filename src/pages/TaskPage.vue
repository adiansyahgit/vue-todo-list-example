<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask @added="handleAddedTask" />

                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTask" @updated="handleUpdatedTask" />

                    <div class="text-center my-3" v-show="showToggleCompletedBtn">
                        <button class="btn btn-sm btn-info" @click="showCompletedTasks = !showCompletedTasks">
                            <span v-if="!showCompletedTasks"> Show Completed </span>
                            <span v-else> Hide Completed </span>
                        </button>
                    </div>

                    <!-- List of completed tasks -->
                    <Tasks :tasks="completedTask" :show="completedTaskIsVisible && showCompletedTasks" />
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { allTasks, createTask, updateTask } from "../http/task-api"
import Tasks from "../components/tasks/Tasks.vue";
import NewTask from "../components/tasks/NewTask.vue";

const tasks = ref([])

onMounted(async () => {
    const { data } = await allTasks()
    tasks.value = data.data
})

const uncompletedTask = computed(() => tasks.value.filter(task => !task.is_complete))
const completedTask = computed(() => tasks.value.filter(task => task.is_complete))
const showToggleCompletedBtn = computed(() => uncompletedTask.value.length > 0 && completedTask.value.length > 0)
const completedTaskIsVisible = computed(() => uncompletedTask.value.length == 0 || completedTask.value.length > 0)
const showCompletedTasks = ref(false)

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
</script>