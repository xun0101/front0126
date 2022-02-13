<template>
<div id="home">
<Section01></Section01>
<div>
  <font-awesome-icon @click="move" class="arrow-icon" :icon="['fas', 'chevron-down']" size="4x" style="color:white"/>
</div>
<div class="" style="margin-top: 150px;">
  <Section04></Section04>
</div>
<div>
<div class="" style="margin-top: 200px;">
  <Section02></Section02>
</div>
<div class="container" style="margin-top: 200px;">
  <Section05></Section05>
</div>
</div>
<div class="container" style="margin-top: 200px;">
<h1 class="text-center">我要點餐</h1>
<hr class="border-success">
  <b-row class="m-auto">
    <b-col v-for='product in products' :key='product._id'  cols="6" class="mt-3" >
      <Section03 :product='product'></Section03>
    </b-col>
  </b-row>
</div>
<div style="margin-top: 200px;">
  <Footer1></Footer1>
</div>
</div>
</template>

<script>
import Section01 from '../components/Section01.vue'
import Section02 from '../components/Section02.vue'
import Section03 from '../components/Section03.vue'
import Section04 from '../components/Section04.vue'
import Section05 from '../components/Section05.vue'
import Footer1 from '../components/Footer'

export default {
  components: {
    Section01,
    Section02,
    Section03,
    Section04,
    Section05,
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
  },
  methods: {
    move () {
      var element = document.getElementById('section04')
      element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }
  }
}
</script>
