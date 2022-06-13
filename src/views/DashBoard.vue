<template>
  <NavBar />
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
  provide() {
    return {
      emitter,
    };
  },
  components: {
    NavBar,
    ToastMessage,
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // console.log(token);
    this.$http.defaults.headers.common.Authorization = token;
    const api = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(api, this.user).then((res) => {
      if (!res.data.success) {
        this.$router.push('/login');
      }
    });
  },
};
</script>
