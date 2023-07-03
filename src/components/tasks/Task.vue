<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input class="form-check-input mt-0" 
                type="checkbox" 
                :class="completedClass" 
                :checked="task.is_complete" 
                @change="markTaskAsComplete"
            />
            <div class="ms-2 flex-grow-1" 
                :class="completedClass" 
                title="Double click the text to edit or remove"
                @dblclick="isEdit=true"
            >
                <div class="relative" v-if="isEdit">
                    <input class="editable-task" 
                        type="text" 
                        @keyup.esc="undo"
                        @keypress.enter="updateTask" 
                        v-focus 
                        v-model="editingTask"
                    />
                </div>
                <span v-else>{{ task.name }}</span>
            </div>
            <!-- <div class="task-date">24 Feb 12:00</div> -->
        </div>

        <TaskActions 
            @edit="isEdit = true" 
            @remove="removeTask"
            v-show="!isEdit" />
    </li>
</template>

<script setup>
import { computed, ref } from "vue";
import TaskActions from "./TaskActions.vue";

const props = defineProps({
    task: Object
})

const emit = defineEmits(['updated', 'completed', 'removed'])

const isEdit = ref(false)
const editingTask = ref(props.task.name)

const completedClass = computed(() => props.task.is_complete ? "completed" : "")

// directive
const vFocus = {
    mounted: (el) => el.focus()
}

const updateTask = event => {
    const updatedTask = {...props.task, name: event.target.value}
    isEdit.value = false
    emit('updated', updatedTask)
}

const markTaskAsComplete = () => {
    const updatedTask = {...props.task, is_complete: !props.task.is_complete}
    emit('completed', updatedTask)
}

const removeTask = () => {
    if (confirm("Are you sure?")) {
        emit('removed', props.task)
    }
}

const undo = () => {
    isEdit.value = false
    editingTask.value = props.task.name
}
</script>