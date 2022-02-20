<template>
<b-container style="margin-top: 150px;">
  <b-table :items="orders" :fields="fields" ref='table'>
    <template #cell(_id)='data'>
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
      <button  @click='check(data.item._id, data.index)' v-b-modal.modal-state>確認</button>
      <p>已完成:{{ data.item.state }}</p>
      <div v-if='data.item.state === true'>✔</div>
    </template>
  </b-table>
  <b-modal id="modal-state"
    title="操作"
    centered
    ok-variant='success'
    ok-title='送出'
    cancel-variant='danger'
    cancel-title='取消'
    @ok="submitModal"
    >
    <b-form-group label="上架">
      <b-form-radio v-model='form.state' :value='true'>已完成</b-form-radio>
      <b-form-radio v-model='form.state' :value='false'>未完成</b-form-radio>
    </b-form-group>
  </b-modal>
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
      orders: [],
      form: {
        state: false
      },
      aa: '',
      bb: ''
    }
  },
  methods: {
    async submitModal (event) {
      console.log(event)
      console.log(this.form)
      console.log(this.orders)
      event.preventDefault()
      try {
        await this.api.patch('/orders/' + this.aa, this.form, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.orders[this.bb].state = this.form.state
        this.$refs.table.refresh()
        this.$bvModal.hide('modal-state')
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    check (id, index) {
      console.log(id)
      console.log(index)
      this.aa = id
      this.bb = index
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
