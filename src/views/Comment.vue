<template>
<b-container style="margin-top: 150px;">
<div class="d-flex justify-content-center ss">
  <div class="s4">
    <img src="../assets/image/chili.png">
  </div>
  <h1 class="text-center">留言板</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png">
  </div>
</div>
  <div class="card bg-light mt-4 p-5 shadow">
  <b-table :items="comments" :fields='fields' :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" ref='table' stacked="md">
    <template #cell(user)='data'>
      {{ data.item.user.account }}
    </template>
    <template #cell(comments)='data'>
      {{ data.item.comment }}
    </template>
    <template #cell(date)='data'>
      {{ new Date(data.item.date).toLocaleString('zh-tw') }}
    </template>
  </b-table></div>
  <div class="text-center">
    <button class="btn-green border-0 my-3" v-b-modal.modal-comment v-if="user.isLogin">新增</button>
  </div>
  <b-modal id="modal-comment"
    title="留言"
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
      label-for='input-comments'
      description='必填欄位'
      invalid-feedback='說明必填'
    ></b-form-group>
    <b-form-input
      id="input-comments"
      v-model='form.comment'
      required
      rows="3"
      max-rows="6"
      placeholder='請輸入內容'
      :state = 'state.comment'
    ></b-form-input>
  </b-modal>
</b-container>
</template>

<script>
export default {
  data () {
    return {
      sortBy: 'date',
      sortDesc: true,
      fields: [
        { key: 'user', label: '使用者' },
        { key: 'comments', label: '留言' },
        { key: 'date', label: '發佈時間' }
      ],
      comments: [],
      form: {
        comment: ''
      },
      modalSubmitting: false
    }
  },
  computed: {
    state () {
      return {
        comment: this.form.comment.length === 0 ? null : true
      }
    }
  },
  methods: {
    async submitModal (event) {
      event.preventDefault()
      if (!this.state.comment) {
        this.$swal({
          icon: 'error',
          title: '錯誤',
          text: '缺少必填欄位'
        })
        return
      }
      this.modalSubmitting = true

      try {
        const { data } = await this.api.post('/comments', this.form, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        console.log(data.result)
        this.comments.push(data.result)
        this.$bvModal.hide('modal-comment')
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
        comment: ''
      }
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/comments/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.comments = data.result
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
