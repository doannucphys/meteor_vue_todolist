<template>
  <fragment>
    
    <b-row class="tab-row" v-if="taskData && taskData.task && !isHead">

      <b-col cols="12" md="3">
        <span v-if="!isShowEdit">{{taskData.task}}</span>
         <b-textarea v-if="isShowEdit" :id="'Input' + taskData._id" :type="'text'"
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
          :id="'editTime' + taskData._id"
          v-model="taskDeadline" 
          format="yyyy-MM-dd HH:mm:ss"/>
      </b-col>
     
      <b-col cols="12" md="3">
        <span v-if="isOverDeadline" class='over-deadline'>Over deadline</span>
        <span v-else>{{days}}d-{{hours}}h-{{ minutes}}m-{{ seconds}}s</span>
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
      deltaTime: 3*1000*20,

      noticed: false,
      isOverDeadline: false,

      interval: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
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
        let modDiff = diff;
        if (modDiff > 0) {
          this.days = Math.floor(modDiff / this.intervals.day);
          modDiff -= this.intervals.day * this.days;
          this.hours = Math.floor(modDiff / this.intervals.hour);
          modDiff -= this.intervals.hour * this.hours;
          this.minutes = Math.floor(modDiff / this.intervals.minute);
          modDiff -= this.intervals.minute * this.minutes;
          this.seconds = Math.floor(modDiff / this.intervals.second);
        }
        if (!onCreated && !this.noticed) {
          // auto notice when time comming up
          if (Math.abs(diff) <= this.deltaTime) {
            this.noticed = true;
            this.isOverDeadline = true;
            this.$emit('overDeadline');
          } else if (diff < 0 && Math.abs(diff) > this.deltaTime) {
            this.isOverDeadline = true;
          } else {
            this.isOverDeadline = false;
          }
        } else if (onCreated) {
          // notice when open page, only notice when deadline is in current or previous day
          if ((diff <= 0 && (diff/this.intervals.day >= - 1))  || (Math.abs(diff) < this.deltaTime)) {
            this.isOverDeadline = true;
            this.$emit('overDeadline');
          } else if (diff <= 0) {
            this.isOverDeadline = true;
          }
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