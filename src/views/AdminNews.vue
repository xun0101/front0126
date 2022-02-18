<template>
<b-container class="mt-5">
  <div class="text-center">
    <button class="btn-green border-0 my-3" v-b-modal.modal-new>新增</button>
  </div>
  <div class="card bg-light p-5 shadow">
  <b-table :items="news" :fields='fields' :sort-by.sync="sortBy" ref='table'>
    <template #cell(news)='data'>
      {{ data.item.new }}
      {{ data }}
    </template>
    <template #cell(date)='data'>
      {{ new Date(data.item.date).toLocaleString('zh-tw') }}
    </template>
    <template #cell(action)='data'>
      <button variant='success' @click='del(data.item._id, data.index)' class="border-0">
        <font-awesome-icon :icon="['fas', 'trash']" style="color:#1A4605"/>
      </button>
      <button variant='success' class="border-0" v-b-modal.modal-edit>
        📝
      </button>
    </template>
  </b-table>
  <b-modal id="modal-new"
    title="發佈消息"
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
  <!-- <b-modal id="modal-edit"
    title="修改消息"
    centered
    ok-variant='success'
    ok-title='送出'
    cancel-variant='danger'
    cancel-title='取消'
    @ok="edit"
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
  </b-modal> -->
  </div>
</b-container>
</template>

<script>
export default {
  data () {
    return {
      sortBy: 'date',
      fields: [
        { key: 'news', label: '最新消息' },
        { key: 'date', label: '發佈時間' },
        { key: 'action', label: '操作' }
      ],
      news: [],
      form: {
        new: ''
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

      try {
        const { data } = await this.api.post('/news', this.form, {
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

    // async edit (event) {
    //   event.preventDefault()
    //   if (!this.state.new) {
    //     this.$swal({
    //       icon: 'error',
    //       title: '錯誤',
    //       text: '缺少必填欄位'
    //     })
    //     return
    //   }
    //   this.modalSubmitting = true

    //   try {
    //     await this.api.patch('/news/' + this.form.id, this.form, {
    //       headers: {
    //         authorization: 'Bearer ' + this.user.token
    //       }
    //     })
    //     this.news[this.form.index] = { ...this.form }
    //     this.$refs.table.refresh()
    //     this.$bvModal.hide('modal-new')
    //   } catch (error) {
    //     console.log(error)
    //     this.$swal({
    //       icon: 'error',
    //       title: '錯誤',
    //       text: error.response.data.message
    //     })
    //   }

    //   this.modalSubmitting = false
    // },
    resetForm (event) {
      if (this.modalSubmitting) {
        event.preventDefault()
        return
      }
      this.form = {
        new: ''
      }
    },
    async del (id, index) {
      try {
        const { data } = await this.api.delete('/news/dels/' + id, {
          headers: {
            authorization: 'Bearer ' + this.user.token
          }
        })
        this.$swal.fire({
          icon: 'success',
          title: '成功',
          text: '刪除成功'
        })
        console.log(index)
        console.log(data)
        // this.news[index] = [...this.form]
        this.news.splice(index, 1)
        this.$refs.table.refresh()
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
