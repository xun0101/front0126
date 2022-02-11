<template>
<div id="section03" class="container">
  <h1 class="text-center">我要點餐</h1>
  <hr class="border-success">
  <b-row class="m-auto">
    <b-col cols="6" class="mt-3"  v-for='product in products' :key='product._id'>
      <div class="d-flex bg-light s3">
      <div class="w-50">
        <img :img-src='product.image' class="s3-img">
      </div>
      <div class="m-auto">
        <h4>{{ product.name }}</h4>
        <div class="d-flex align-items-center">
        <h5>{{ '$' + product.price }}</h5>
        <b-button href="#" variant="light" class="ml-3">
        <font-awesome-icon :icon="['fas', 'cart-plus']" style="color:black"/>
        </b-button>
        </div>
      </div>
      </div>
    </b-col>
  </b-row>
</div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>
