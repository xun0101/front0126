<template>
<div class="wait">
<div class="d-flex justify-content-center ss">
  <div class="s4">
    <img src="../assets/image/chili.png">
  </div>
  <h1 class="text-center">候位區</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png">
  </div>
</div>
<div class="container">
  <hr class="border-danger">
  <b-table
    :items="waits"
    :fields="fields"
    stacked="md">
    <template #cell(index)='data'>
      {{ data.index+1 }}
    </template>
    <template #cell(user)='data'>
      <b-avatar :src="data.item.user.avatar" class="mr-3"></b-avatar>
      {{ data.item.user.account }}
    </template>
    <template #cell(id)='data'>
      {{ data.item._id }}
    </template>
    <template #cell(date)='data'>
      {{ new Date(data.item.date).toLocaleString('zh-tw') }}
    </template>
    <template #cell(state)='data'>
      <div v-if='data.item.state === true'>預約完成</div>
      <div v-if='data.item.state === false'>預約中</div>
    </template>
    </b-table>
</div>
  <div class="text-center">
    <button class="btn-green border-0 my-3" v-if="user.isLogin" v-b-modal.modal-wait>預約</button>
  </div>
  <b-modal id="modal-wait"
    title="操作"
    centered
    ok-variant='success'
    ok-title='送出'
    cancel-variant='danger'
    cancel-title='取消'
    @ok="submitwait"
    >
    <b-form-group label="候位">
      <b-form-input
      type='number'
      min='1'
      required
      placeholder='請輸入預約人數'
      v-model.number='form.number'
      :state='state.number'></b-form-input>
      <b-form-radio v-model='form.wait' :value='true'>確認要候位</b-form-radio>
    </b-form-group>
  </b-modal>
  <Footer1 class="wf"></Footer1>
</div>
</template>

<script>
import Footer1 from '../components/Footer1.vue'

export default {
  components: {
    Footer1
  },
  data () {
    return {
      waits: [],
      fields: [
        { key: 'index', label: '號碼' },
        { key: 'user', label: '預約者' },
        { key: 'id', label: '預約ID' },
        { key: 'number', label: '預約人數' },
        { key: 'date', label: '預約時間' },
        { key: 'state', label: '候位成功' }
      ],
      form: {
        number: null,
        wait: false
      }
    }
  },
  computed: {
    state () {
      return {
        number: this.form.number === null ? null : this.form.number >= 1
      }
    }
  },
  methods: {
    async submitwait (event) {
      event.preventDefault()
      if (!this.state.number) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }

      try {
        const { data } = await this.api.post('/waits/', this.form, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.waits.push(data.result)
        this.$bvModal.hide('modal-wait')
      } catch (error) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
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
