<template>
<div class="container" style="margin-top: 80px;">
  <b-table :items="orders" :fields='fields'>
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
    <template #cell(check)='data'>
      {{ data.field.key }}
      <!-- <button v-if="data.field.key == true" @click="b1(data.index)">1</button>
      <button v-else @click="b2(data.index)">2</button> -->
    <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="已完成"
      unchecked-value="未完成"
    >
    </b-form-checkbox>

    <div>狀態: <strong>{{ status }}</strong></div>
    </template>
  </b-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
      fields: [
        { key: '_id', label: '單號' },
        { key: 'user', label: '使用者' },
        { key: 'date', label: '日期' },
        { key: 'products', label: '商品' },
        { key: 'check', label: '完成' }
      ],
      status: '未完成'
    }
  },
  methods: {
    b1 (index) {
      console.log(this.data.field.key)
      this.data.field.key = false
    },
    b2 (index) {
      console.log(this.data.field.key)
      this.data.field.key = true
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
