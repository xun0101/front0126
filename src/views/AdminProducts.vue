<template>
<b-container class="mt-5">
  <button class="btn-green border-0 my-5">新增</button>
  <b-card
        :items="products"
        title="臭臭鍋"
        img-src="https://images.deliveryhero.io/image/fd-tw/Products/25732300.jpg?width=600"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
      >
      <div class="d-flex justify-content-between w-75">
      <b-card-text class="h4">
      $ 80
      </b-card-text>
      <b-button href="#" variant="light">
      <font-awesome-icon :icon="['fas', 'cart-plus']" size="lg" style="color:black"/>
      </b-button>
    </div>
  </b-card>
</b-container>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  }
}
</script>
