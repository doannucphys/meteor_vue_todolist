<template>
  <fragment>
    <b-navbar class="desktop-menu">

      <b-navbar-brand class="menu-logo">
        <router-link :to="{name: 'home'}">
          <img style="width: auto; height: 50px" :src="logo" class="d-inline-block align-top" alt="logo">
        </router-link>
      </b-navbar-brand>

      <b-navbar-nav>
        <router-link :to="{name: 'home'}">
          <div class="menu-home">
            Home
          </div>
        </router-link>
        <router-link :to="{name: 'todolist'}">
          <div  class="menu-todolist">
            Todo List
          </div>
        </router-link>
      </b-navbar-nav>

    </b-navbar>

    <slot></slot>

  </fragment>
</template>

<script>
  export default {
    name: 'Layout',
    data() {
      return {
        logo: '/img/logo/logo.png'
      }
    }
  }
</script>

<style scoped lang="less">
.desktop-menu {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  background-color: white;
  height: 80px;
  width: 100%;
  text-align: middle;
  font-size: 17px;
  & .menu-logo {
    padding-top: 0px;
    height: 50px;
    margin-left: 135px;
    font-weight: 600;
    &:hover {
      cursor: pointer;
    }
  }
  & .menu-home {
    margin-left: 60px;
    &:hover {
      cursor: pointer;
    }
  }
  & .menu-todolist {
    margin-left: 30px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
