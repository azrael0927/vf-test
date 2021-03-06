export default function () {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  this.$http.defaults.headers.common.Authorization = token;
  const api = `${process.env.VUE_APP_API}api/user/check`;
  this.$http.post(api, this.user).then((res) => {
    if (!res.data.success) {
      this.state = false;
      this.$router.push('/login');
    } else {
      this.$router.push(this.$route.path);
    }
  });
}
