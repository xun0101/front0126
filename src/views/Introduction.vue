<template>
<div style="width: 60vw; margin:150px auto;">
<div class="d-flex justify-content-center ss">
  <div class="s4">
    <img src="../assets/image/chili.png">
  </div>
  <h1 class="text-center">鍋物介紹</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png">
  </div>
</div>
<b-row>
  <b-card no-body class="overflow-hidden" style="max-width: 540px; margin: 30px 20px;" v-for='product in products' :key='product._id' data-aos="fade-up" data-aos-duration="1000" data-aos-offset="-500">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="product.image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6" class="text-light" style="background-color: #6C0202;">
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
<img src="https://www.jhujian.com.tw/images/home/hotPot.png" class="m1">
<img src="https://www.jhujian.com.tw/images/home/hotPotMeat.png" class="m2" data-aos="fade-up" data-aos-duration="2000">
<img src="https://www.jhujian.com.tw/images/home/hotPotFront.png" class="m1" >
</div>
</template>
<style>
.m1{
  position: fixed;
  bottom:0;
  right: 0;
}
.m2{
  position: fixed;
  bottom:0;
  right: 0;
}
</style>
<script>
export default {
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
