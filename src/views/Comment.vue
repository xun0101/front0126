<template>
<div class="comment">
  <div class="d-flex justify-content-center ss">
  <div class="s4">
    <img src="../assets/image/chili.png">
  </div>
  <h1 class="text-center">留言板</h1>
  <div class="s4">
    <img src="../assets/image/chili2.png">
  </div>
</div>
<div class="container">
  <hr class="border-danger">
<b-row class="p-2" cols="1" cols-lg="3">
  <b-col class="my-3" v-for='(comment, i) in comments' :key='comment._id'>
      <b-card bg-variant="light">
      <div class="d-flex">
      <b-avatar :src="comment.user.avatar" :text="comment.user.account"></b-avatar>
      <b-card-title class="mt-3 mx-2">
        {{ comment.user.account }}
      </b-card-title>
      </div>
        <b-card-text class="c-c-text">{{ comment.comment }}</b-card-text>
        <b-card-text class="c-c-time">
          {{ new Date(comment.date).toLocaleString('zh-tw') }}
        </b-card-text>
      </b-card>
    <button class="btn-green border-0 my-3" v-if="user.isLogin && user.isAdmin" @click='del(comment._id, i)'>刪除</button>
  </b-col>
</b-row></div>
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
      comments: [],
      form: {
        comment: '',
        index: -1
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
        this.comments.push(data.result)
        this.$bvModal.hide('modal-comment')
      } catch (error) {
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
    },
    async del (id, i) {
      try {
        await this.api.delete('/comments/dels/' + id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$swal.fire({
          icon: 'success',
          title: '成功',
          text: '刪除成功'
        })
        this.comments.splice(i, 1)
        this.$refs.table.refresh()
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
