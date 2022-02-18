<template>
<b-container style="margin-top: 150px;">
  <b-table :items="orders" :fields="fields">
    <template #cell(_id)='data'>
      <!-- {{ data.item.user.account }} -->
      {{ data.index+1 }}
    </template>
    <template #cell(user)='data'>
      {{ data.item.user.account }}
    </template>
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
    <template #cell(state)='data'>
      {{ data.item._id }}
      <button  @click='finish(data.item._id, data.index)'>{{ data.item.state }}</button>
    </template>
  </b-table>
</b-container>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: '_id', label: '單號' },
        { key: 'user', label: '使用者' },
        { key: 'date', label: '日期' },
        { key: 'products', label: '商品' },
        { key: 'state', label: '完成' }
      ],
      orders: []
    }
  },
  methods: {
    async finish (id, index) {
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/orders/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.orders = data.result
    } catch (error) {
      console.log(error)
      this.$swal({
        icon: 'error',
        title: '失敗',
        text: '取得訂單失敗'
      })
    }
  }
}
</script>
