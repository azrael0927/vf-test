<template>
  <div class="position-absolute end-0 p-3" style="z-index: 11" ref="toast">
    <ToastContent
    v-for="(item, key) in message"
    :key="key"
    :msg="item"/>
  </div>

</template>

<script>
import ToastContent from './ToastContent.vue';

export default {
  components: { ToastContent },
  data() {
    return { message: [] };
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      console.log(message);
      const { style = 'success', title, content } = message;
      this.message.push({ style, title, content });
    });
  },
};
</script>
