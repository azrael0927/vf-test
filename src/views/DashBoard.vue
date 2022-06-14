<template>
  <NavBar :state="state"/>
  <ToastMessage />
  <div class="container-fluid mt-3 position-relative">
    <router-view/>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import emitter from '../methods/mitt';
import ToastMessage from '../components/ToastMessage.vue';

export default {
  data() {
    return {
      state: '',
    };
  },
  provide() {
    return {
      emitter,
    };
  },
  components: {
    NavBar,
    ToastMessage,
  },
  beforeCreate() {
    this.$check();
  },
};
</script>
