<template>
  <div class="container" style="margin-top:100px;">
  <div class="card bg-light p-5 shadow">
  <div>
    <b-table
      :items="orders"
      :fields="fields"
      :select-mode="selectMode"
      responsive="sm"
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
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
    <p>
      <b-button class="btn-green border-0" size="sm" @click="selectAllRows">完成所有</b-button>
      <b-button class="btn-green border-0 mx-3" size="sm" @click="clearSelected">均未完成</b-button>
    </p>
    <p>
      完成數:<br>
      {{ selected.length }}
    </p>
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
      orders: [],
      selectMode: 'multi',
      selected: [],
      field: [
        { key: '_id', label: '單號' }
      ]
    }
  },
  methods: {
    async onRowSelected (id) {
      console.log(id)
      this.selected = id
    },
    selectAllRows () {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected () {
      this.$refs.selectableTable.clearSelected()
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
