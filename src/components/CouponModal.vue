<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white" id="exampleModalLabel">新增優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="title" class="form-label d-block"
                >名稱
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入名稱"
                  v-model="tempCoupon.title"
                />
              </label>
            </div>
            <div class="mb-3 col-md-6">
              <label for="percent" class="form-label d-block"
                >優惠折扣
                <input
                  type="number"
                  class="form-control"
                  id="percent"
                  placeholder="請輸入優惠折扣"
                  v-model="tempCoupon.percent"
                />
              </label>
            </div>
          </div>
          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="due_date" class="form-label d-block"
                >到期日
                <input
                  type="date"
                  class="form-control"
                  id="due_date"
                  placeholder="請輸入到期日"
                  v-model="due_date"
                />
              </label>
            </div>
            <div class="mb-3 col-md-6">
              <label for="code" class="form-label d-block"
                >折扣碼
                <input
                  type="text"
                  class="form-control"
                  id="code"
                  placeholder="請輸入折扣碼"
                  v-model="tempCoupon.code"
                />
              </label>
            </div>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <label class="form-check-label" for="is_enabled">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                />
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button
          type="button"
          class="btn
          btn-primary"
          @click="$emit('update-coupon', tempCoupon)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from '@/mixins/ModalMixin';

export default {
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      tempCoupon: {},
      due_date: '',
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime;
    },
    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
    },
  },
  mixins: [Mixins],
};
</script>
