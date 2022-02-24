<template>
<div class="introduction">
<div class="d-flex i-top">
  <div class="i-img clip1" data-aos="fade-down-right" data-aos-offset="-500">
    <img class="img-fluid " src='../assets/image/chinese-sichuan-specialties-spicy-beef-frog.jpg'>
  </div>
  <div class="d-flex align-items-center justify-content-center text-light flex-column">
  <h1 class="textl">辣到不辣</h1>
  <h1 class="textl">任君選擇</h1>
  </div>
    <div style="width:60%;height:450px;"  class="i-img clip2" data-aos="fade-up-left" data-aos-offset="-500">
    <img class="img-fluid" src='../assets/image/ss.jpg'>
  </div>
</div>
<div class="d-flex justify-content-center ss mt-5">
  <div class="s4">
    <img src="../assets/image/chili.png">
  </div>
  <h1 class="text-center">鍋物介紹</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png">
  </div>
</div>
<b-row class="i-row">
  <b-card no-body class="overflow-hidden i-card" v-for='product in products' :key='product._id' data-aos="fade-up" data-aos-duration="1000" data-aos-offset="300">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="product.image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6" class="text-light i-col">
        <b-card-body :title="product.name">
        <hr class="border-light">
          <b-card-text>
            {{product.description}}
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</b-row>
<img src="https://www.jhujian.com.tw/images/home/hotPot.png" class="m1 d-none d-lg-block">
<img src="https://www.jhujian.com.tw/images/home/hotPotMeat.png" class="m2 d-none d-lg-block" data-aos="fade-up" data-aos-duration="2000">
<img src="https://www.jhujian.com.tw/images/home/hotPotFront.png" class="m1 d-none d-lg-block" >
<Footer1></Footer1>
</div>
</template>

<script>
import Footer1 from '../components/Footer1.vue'
export default {
  components: {
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
