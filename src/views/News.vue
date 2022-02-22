<template>
<b-container class="new">
  <Section04 data-aos="fade-right"></Section04>
  <div class="text-center n-food" data-aos="fade-right">
    <hr class="border-danger">
    <div class="d-flex justify-content-center ss mt-5">
  <div class="s4">
    <img src="../assets/image/pig.png">
  </div>
  <h1 class="text-center">食材資訊</h1>
  <div class="s4">
    <img src="../assets/image/pig.png">
  </div>
</div>
    <b-row class="mt-4 nr" cols="2">
      <b-col>
        <img class="img-fluid" src="../assets/image/豬肉標示貼紙-台灣豬標示(JPG).png" data-aos="flip-left" data-aos-offset="600">
      </b-col>
      <b-col class="border-left border-danger" data-aos="fade-down" data-aos-offset="450">
        <h5 class="n-text" data-aos="fade-left" data-aos-offset="650">豬肉原產地：台灣</h5>
      </b-col>
      <b-col>
        <h5 class="n-text" data-aos="fade-right" data-aos-offset="650">牛肉原產地:美國</h5>
      </b-col>
      <b-col class="border-left border-danger" data-aos="fade-down" data-aos-offset="450">
        <img class="img-fluid" src="../assets/image/美國牛肉_1.png" data-aos="flip-right" data-aos-offset="600">
      </b-col>
      <b-col>
        <img class="img-fluid" src="../assets/image/chicken.png" data-aos="flip-left" data-aos-offset="450">
      </b-col>
      <b-col class="border-left border-danger" data-aos="fade-down" data-aos-offset="450">
        <h5 class="n-text" data-aos="fade-left" data-aos-offset="350">雞肉原產地：台灣</h5>
      </b-col>
  </b-row>
  </div>
</b-container>
</template>

<script>
import Section04 from '../components/Section04.vue'
export default {
  components: {
    Section04
  }
}
</script>
