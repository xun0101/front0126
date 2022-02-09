<template>
<div>
    <swiper id="section01" :options="swiperOption" ref="swiper" class="swiper">
      <!-- Loops through item data and creates a carousel item -->

      <swiper-slide>
        <img src="../assets/image/臭臭鍋.png" >
        <div class="mask">
          <h1 class="mask-text">臭臭鍋</h1>
          <p class="mask-p">經典原味，俘虜你的味</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/image/鴨血豆腐煲.png" >
        <div class="mask">
          <p class="mask-text">豆腐鴨血煲</p>
          <p class="mask-p">香嫩入味，地方媽媽強推</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/image/肥腸臭臭鍋.png" >
        <div class="mask">
          <p class="mask-text">肥腸臭臭鍋</p>
          <p class="mask-p">軟Q肥腸，多汁味美</p>
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
  background: rgba(0,0,0,.4);
}
.mask-text{
  display: none;
  position: absolute;
  top: 15%;
  left: 10%;
  color: white;
  z-index: 99;
  opacity: 0.8;
  font-size: 50px;
}
.mask-p{
  /* display: none; */
  position: absolute;
  top: 25%;
  left: 10%;
  color: white;
  z-index: 99;
  opacity: 0.8;
  font-size: 30px;
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
.mask-text{
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
