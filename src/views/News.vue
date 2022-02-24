<template>
<div class="m-0 p-0">
<div class="new w-75 mx-auto">
  <Section04 data-aos="fade-right"></Section04>
  <div class="text-center n-food" data-aos="fade-right">
    <hr class="border-danger">
    <div class="d-flex justify-content-center ss mt-5">
  <div class="s4">
    <img src="../assets/image/chili.png">
  </div>
  <h1 class="text-center">食材資訊</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png">
  </div>
</div>
<div class="d-flex p-5 flex-column flex-lg-row justify-content-around align-items-center">
  <div>
    <div class="n-img">
      <img src="../assets/image/豬肉標示貼紙-台灣豬標示(JPG).png">
    </div>
    <p>豬肉來源：台灣</p>
    </div>
    <div>
    <div class="n-img">
      <img src="../assets/image/美國牛肉_1.png">
    </div>
    <p>牛肉來源：美國</p>
  </div>
<div>
  <div class="n-img" style="width: 250px; height: 250px;">
    <img class="img-fluid" src="../assets/image/chicken.png">
  </div>
    <p>雞肉來源：台灣</p>
</div>
</div>
  </div>
</div>
<footer1></footer1>
</div>
</template>

<script>
import Section04 from '../components/Section04.vue'
import Footer1 from '../components/Footer1.vue'
export default {
  components: {
    Section04,
    Footer1
  }
}
</script>
