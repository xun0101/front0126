<template>
<div id="section03" data-aos="fade-up" data-aos-once="true">
  <div class="d-flex flex-column flex-lg-row bg-light s3">
  <div class="s3-div">
    <img :src="product.image" class="s3-img">
  </div>
  <div class="m-auto text-center text-lg-left">
    <h4 class="ml-lg-5">{{ product.name }}</h4>
    <div class="d-flex align-items-center mt-3 mx-3 ml-lg-5">
    <h5>{{ '$' + product.price }}</h5>
    <div class="d-flex">
    <b-form-input type='number' class="s3-w ml-3" v-model.number='quantity' min='0'></b-form-input>
    <b-button variant="light" @click='addcart' >
    <font-awesome-icon :icon="['fas', 'cart-plus']" style="color:black"/>
    </b-button></div>
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
      this.$store.dispatch('user/addcart', { product: this.product._id, quantity: this.quantity })
    }
  }
}
</script>
