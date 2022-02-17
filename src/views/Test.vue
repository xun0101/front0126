<template>
  <div class="container" style="margin-top:100px;">
  <div class="card bg-light p-5 shadow">
  <div>
    <b-table
      :items="orders"
      :fields="fields"
      ref="selectableTable"
      selectable
    >
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
      <template #cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
  </div>
  <b-table :items="selected" :fields="field">

  </b-table>
  </div></div>
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
        { key: 'selected', label: '完成' }
      ],
      orders: []
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
