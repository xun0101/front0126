<template>
    <swiper id="section01" :options="swiperOption" ref="swiper" class="swiper">
      <!-- Loops through item data and creates a carousel item -->

      <swiper-slide>
        <img src="https://images.deliveryhero.io/image/fd-tw/Products/25732299.jpg?width=2000" >
      </swiper-slide>
      <swiper-slide>
        <img src="https://images.deliveryhero.io/image/fd-tw/Products/25732300.jpg?width=2000" >
      </swiper-slide>
      <swiper-slide>
        <img src="https://images.deliveryhero.io/image/fd-tw/Products/25732301.jpg?width=2000" >
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
</template>

<style scoped>
  .swiper-slide{
  width:100vw;
  /* height: 100vh; */
  /* height:100vh; */
  /* overflow:hidden; */
}

.swiper-slide img{
  width: 100%;
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
