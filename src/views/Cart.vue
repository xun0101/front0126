<template>
<div class="cart">
  <div class="container">
  <div class="d-flex justify-content-center ss">
  <div class="s4">
    <img src="../assets/image/chili.png">
  </div>
  <h1 class="text-center">我要點餐</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png">
  </div>
</div>
<b-row class="mt-3">
    <b-col v-for='product in products' :key='product._id'  cols="6" class="mt-3" >
      <Section03 :product='product'></Section03>
    </b-col>
</b-row></div>
<div class="c-img">
  <img src="../assets/image/fog.png" data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-out" data-aos-once="false">
</div>
<Footer1></Footer1>
</div>
</template>

<script>
import Footer1 from '../components/Footer1.vue'
import Section03 from '../components/Section03.vue'

export default {
  components: {
    Section03,
    Footer1
  },
  data () {
    return {
      products: []
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products')
      this.products = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '商品取得失敗'
      })
    }
  }
}
</script>
