<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a
        class="page-link fw-bold"
        :class="{'disabled' : !tempPage.has_pre}"
        href="#"
        aria-label="Previous"
        @click.prevent="$emit('change-page', tempPage.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="item in tempPage.total_pages" :key="item">
        <a class="page-link"
        :class="{'active' : item === tempPage.current_page}"
        href="#"
        @click.prevent='$emit("change-page", item)'>
          {{item}}
        </a>
      </li>
      <li class="page-item">
        <a
        class="page-link fw-bold"
        :class="{'disabled' : !tempPage.has_next}"
        href="#"
        aria-label="Next"
        @click.prevent="$emit('change-page', tempPage.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    page: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    page() {
      this.tempPage = this.page;
    },
  },
  data() {
    return {
      tempPage: this.page,
    };
  },
};
</script>
