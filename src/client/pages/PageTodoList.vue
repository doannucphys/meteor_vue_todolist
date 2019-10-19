<template>
  <b-container class="page">
    <b-row class="justify-content-center">
      <b-col cols="12" md="10">
        <p class="title">Welcome to Todo list.</p>
        <p>You need to login in to modify this list</p>
        <hr>

        <task-item :isHead="true"/>

        <div v-for="(task, idx) in tasks" :key="idx">
          <task-item :taskData="task" :id="idx" :name="'task-item' + idx" @overDeadline="overDeadline(task._id)"/>
        </div>
    
        <b-row v-if="isShowInput">

          <b-col cols="12" md="8">
            Task:
            <b-textarea v-if="isShowInput" :id="'Input'" :type="'text'"
              placeholder="add new task"
              v-model="newTask">
            </b-textarea>
          </b-col>

          <b-col cols="12" md="4">
            Deadline:
            <datetime 
              type="datetime" 
              class="date-input" 
              v-model="deadline" 
              :min-datetime="minDatetime"
              :max-datetime="maxDatetime"
              format="yyyy-MM-dd HH:mm:ss"/>
          </b-col>

        </b-row>

        <hr v-if="isShowInput">

        <b-row align-h="end">
          <button class="std-btn v-spacer" @click="toggleInputEnable()">{{btnText}}</button>
        </b-row>

        <b-modal ref="my-modal" hide-footer title="Deadline">
          <div class="d-block text-center">
            <h3>You have deadline!</h3>
          </div>
          <b-button class="mt-3" variant="outline-danger" block @click="hideModal">OK</b-button>
        </b-modal>

      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {Datetime} from 'vue-datetime';
import { DateTime as LuxonDateTime } from 'luxon'
import 'vue-datetime/dist/vue-datetime.css';
import {mapActions} from 'vuex-alt';
import {Tasks} from '/src/imports/modules/tasks/shared/collections/tasks-collections'
export default {
  name: 'PageTodoList',
  data() {
    return {
      isShowInput: false,
      newTask: '',
      deadline: '',
      today: new Date(),
      minDatetime: LuxonDateTime.local().minus({ month: 0, days: 0 }).toISO(),
      maxDatetime: LuxonDateTime.local().plus({ month: 12, days: 30 }).toISO()
    }
  },
  meteor: {
    $subscribe: {'tasks_public': []},
    tasks() {
      return Tasks.find({}, { sort: { createdAt: -1 } }).fetch();
    }
  },
  computed: {
    btnText() {
      return this.isShowInput ? 'update' : 'add';
    }
  },
  methods: {
    ...mapActions({
      actionAddTask: (actions) => actions.tasks.actionAddTask
    }), 
    toggleInputEnable() {
      if (this.isShowInput && this.newTask) {
        this.actionAddTask({taskObj: {
          task: this.newTask,
          deadline: new Date(this.deadline)
        }});
        this.newTask = '';
        this.deadline = '';
      }
      this.isShowInput = !this.isShowInput;
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    overDeadline(taskId) {
      this.$refs['my-modal'].show();
    }
  },
  components: {
    datetime: Datetime,
    TaskItem: async () => (await import('/src/client/tasks/TaskItem.vue')).default
  }
}
</script>
<style scoped lang="less">
@import url("~src/client/styles/color.import.less");
@import url("~src/client/styles/button.import.less");
.page {
  margin-top: 50px;
  margin-bottom: 30px;
  & .title {
    font-weight: bold;
    font-size: 28px;
    color: @redColor;
  }
  & .v-spacer {
    margin-top: 20px;
  }
}
</style>
