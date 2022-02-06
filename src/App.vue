<template>
  <div id="app">
    <b-navbar toggleable="lg" class="app-navbar" type="dark" variant="danger">
    <b-navbar-brand href="#" class="app-none">
      <img src="./assets/logo(1).png" style="width: 150px;">
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav class="w-100">
      <div class="container d-flex flex-column flex-lg-row">
        <b-nav-item class="mx-lg-auto" to='/'><b-nav-text><a>首頁</a></b-nav-text></b-nav-item>
        <b-nav-item class="mx-lg-auto" href="#section02"><b-nav-text><a>鍋物介紹</a></b-nav-text></b-nav-item>
        <b-navbar-brand to='/' class="d-none d-lg-block">
          <img src="./assets/logo(1).png" style="width: 150px;">
        </b-navbar-brand>
        <b-nav-item class="mx-lg-auto" href="#section03"><b-nav-text><a>我要點餐</a></b-nav-text></b-nav-item>
        <b-nav-item class="mx-lg-auto" href="#footer"><b-nav-text><a>聯絡我們</a></b-nav-text></b-nav-item>
      </div>
      <b-nav-item class="ms-lg-auto" v-if="!user.isLogin" @click="signForLine"><b-nav-text><a>註冊</a></b-nav-text></b-nav-item>
      <b-nav-item class="ms-lg-auto" v-if="user.isLogin" @click="signForLine"><b-nav-text><a>購物車</a></b-nav-text></b-nav-item>
      <b-nav-item class="ms-lg-auto" v-if="user.isLogin && user.isAdmin" @click="signForLine"><b-nav-text><a>管理</a></b-nav-text></b-nav-item>
      <b-nav-item class="ms-lg-auto d-none d-lg-block"><b-nav-text><a>|</a></b-nav-text></b-nav-item>
      <b-nav-item class="ms-lg-auto" v-if="!user.isLogin" v-b-modal.modal-1><b-nav-text><a>登入</a></b-nav-text></b-nav-item>
      <b-nav-item class="ms-lg-auto" v-if="user.isLogin" @click="logout"><b-nav-text><a>登出</a></b-nav-text></b-nav-item>
    </b-navbar-nav>
    </b-collapse>
  </b-navbar>

<b-modal ref="my-modal" id="modal-1" hide-footer>
    <b-tabs align="around">
    <b-tab title="使用者登入" active>
    <div class="text-center my-5">
      <font-awesome-icon @click="signForLine" :icon="['fab', 'line']" size="6x" style="color:green"/>
    </div>
    </b-tab>
    <b-tab title="管理者登入">
      <b-form @submit.prevent="login">
        <b-form-group label='帳號' label-for='input-account' description='帳號長度為 5 到 20 個字' :state='state.account' invalid-feedback="帳號格式不正確">
        <b-form-input id="input-account" v-model="form.account" required placeholder='請輸入帳號' type="text" :state='state.account'></b-form-input>
        </b-form-group>
        <b-form-group label='密碼' label-for='input-account' description='帳號長度為 4 到 20 個字' :state='state.account' invalid-feedback="帳號格式不正確">
        <b-form-input id="input-account" v-model="form.password" required placeholder='請輸入密碼' type="password" :state='state.password'></b-form-input>
        </b-form-group>
        <div class="text-center">
          <b-btn class="mx-1" variant='success' type='sumbit' @click="hideModal">登入</b-btn>
        </div>
      </b-form>
    </b-tab>
  </b-tabs>
  </b-modal>
  <router-view></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;300;400;500;700;900&display=swap');
</style>

<script>
export default {
  data () {
    return {
      form: {
        account: '',
        password: ''
      }
    }
  },
  computed: {
    state () {
      return {
        account: this.form.account.length === 0 ? null : this.form.account.length >= 4 && this.form.account.length <= 20,
        password: this.form.password.length === 0 ? null : this.form.password.length >= 4 && this.form.password.length <= 20
      }
    }
  },
  methods: {
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    random (R) {
      return Math.floor(Math.random() * R)
    },
    async signForLine () {
      let link = 'https://access.line.me/oauth2/v2.1/authorize?'
      link += 'response_type=code' // 使用者登入後，請LINE回傳「code」（授權碼）
      link += '&client_id=' + process.env.VUE_APP_CHANNEL_ID
      link += '&redirect_uri=' + process.env.VUE_APP_CALLBACK_URL // /users/signInLine
      link += '&state=' + this.randomState
      // TODO: state 建議在 Web app 請求中，針對每個登入階段隨機生成。並確認該值與Web app 中接收授權碼時的 state 屬性值一致。
      link += '&bot_prompt=normal' // 預設要加官方帳號好友
      link += '&scope=openid%20profile' // 預設申請使用者資料及 token
      window.location.href = link
      console.log(link)
    },
    login () {
      this.$store.dispatch('user/login', this.form)
      console.log(123)
    },
    logout () {
      this.$store.dispatch('user/logout')
    }
  },
  async created () {
    this.$store.dispatch('user/getInfo')
  }
}
</script>
