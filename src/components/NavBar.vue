<template>
  <LoadingEffect :active="is_loading"/>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/about">about</router-link>
          <router-link class="nav-link" to="/dashboard/products">產品管理</router-link>
          <router-link class="nav-link" to="/dashboard/coupons">優惠券</router-link>
          <router-link class="nav-link" to="/dashboard/orders">訂單管理</router-link>
          <router-link class="nav-link" to="/login" v-if="!state">登入</router-link>
          <a class="nav-link" href="#" @click.prevent="signout" v-else>登出</a>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      is_loading: false,
    };
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_API}logout`;
      this.is_loading = true;
      this.$http.post(api).then((res) => {
        this.is_loading = false;
        if (res.data.success) {
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>
