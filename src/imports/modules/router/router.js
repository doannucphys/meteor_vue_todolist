import VueRouter from 'vue-router';

// import component dynamically
const PageHomeAsync = (resolve) => {
  import('/src/client/pages/PageHome.vue')
  .then((PageHome) => resolve(PageHome.default));
};
const PageTodoListAsync = (resolve) => {
  import('/src/client/pages/PageTodoList.vue')
  .then((PageTodoList) => resolve(PageTodoList.default));
};

const createRouter = () => {
  var routes = [
    {
      path: '/',
      name: 'home',
      component: PageHomeAsync,
      meta: {
        scrollToTop: true,
        title: "Demo - Home page"
      }
    },
    {
      path: '/',
      component: PageHomeAsync,
      meta: {
        scrollToTop: true,
        title: "Demo - Home page"
      }
    },
    {
      path: '/todo',
      name: 'todolist',
      component: PageTodoListAsync,
      meta: {
        title: "Demo - Todo list"
      }
    },
  ];

  // save scroll position when go back to previous page
  const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.matched.some(m => m.meta.scrollToTop)) {
        position.x = 0;
        position.y = 0;
      }
      return position;
    }
  }

  const router = new VueRouter({
    // use most history to save scroll position of page
    mode: 'history',
    scrollBehavior,
    routes,
  });

  return router;
}


export {
  createRouter
};
