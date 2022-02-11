<template>
<div>
    <swiper id="section01" :options="swiperOption" ref="swiper" class="swiper">
      <!-- Loops through item data and creates a carousel item -->

      <swiper-slide>
        <img src="../assets/image/臭臭鍋.png" >
        <div class="mask">
          <div class="mask-text" style="width:600px;">
            <img src="../assets/image/title1.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
          <p class="mask-p">經典原味，俘虜你的味</p>
          <!-- <p class="mask-p2">俘虜你的味</p> -->
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/image/鴨血豆腐煲.png" >
        <div class="mask">
          <div class="mask-text" style="width:600px;">
            <img src="../assets/image/title3.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
          <p class="mask-p3">香嫩入味，地方媽媽強推</p>
        </div>
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/image/肥腸臭臭鍋.png" >
        <div class="mask">
          <div class="mask-text" style="width:600px;">
            <img src="../assets/image/title2.png" style="width:100%;height:100%; object-fit:cover;">
          </div>
          <p class="mask-p2">軟Q肥腸，多汁味美</p>
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
  /* background: rgba(0,0,0,.4); */
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
.mask-p{
  /* display: none; */
  position: absolute;
  top: 40%;
  left: 8%;
  color: rgb(179, 162, 107);
  z-index: 99;
  font-size: 25px;
}

.mask-p2{
  /* display: none; */
  position: absolute;
  top: 35%;
  left: 4.5%;
  color: rgb(179, 162, 107);
  z-index: 99;
  font-size: 25px;
}
.mask-p3{
  /* display: none; */
  position: absolute;
  top: 40%;
  left: 6%;
  color: rgb(179, 162, 107);
  z-index: 99;
  font-size: 20px;
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
