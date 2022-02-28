<template>
<div class="container">
  <div class="card bg-light p-5 shadow">
  <b-table
    :items="waits"
    :fields="fields"
    ref='table'
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
    <template #cell(number)='data'>
      {{ data.item.number }}
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
    </template>
  </b-table>
    <b-modal id="modal-state"
    title="操作"
    centered
    ok-variant='success'
    ok-title='送出'
    cancel-variant='danger'
    cancel-title='取消'
    @ok="submitModal"
    >
    <b-form-group label="上架">
      <b-form-radio v-model='form.state' :value='true'>已有空位</b-form-radio>
      <b-form-radio v-model='form.state' :value='false'>候位中</b-form-radio>
    </b-form-group>
  </b-modal>
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
        { key: 'id', label: '預約ID' },
        { key: 'number', label: '預約人數' },
        { key: 'date', label: '預約時間' },
        { key: 'state', label: '候位成功' }
      ],
      form: {
        state: false
      },
      aa: '',
      bb: ''
    }
  },
  methods: {
    async submitModal (event) {
      console.log(event)
      console.log(this.form)
      console.log(this.orders)
      event.preventDefault()
      try {
        await this.api.patch('/waits/' + this.aa, this.form, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.waits[this.bb].state = this.form.state
        this.$refs.table.refresh()
        this.$bvModal.hide('modal-state')
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }
    },
    check (id, index) {
      console.log(id)
      console.log(index)
      this.aa = id
      this.bb = index
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
