<template>
  <fragment>
    
    <b-row class="tab-row" v-if="taskData && taskData.task && !isHead">

      <b-col cols="12" md="3">
        <span v-if="!isShowEdit">{{taskData.task}}</span>
         <b-textarea v-if="isShowEdit" :id="'Input'" :type="'text'"
          placeholder="modify task"
          v-model="taskEdit">
        </b-textarea>
      </b-col>

      <b-col cols="12" md="3">
        <span v-if="!isShowEdit">{{taskData.deadline.toLocaleString()}}</span>
        <datetime
          v-if="isShowEdit" 
          type="datetime" 
          class="date-input" 
          v-model="taskDeadline" 
          format="yyyy-MM-dd HH:mm:ss"/>
      </b-col>
     
      <b-col cols="12" md="3">
        <span v-if="timeToDeadline > 0">{{days}}d-{{hours}}h-{{ minutes}}m-{{ seconds}}s</span>
        <span v-else class='over-deadline'>Over deadline</span>
      </b-col>

      <b-col cols="12" md="3">
        <span @click="deleteItem" class="delete-item">delete</span>
        <span @click="toggleEditItem" class="delete-item">{{btnText}}</span>
      </b-col>
    </b-row>

    <b-row v-else-if="isHead" class="head">

      <b-col cols="12" md="3">
        <span>Task</span>
      </b-col>
      
      <b-col cols="12" md="3">
        <span>Deadline</span>
      </b-col>
      
      <b-col cols="12" md="3" >
        <span>Time to Deadline</span>
      </b-col>
      <b-col cols="12" md="3" >
        <span>Actions</span>
      </b-col>

    </b-row>

    <hr>
  </fragment>
</template>

<script>
import moment from 'moment'
import {mapActions} from 'vuex-alt';
import {Datetime} from 'vue-datetime';
import { DateTime as LuxonDateTime } from 'luxon'
import 'vue-datetime/dist/vue-datetime.css';
export default {
  props: ['taskData', 'isHead'],
  name: 'TaskItem',
  data() {
    return {
      isShowEdit: false,
      taskEdit: '',
      taskDeadline: '',

      clock: 1000*20,
      noticed: false,

      interval: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      markDiffTime: '',
      timeToDeadline: '',
      intervals: {
        second: 1000,
        minute: 1000 * 60,
        hour: 1000 * 60 * 60,
        day: 1000 * 60 * 60 * 24
      }
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.updateDiffs(false);
    }, this.clock);
    
    this.updateDiffs(true);
  },
  created() {
    this.taskEdit = (this.taskData && this.taskData.task) ? this.taskData.task : '';
    this.taskDeadline = (this.taskData && this.taskData.deadline) ? this.taskData.deadline.toISOString() : '';
  },
  computed: {
    btnText() {
      return this.isShowEdit ? 'update' : 'edit';
    }
  },
  methods: {
    ...mapActions({
      actionDeleteTask: (actions) => actions.tasks.actionDeleteTask,
      actionUpdateTask: (actions) => actions.tasks.actionUpdateTask
    }),
    updateDiffs(onCreated) {
      if (this.taskData && this.taskData.deadline) {
        let diff = (new Date(this.taskDeadline)).getTime() - (new Date()).getTime();
        this.markDiffTime = diff;
        if (diff > 0) {
          this.timeToDeadline = diff;
          this.days = Math.floor(diff / this.intervals.day);
          diff -= this.intervals.day * this.days;
          this.hours = Math.floor(diff / this.intervals.hour);
          diff -= this.intervals.hour * this.hours;
          this.minutes = Math.floor(diff / this.intervals.minute);
          diff -= this.intervals.minute * this.minutes;
          this.seconds = Math.floor(diff / this.intervals.second);
        }
        if (!onCreated && !this.noticed && (!this.timeToDeadline || (Math.abs(this.timeToDeadline) < 3*this.clock)) ) {
          this.$emit('overDeadline');
          this.noticed = true;
        } else if (onCreated && (this.markDiffTime/this.intervals.day) >= - 1 && this.markDiffTime <= 0) {
          this.$emit('overDeadline');
        }
      }
    },
    async deleteItem() {
      let removed = await this.actionDeleteTask({taskId: this.taskData._id});
    },
    async toggleEditItem() {
      if (this.isShowEdit && this.taskEdit) {
        let updated = this.actionUpdateTask({taskObj: {
          taskId: this.taskData._id,
          task: this.taskEdit,
          deadline: new Date(this.taskDeadline)
        }});
        this.newTask = '';
        this.deadline = '';
        this.noticed = false;
        this.updateDiffs(false);
      }
      this.isShowEdit = !this.isShowEdit;
    }
  },
  components: {
    datetime: Datetime
  }
}
</script>

<style scoped lang="less">
@import url("~src/client/styles/color.import.less");
.tab-row {
  margin-top: 0px;
  margin-bottom: 0px;
  & .delete-item {
    font-size: 16px;
    padding: 0px 20px 0px 20px;
    color: @blueColor;
    &:hover {
      cursor: pointer;
      font-weight: bold;
      color: @redColor;
    }
  }
  & .edit-item {
    .delete-item();
    color: @redColor;
  }
  & .over-deadline {
    color: @redColor;
  }
}
.head {
  font-size: 16px;
  font-weight: 900;
}
</style>