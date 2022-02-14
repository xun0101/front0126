<template>
<div id="section03">
  <div class="d-flex bg-light s3">
  <div class="w-50">
    <img :src="product.image" class="s3-img">
  </div>
  <div class="m-auto">
    <h4 class="ml-5">{{ product.name }}</h4>
    <div class="d-flex align-items-center mt-3 ml-5">
    <h5>{{ '$' + product.price }}</h5>
    <b-form-input type='number' class="w-25 ml-3" v-model.number='quantity' min='0'></b-form-input>
    <b-button variant="light" @click='addcart' >
    <font-awesome-icon :icon="['fas', 'cart-plus']" style="color:black"/>
    </b-button>
    </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      name: '',
      price: 0,
      description: '',
      image: '',
      sell: false,
      quantity: 0
    }
  },
  methods: {
    async addcart () {
      console.log(this.product)
      console.log(this.product._id)
      this.$store.dispatch('user/addcart', { product: this.product._id, quantity: this.quantity })
    }
  }
}
</script>
