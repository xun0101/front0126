<template>
<div class="container" style="margin-top: 100px;">
  <b-table striped hover :items='products' :fields='fields'  :tbody-tr-class="rowClass">
    <template #cell(image)='data'>
      <img v-if='data.item.product.image' :src='data.item.product.image' style="height: 80px;">
    </template>
    <template #cell(name)='data'>
      {{ data.item.product.name }}
    </template>
    <template #cell(price)='data'>
      {{ data.item.product.price }}
    </template>
    <template #cell(action)='data'>
      <b-form-spinbutton v-model='data.item.quantity' min="1" inline @input='editcart(data.index, data.item.quantity)'></b-form-spinbutton>
      <font-awesome-icon class="ml-3" @click="editcart(data.index, 0)" :icon="['fas', 'trash']" style="color:#1A4605"/>
    </template>
  </b-table>
  <h2 class="text-right">總金額： {{ total }}</h2>
    <button variant='success' @click='checkout' class="btn-green border-0 rounded-pill" style="height: 50px;width: 100px;">
      結帳
    </button>
</div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      fields: [
        { key: 'image', label: '圖片', thStyle: { background: '#8CA93E', color: '#ffffff' } },
        { key: 'name', label: '名稱', thStyle: { background: '#8CA93E', color: '#ffffff' } },
        { key: 'price', label: '價格', thStyle: { background: '#8CA93E', color: '#ffffff' } },
        { key: 'action', label: '操作', thStyle: { background: '#8CA93E', color: '#ffffff' } }
      ]
    }
  },
  methods: {
    async editcart (index, quantity) {
      try {
        await this.api.patch('/users/me/cart',
          { product: this.products[index].product._id, quantity },
          {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          }
        )
        if (quantity === 0) {
          this.products.splice(index, 1)
          this.$store.commit('user/editcart', this.user.cart - 1)
        }
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '修改購物車失敗'
        })
      }
    },
    async checkout () {
      try {
        await this.api.post('/orders', {}, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$router.push('/orders')
        this.$store.commit('user/editcart', 0)
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '失敗',
          text: '結帳失敗'
        })
      }
    },
    rowClass (item, type) {
      if (!item || type !== 'row') return
      return !item.product.sell ? 'text-danger' : ''
    }
  },
  computed: {
    total () {
      return this.products.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity * currentValue.product.price
      }, 0)
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/users/me/cart', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '失敗',
        text: '取得購物車失敗'
      })
    }
  }
}
</script>
