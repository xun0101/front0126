<template>
<div id="section04">
  <div class="d-flex justify-content-center">
  <div class="s4">
    <img src="../assets/image/chili.png" data-aos="flip-right">
  </div>
  <h1 class="text-center">活動訊息</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png" data-aos="flip-left">
  </div>
  </div>
  <div class="d-flex justify-content-center ">
    <div class="w-75 mt-3">
      <b-table sticky-header striped hover :items="news" :fields="fields" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" style="word-break:break-all; word-wrap:break-all;">
      <template #cell(news)='data'>
        {{ data.item.new }}
      </template>
      <template #cell(date)='data'>
        {{ new Date(data.item.date).toLocaleString('zh-tw') }}
      </template>
      </b-table>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      fields: [{ key: 'news', label: '最新消息', thStyle: { background: '#000', color: '#ffffff' } }, { key: 'date', label: '發佈時間', thStyle: { background: '#000', color: '#ffffff' } }],
      sortBy: 'date',
      sortDesc: true,
      news: []
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/news/all')
      this.news = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '商品取得失敗'
      })
    }
  }
}
</script>
