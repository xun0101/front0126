<template>
<div id="section05">
  <h1 class="text-center">鍋物介紹</h1>
  <hr class="border-success">
  <swiper :options="swiperOption" ref="swiper" class="swiper">
      <swiper-slide>
        <b-card
        title="臭臭鍋"
        img-src="https://images.deliveryhero.io/image/fd-tw/Products/25732300.jpg?width=600"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        align="center"
        class="mb-2 mx-auto"
      >
      <div>
      <b-card-text class="h5">
      靈魂湯頭，經典的口味，最適合在寒冷的冬天大快朵頤一番
      </b-card-text>
    </div>
  </b-card>
  </swiper-slide>
      <swiper-slide>
<b-card
        title="豆腐鴨血煲"
        img-src="https://images.deliveryhero.io/image/fd-tw/Products/25732300.jpg?width=600"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 mx-auto"
        align="center"
      >
      <div >
      <b-card-text class="h5">
      傳統鴨血、銷魂豆腐，濃郁好吃
      </b-card-text>
    </div>
  </b-card>
      </swiper-slide>
      <swiper-slide>
        <b-card
        title="肥腸臭臭鍋"
        img-src="https://images.deliveryhero.io/image/fd-tw/Products/25732301.jpg?width=600"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 mx-auto"
        align="center"
      >
      <div>
      <b-card-text class="h5">
      精心熬煮的黃金湯頭，口感層次豐富
      </b-card-text>
    </div>
  </b-card>
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

<script>
export default {
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        loop: true,
        initialSlide: 0,
        grabCursor: true,
        // autoplay: {
        //   delay: 5000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false,
        //   waitForTransition: true
        // },
        centeredSlides: true,
        speed: 1500,
        direction: 'horizontal',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true,
          hiddenClass: 'my-button-hidden'
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50
          }
        }
      }
    }
  }
}
</script>
