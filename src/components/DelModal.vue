<template>
  <div
  class="modal
  fade"
  id="exampleModal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
  ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title" id="exampleModalLabel">刪除產品</h5>
          <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
        </div>
        <div class="modal-body">
          確定刪除 <span class="fw-bold">{{tempProduct.title}}</span> 嗎??
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button
          type="button"
          class="btn
          btn-primary"
          @click="$emit('del-item', tempProduct.id)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from '@/mixins/ModalMixin';

export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    item() {
      this.tempProduct = this.item;
    },
  },
  data() {
    return {
      modal: {},
      tempProduct: {},
    };
  },
  mixins: [Mixins],
};
</script>
