<template>

<div style="margin-top: 150px;">
<b-row class="p-3" cols="5">
  <b-col class="my-3" v-for='comment in comments' :key='comment._id'>
      <b-card bg-variant="light"
      >
      <div class="d-flex">
      <img :src="comment.user.avatar" style="width: 50px; height: 50px; border-radius: 50%;">
      <b-card-title class="mt-3 mx-2">
        {{ comment.user.account }}
      </b-card-title>
      </div>
        <b-card-text style="height:100px;overflow-y:scroll">{{ comment.comment }}</b-card-text>
        <b-card-text style="margin-left: 130px;">
          {{ new Date(comment.date).toLocaleString('zh-tw') }}
        </b-card-text>
      </b-card>
  </b-col>
</b-row>
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
