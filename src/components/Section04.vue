<template>
<div id="section04">
  <div class="d-flex justify-content-center">
  <div class="s4">
    <img src="../assets/image/chili.png">
  </div>
  <h1 class="text-center">活動訊息</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png">
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
      // items: [
      //   { 最新消息: '02/10~02/18滿千免運', 發佈時間: '2022/02/02' },
      //   { 最新消息: '春節期間本店公休', 發佈時間: '2022/01/28' },
      //   { 最新消息: '12/24公休', 發佈時間: '2021/12/20' },
      //   { 最新消息: '09/01起本店調漲', 發佈時間: '2021/08/30' },
      //   { 最新消息: '06/30起本店連休', 發佈時間: '2021/06/02' },
      //   { 最新消息: '05/06本店公休三天', 發佈時間: '2020/05/04' },
      //   { 最新消息: '04/07本店調漲', 發佈時間: '2018/02/02' },
      //   { 最新消息: '搬遷新址:屏東縣屏東市大武路286號900 1號', 發佈時間: '2012/03/02' }
      // ],
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
