<template>
<div id="home">
<Section01></Section01>
<div>
  <font-awesome-icon @click="move" class="arrow-icon" :icon="['fas', 'chevron-down']" size="6x" style="color:white"/>
</div>
<div class="container" style="margin-top: 200px;">
  <Section02></Section02>
</div>
<div class="container" style="margin-top: 200px;">
  <Section03></Section03>
</div>
<div style="margin-top: 200px;">
  <Section04></Section04>
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
import Footer1 from '../components/Footer'

export default {
  components: {
    Section01,
    Section02,
    Section03,
    Section04,
    Footer1
  },
  methods: {
    move () {
      var element = document.getElementById('section02')
      element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }
  }
}
</script>
