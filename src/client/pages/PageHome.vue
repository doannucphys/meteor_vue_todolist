<template>
  <b-container class="page">
    <b-row>
      <p class="title">Welcome to Home page.</p>
    </b-row>
    <b-row>
      <p>Go to <strong class="link" @click="toTodoList">Todo list</strong> to see your tasks</p>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'PageHome',
  methods: {
    toTodoList() {
      this.$router.push({name: 'todolist'});
    }
  }
}
</script>

<style scoped lang="less">
@import url("~src/client/styles/color.import.less");
.page {
  margin-top: 50px;
  margin-bottom: 30px;
  & .title {
    font-weight: bold;
    font-size: 28px;
  }
  & .link {
    color: @blueColor;
    &:hover {
      cursor: pointer;
      color: @redColor;
    }
  }
}
</style>