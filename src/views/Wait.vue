<template>
<div class="wait" style="margin-top: 150px;">
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
    <template #cell(date)='data'>
      {{ new Date(data.item.date).toLocaleString('zh-tw') }}
    </template>
    <template #cell(state)='data'>
      {{ data.item.finish }}
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
      <b-form-radio v-model='form.wait' :value='true'>確認要候位</b-form-radio>
    </b-form-group>
  </b-modal>
  <Footer1></Footer1>
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
        { key: 'date', label: '預約時間' },
        { key: 'state', label: '候位成功' }
      ],
      form: {
        wait: false
      }
    }
  },
  methods: {
    async submitwait (event) {
      try {
        console.log(this.form)
        const { data } = await this.api.post('/waits/', this.form, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        console.log(data.result)
        this.waits.push(data.result)
        this.$bvModal.hide('modal-wait')
      } catch (error) {
        console.log(error)
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
