<template>
    <div class='App'>
      <layout>
        <main>
          <router-view/>
        </main>
      </layout>
    </div>
</template>

<script>
import Layout from '/src/client/layout/Layout.vue';
export default {
  name: 'App',
}
</script>



 
