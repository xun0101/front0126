<template>
<b-container class="mt-5">
  <div class="text-center">
    <button class="btn-green border-0 my-3" v-b-modal.modal-product>新增</button>
  </div>
  <div class="card p-5 shadow">
  <b-table :items="products" :fields='fields' ref='table' stacked="md">
    <template #cell(image)='data'>
      <img v-if='data.item.image' :src='data.item.image' style="height: 80px;">
    </template>
    <template #cell(sell)='data'>
      {{ data.item.sell ? '✔' : '' }}
    </template>
    <template #cell(action)='data'>
      <button variant='success' @click='editProduct(data.index)' class="border-0 my-5">📝</button>
    </template>
  </b-table>
  <b-modal id="modal-product"
    :title="form._id.length > 0 ? '編輯商品' : '新增商品'"
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
      label='商品名稱'
      label-for='input-name'
      description='必填欄位'
      invalid-feedback='商品名稱必填'
      :state='state.name'
    >
    <b-form-input
      id="input-name"
      v-model='form.name'
      type='text'
      required
      placeholder='請輸入商品名稱'
      :state='state.name'
    ></b-form-input>
    </b-form-group>
    <b-form-group
      label='商品價格'
      label-for='input-price'
      description='必填欄位'
      invalid-feedback='價格必須是 0 元以上'
      :state='state.price'
    >
    <b-form-input
      id="input-price"
      v-model.number='form.price'
      type='number'
      min='0'
      required
      placeholder='請輸入商品價格'
      :state='state.price'
    ></b-form-input>
    </b-form-group>
    <b-form-group
      label='商品說明'
      label-for='input-description'
      description='必填欄位'
      invalid-feedback='說明必填'
      :state='state.description'
    >
    <b-form-input
      id="input-description"
      v-model='form.description'
      required
      rows="3"
      max-rows="6"
      placeholder='請輸入商品說明'
    ></b-form-input></b-form-group>
    <b-form-group label="上架">
      <b-form-radio v-model='form.sell' :value='true'>上架</b-form-radio>
      <b-form-radio v-model='form.sell' :value='false'>下架</b-form-radio>
    </b-form-group>
    <img-inputer
      accept="image/*"
      v-model="form.image"
      theme="light"
      size="large"
      bottom-text="點選或拖拽圖片以修改"
      hover-text="點選或拖拽圖片以修改"
      placeholder="點選或拖拽選擇圖片"
      :max-size="3072"
      exceed-size-text="檔案大小不能超過"
    ></img-inputer>
  </b-modal></div>
</b-container>
</template>

<script>
export default {
  data () {
    return {
      fields: [
        { key: 'image', label: '圖片' },
        { key: 'name', label: '名稱' },
        { key: 'price', label: '價格' },
        { key: 'description', label: '說明' },
        { key: 'sell', label: '上架' },
        { key: 'action', label: '操作' }
      ],
      products: [],
      modalSubmitting: false,
      form: {
        name: '',
        price: null,
        description: '',
        image: null,
        sell: false,
        _id: '',
        index: -1
      }
    }
  },
  computed: {
    state () {
      return {
        name: this.form.name.length === 0 ? null : true,
        price: this.form.price === null ? null : this.form.price >= 0
      }
    }
  },
  methods: {
    async submitModal (event) {
      event.preventDefault()
      if (!this.state.name || !this.state.price) {
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
          fd.append(key, this.form[key])
        }
      }

      try {
        if (this.form._id.length === 0) {
          const { data } = await this.api.post('/products', fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products.push(data.result)
        } else {
          const { data } = await this.api.patch('/products/' + this.form._id, fd, {
            headers: {
              authorization: 'Bearer ' + this.user.token
            }
          })
          this.products[this.form.index] = { ...this.form, image: data.result.image }
          this.$refs.table.refresh()
        }

        this.$bvModal.hide('modal-product')
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
        name: '',
        price: 0,
        description: '',
        image: null,
        sell: false,
        _id: '',
        index: -1
      }
    },
    editProduct (index) {
      console.log(index)
      this.form = { ...this.products[index], image: null, index }
      this.$bvModal.show('modal-product')
    }
  },
  async created () {
    try {
      const { data } = await this.api.get('/products/all', {
        headers: {
          authorization: 'Bearer ' + this.user.token
        }
      })
      this.products = data.result
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
