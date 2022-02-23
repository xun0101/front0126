<template>
<div>
    <swiper id="section01" :options="swiperOption" ref="swiper" class="swiper">
      <!-- Loops through item data and creates a carousel item -->
      <swiper-slide>
        <div class="d-block d-lg-none" style="width: 100vw; height: 100vh;">
        <img src="../assets/image/chinese-sichuan-specialties-spicy-beef-frog.jpg" style="width:100%;height:100%; object-fit:cover;">
        </div>
        <img class="d-none d-lg-block" src="../assets/image/chinese-sichuan-specialties-spicy-beef-frog.jpg">
        <div class="mask">
          <div class="mask-text1" style="width:750px;">
            <img src="../assets/image/title4.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="d-block d-lg-none" style="width: 100vw; height: 100vh;">
        <img src="../assets/image/臭臭鍋.png" style="width:100%;height:100%; object-fit:cover;">
        </div>
        <img class="d-none d-lg-block" src="../assets/image/臭臭鍋.png" >
        <div class="mask">
          <div class="mask-text" style="width:600px;">
            <img src="../assets/image/title1.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="d-block d-lg-none" style="width: 100vw; height: 100vh;">
        <img src="../assets/image/spicy-meat-pork-boil-hot-pot.jpg" style="width:100%;height:100%; object-fit:cover;">
        </div>
        <img class="d-none d-lg-block" src="../assets/image/spicy-meat-pork-boil-hot-pot.jpg">
          <div class="mask">
          <div class="mask-text3" style="width:750px;">
            <img src="../assets/image/title5.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="d-block d-lg-none" style="width: 100vw; height: 100vh;">
        <img src="../assets/image/鴨血豆腐煲.png" style="width:100%;height:100%; object-fit:cover;">
        </div>
        <img class="d-none d-lg-block" src="../assets/image/鴨血豆腐煲.png" >
        <div class="mask">
          <div class="mask-text" style="width:600px;">
            <img src="../assets/image/title3.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
      <div class="d-block d-lg-none" style="width: 100vw; height: 100vh;">
        <img src="../assets/image/chicken-fried-hot-pot-with-spicy-sauce-korean-style.jpg" style="width:100%;height:100%; object-fit:cover;">
      </div>
        <img class="d-none d-lg-block" src="../assets/image/chicken-fried-hot-pot-with-spicy-sauce-korean-style.jpg">
        <div class="mask">
          <div class="mask-text2" style="width:800px;">
            <img src="../assets/image/title6.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
      <div class="d-block d-lg-none" style="width: 100vw; height: 100vh;">
        <img src="../assets/image/肥腸臭臭鍋.png" style="width:100%;height:100%; object-fit:cover;">
      </div>
        <img class="d-none d-lg-block" src="../assets/image/肥腸臭臭鍋.png" >
        <div class="mask">
          <div class="mask-text" style="width:600px;">
            <img src="../assets/image/title2.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
        </div>
      </swiper-slide>

      <template v-slot:button-prev>
        <div
          @click="$refs.swiper.swiperInstance.slidePrev()"
          class="swiper-button-prev"
        ></div>
      </template>
      <template v-slot:button-next>
        <div
          @click="$refs.swiper.swiperInstance.slideNext()"
          class="swiper-button-next"
        ></div>
      </template>
    </swiper>
</div>
</template>

<style scoped>
  .swiper-slide{
  width:100vw;
}
.swiper-slide img{
  width: 100%;
  position: relative;
}
.mask{
  display: none;
  position: absolute;
  width:100vw;
  height: 100vh;
}
.mask-text{
  display: none;
  position: absolute;
  top: 10%;
  left: 15%;
  transform: translate(-50%);
  color: black;
  z-index: 99;
  font-size: 50px;
}
.mask-text1{
  display: none;
  position: absolute;
  top: 0%;
  left: 19%;
  transform: translate(-50%);
  color: black;
  z-index: 99;
  font-size: 50px;
}
.mask-text2{
  display: none;
  position: absolute;
  top: 60%;
  right: -20%;
  transform: translate(-50%);
  color: black;
  z-index: 99;
  font-size: 50px;
}

.mask-text3{
  display: none;
  position: absolute;
  top: 55%;
  left: 20%;
  transform: translate(-50%);
  color: black;
  z-index: 99;
  font-size: 50px;
}

.swiper-button-next,
.swiper-button-prev
{
  opacity:0;
  width:50%;
  cursor: pointer;
}
@media (min-width: 992px) {
  .swiper-slide{
  /* height: calc(100vh - 72px); */
  height:100vh;
  display:flex;
  flex-direction: cloumn;
}

.swiper-slide img{
  align-self: center;
}

}
@media (min-width: 1200px) {
.mask{
  display: block;
}
.mask-text,
.mask-text1,
.mask-text2,
.mask-text3
{
  display: block;
}
}
</style>

<script>
export default {
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        loop: true,
        initialSlide: 0,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
          waitForTransition: true
        },
        spaceBetween: 20,
        speed: 1500,
        direction: 'horizontal',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true,
          hiddenClass: 'my-button-hidden'
        }
      }
    }
  }
}
</script>
