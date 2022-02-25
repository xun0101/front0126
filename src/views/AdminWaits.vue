<template>
<div>
  <div class="card bg-light p-5 shadow">
  <b-table
    :items="waits"
    :fields="fields"
    ref='table'
    stacked="md">
    <template #cell(_id)='data'>
      {{ data.index }}
    </template>
    <!-- <template #cell(user)='data'>
      <b-avatar :src="data.item.user.avatar" class="mr-3"></b-avatar>
      {{ data.item.user.account }}
    </template>
    <template #cell(date)='data'>
      {{ new Date(data.item.date).toLocaleString('zh-tw') }}
    </template>
    <template #cell(state)='data'>
      <button class="ao-btn" @click='check(data.item._id, data.index)' v-b-modal.modal-state>確認</button>
      <div class="d-flex mt-2">
        <p>已完成:</p>
      <div v-if='data.item.state === true'>✔</div>
      </div>
    </template> -->
  </b-table>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      waits: [],
      fields: [
        { key: 'index', label: '號碼' },
        { key: 'user', label: '預約者' },
        { key: 'date', label: '預約時間' },
        { key: 'state', label: '候位成功' }
      ]
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/waits/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.waits = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得名單失敗'
      })
    }
  }
}
</script>
