<template>
<b-container class="mt-5">
  <button class="btn-green border-0 my-5" v-b-modal.modal-new>新增</button>
  <b-table :items="news" :fields='fields' ref='table'>
    <template #cell(news)='data'>
      {{ data.item.news }}
    </template>
    <template #cell(data)='data'>
      {{ new Date(data.item.date).toLocaleString('zh-tw') }}
    </template>
  </b-table>
  <b-modal id="modal-new"
    title="發布消息"
    centered
    ok-variant='success'
    ok-title='送出'
    cancel-variant='danger'
    cancel-title='取消'
    @ok="submitModal"
    @hidden="resetForm"
    :ok-disabled="modalSubmitting"
    :cancel-disabled="modalSubmitting"
    >
    <b-form-group
      label='消息公佈'
      label-for='input-news'
      description='必填欄位'
      invalid-feedback='說明必填'
    ></b-form-group>
    <b-form-input
      id="input-news"
      v-model='form.new'
      required
      rows="3"
      max-rows="6"
      placeholder='請輸入內容'
      :state = 'state.new'
    ></b-form-input>
  </b-modal>
</b-container>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'news', label: '最新消息' },
        { key: 'date', label: '發佈時間' }
      ],
      news: [],
      form: {
        new: '',
        _id: ''
      },
      modalSubmitting: false
    }
  },
  computed: {
    state () {
      return {
        new: this.form.new.length === 0 ? null : true
      }
    }
  },
  methods: {
    async submitModal (event) {
      event.preventDefault()
      if (!this.state.new) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }
      this.modalSubmitting = true

      const fd = new FormData()
      for (const key in this.form) {
        if (key !== '_id') {
          // console.log(this.form[key])
          fd.append(key, this.form[key])
          // console.log(fd.get(key))
        }
        console.log(fd.get(key))
      }

      try {
        console.log(fd.get('new'))
        const { data } = await this.api.post('/news', fd, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        console.log(data.result)
        this.news.push(data.result)
        this.$bvModal.hide('modal-new')
      } catch (error) {
        console.log(error)
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: error.response.data.message
        })
      }

      this.modalSubmitting = false
    },
    resetForm (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        new: '',
        _id: ''
      }
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/news/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.news = data.result
    } catch (error) {
      this.$swal({
        icon: 'error',
        title: '錯誤',
        text: '取得商品失敗'
      })
    }
  }
}
</script>
