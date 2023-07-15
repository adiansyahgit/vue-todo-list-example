<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask />

                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTask" />

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
import { storeToRefs } from "pinia";
import { useTaskStore } from "../stores/task";
import Tasks from "../components/tasks/Tasks.vue";
import NewTask from "../components/tasks/NewTask.vue";

const store = useTaskStore();
const { completedTask, uncompletedTask } = storeToRefs(store)
const { fetchAllTask } = store

onMounted(async () => {
    await fetchAllTask()
})

const showToggleCompletedBtn = computed(() => uncompletedTask.value.length > 0 && completedTask.value.length > 0)
const completedTaskIsVisible = computed(() => uncompletedTask.value.length == 0 || completedTask.value.length > 0)
const showCompletedTasks = ref(false)

</script>