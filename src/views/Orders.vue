<template>
<div class="container" style="margin-top: 100px;">
<h1 class="text-center">訂單明細</h1>
<hr class="border-danger">
<div class="card bg-light p-5 shadow">
  <b-table striped hover :items="orders" :fields='fields'>
    <template #cell(date)='data'>
      {{ new Date(data.item.date).toLocaleString('zh-tw') }}
    </template>
    <template #cell(products)='data'>
      <ul>
        <li v-for='product in data.item.products' :key='product._id'>
          {{ product.product.name }} x {{ product.quantity }}
        </li>
      </ul>
    </template>
  </b-table>
</div></div>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
      fields: [
        { key: '_id', label: '單號' },
        { key: 'date', label: '日期' },
        { key: 'products', label: '商品' }
      ]
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/orders/me', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.orders = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '失敗',
        text: '取得訂單失敗'
      })
    }
  }
}
</script>
