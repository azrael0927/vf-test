<template>
  <LoadingEffect :active="is_loading"/>
  <div class="text-end">
    <button type="button" class="btn btn-primary mt-3 text-end" @click="openCouponModal">
      新增優惠券
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th class="text-center">名稱</th>
        <th class="text-center">優惠折扣</th>
        <th class="text-center">到期日</th>
        <th class="text-center">優惠碼</th>
        <th class="text-center">是否啟用</th>
        <th class="text-center">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in coupons" :key="item.id">
        <td class="text-center">{{item.title}}</td>
        <td class="text-center">{{item.percent}} %</td>
        <td class="text-center">{{$filters.date(item.due_date)}}</td>
        <td class="text-center">{{item.code}}</td>
        <td class="text-center">
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-mult" v-else>未啟用</span>
        </td>
        <td class="text-center">
          <div class="btn-group">
            <button
            class="btn
            btn-outline-primary
            btn-sm"
            @click="openCouponModal(item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <DelModal
  :item="tempCoupon"
  @del-item="delCoupon"
  ref="delModal"/>
  <PagiNation
  :page="pagination"
  @change-page="getCoupons"
  v-if="pagination.total_page > 1"/>
  <CouponModal
  :coupon="tempCoupon"
  @update-coupon="updateCoupon"
  ref="couponModal"/>
</template>

<script>
import PagiNation from '../components/PagiNation.vue';
import DelModal from '../components/DelModal.vue';
import CouponModal from '../components/CouponModal.vue';

export default {
  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      is_loading: false,
    };
  },
  components: {
    PagiNation,
    DelModal,
    CouponModal,
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`;
      this.is_loading = true;
      this.$http.get(api).then((res) => {
        this.is_loading = false;
        if (res.data.success) {
          this.pagination = { ...res.data.pagination };
          this.coupons = [...res.data.coupons];
          this.$httpMessageState(res, '資料取得');
        }
      });
    },
    updateCoupon(item) {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = 'post';
      let title = '新增';
      if (item.id) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`;
        httpMethod = 'put';
        title = '更新';
      }
      this.is_loading = true;
      this.$http[httpMethod](api, { data: this.tempCoupon }).then((res) => {
        this.is_loading = false;
        if (res.data.success) {
          this.getCoupons();
          this.$httpMessageState(res, title);
        } else {
          this.$httpMessageState(res, title);
        }
        this.$refs.couponModal.hide();
      });
    },
    delCoupon(id) {
      console.log(id);
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`;
      this.is_loading = true;
      this.$http.delete(api).then((res) => {
        this.is_loading = false;
        if (res.data.success) {
          this.getCoupons();
          this.$httpMessageState(res, '刪除');
        } else {
          this.$httpMessageState(res, '刪除');
        }
        this.$refs.delModal.hide();
      });
    },
    openCouponModal(item) {
      if (item.id) {
        this.tempCoupon = { ...item };
      } else {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      }
      this.$refs.couponModal.show();
    },
    openDelModal(item) {
      this.tempCoupon = { ...item };
      this.$refs.delModal.show();
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
