<template>
  <div class="text-end">
    <button type="button" class="btn btn-primary mt-3 text-end" @click="openProductModal">
      新增產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{item.category}}</td>
        <td>{{item.title}}</td>
        <td class="text-right">{{item.origin_price}}</td>
        <td class="text-right">{{item.price}}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-mult" v-else>未啟用</span>
        </td>
        <td>
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
  :product="tempProduct"
  @del-item="delProduct"
  ref="delModal"/>
</template>

<script>
import ProductModal from '../components/ProductModal.vue';
import DelModal from '../components/DelModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
    };
  },
  components: {
    ProductModal,
    DelModal,
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.products = [...res.data.products];
          this.pagination = { ...res.data.pagination };
        }
      });
    },
    updateProduct(item) {
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      if (item.id) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, { data: this.tempProduct }).then((res) => {
        this.getProducts();
        this.$refs.productModal.hide();
        console.log(res);
      });
    },
    delProduct(id) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          this.getProducts();
          this.$refs.delModal.hide();
        }
      });
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
  },
};
</script>
