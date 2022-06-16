<template>
  <NavBar :state="state"/>
  <div class="container-fluid mt-3 position-relative">
    userboard
    <router-view/>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  data() {
    return {
      state: '',
    };
  },
  components: { NavBar },
  created() {
    this.$check();
  },
};
</script>
