<template>
  <LoadingEffect :active="is_loading"/>
  <div class="text-end">
    <button type="button" class="btn btn-primary mt-3 text-end" @click="openProductModal">
      新增產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th class="text-center" width="120">分類</th>
        <th>產品名稱</th>
        <th class="text-center" width="120">原價</th>
        <th class="text-center" width="120">售價</th>
        <th class="text-center" width="100">是否啟用</th>
        <th class="text-center" width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td class="text-center">{{item.category}}</td>
        <td>{{item.title}}</td>
        <td class="text-center">{{$filters.currency(item.origin_price)}}</td>
        <td class="text-center">{{$filters.currency(item.price)}}</td>
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
            @click="openProductModal(item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
  :product="tempProduct"
  @update-product="updateProduct"
  ref="productModal" />
  <DelModal
  :item="tempProduct"
  @del-item="delProduct"
  ref="delModal"/>
  <PagiNation
  :page="pagination"
  @change-page="getProducts" />
</template>

<script>
import ProductModal from '../components/ProductModal.vue';
import DelModal from '../components/DelModal.vue';
import PagiNation from '../components/PagiNation.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      is_loading: false,
    };
  },
  components: {
    ProductModal,
    DelModal,
    PagiNation,
  },
  inject: ['emitter'],
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.is_loading = true;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = [...res.data.products];
          this.pagination = { ...res.data.pagination };
          this.$httpMessageState(res, '資料取得');
        } else {
          this.$httpMessageState(res, '資料取得');
        }
        this.is_loading = false;
      });
    },
    updateProduct(item) {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (item.id) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      this.is_loading = true;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.is_loading = false;
        if (res.data.success) {
          this.getProducts();
          this.$refs.productModal.hide();
          const title = httpMethod === 'post' ? '新增' : '更新';
          this.$httpMessageState(res, title);
        } else {
          this.$refs.productModal.hide();
          this.$httpMessageState(res, '更新');
        }
      });
    },
    delProduct(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.is_loading = true;
      this.$http.delete(api).then((res) => {
        this.is_loading = false;
        if (res.data.success) {
          this.getProducts();
          this.$httpMessageState(res, '刪除');
        } else {
          this.$httpMessageState(res, '刪除');
        }
      });
      this.$refs.delModal.hide();
    },
    openProductModal(item) {
      if (item.id) this.tempProduct = { ...item };
      else this.tempProduct = {};
      this.$refs.productModal.show();
    },
    openDelModal(item) {
      this.$refs.delModal.show();
      this.tempProduct = { ...item };
    },
  },
  created() {
    this.getProducts();
    if (window.history.state.back === '/login') {
      this.$httpMessageState(true, '登入');
    }
    console.log(window.history.state.back);
  },
};
</script>
