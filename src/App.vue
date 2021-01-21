<template>
    <div id="app">
      <header id="header" class="fixed-top" data-aos="slide-down" data-aos-delay="200">
    <div class="grid-container d-flex align-items-center">

      <h1 class="logo mr-auto"><router-link :to="{ name: 'home' }"><img src="./assets/logo/android-icon-72x72.png" /></router-link></h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo mr-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav class="nav-menu">
        <ul>
          <li><router-link class="selected" :to="{ name: 'create' }">New</router-link></li>
        </ul>
      </nav><!-- .nav-menu -->

      <connect @rerender="rerenderComponent"></connect>

    </div>
  </header>

  <div>
      <!-- <img v-if="$route.name === 'home'" src="./assets/logo_small.png" data-aos="fade-up" data-aos-delay="200" /> -->

      <transition
        name="fade"
        mode="out-in"
      >
      <router-view :key="key"></router-view>
      </transition>

      <footer data-aos="fade-up" data-aos-delay="200" id="footer" class="grey-bg">
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6 footer-contact">
            <h4>betbeetle</h4>
            <p>Beat your friends or the community with your own bets and win up to 98% of your opponents' bets. The more wins you get, the higher you'll move up in the level and scoop up even more betting winnings.</p>
            <br><p><strong>Email:</strong> info@betbeetle.com</p>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Links</h4>
            <ul>
              <li><router-link :to="{ name: 'create' }">Create Bet</router-link></li>
              <li><router-link :to="{ name: 'account' }">My Account</router-link></li>
              <li><router-link :to="{ name: 'info' }">New token listing</router-link></li>
              <li><router-link :to="{ name: 'imprint' }">Imprint</router-link></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Social media</h4>
            <ul>
              <li><a href="https://twitter.com/betbeetle_com">Twitter</a></li>
              <li><a href="https://t.me/betbeetle_com">Telegram</a></li>
              <li><a href="https://medium.com/betbeetle">Medium</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Responsible betting</h4>
            <p>Gambling can be addictive. For this reason, please only bet money that you can afford to lose. If you recognize signs of gambling addiction, <a href="https://www.helpguide.org/articles/addictions/gambling-addiction-and-problem-gambling.htm">this page</a> may help you.</p>
          </div>

        </div>
      </div>
    </div>

    <div class="container footer-bottom clearfix text-right">
        © betbeetle.com (2021). All rights reserved.
    </div>
  </footer>
    </div>
    
    <cookie-law theme="dark-lime">
        <div slot="message">
      This website uses cookies to ensure you get the best experience on our website. <router-link :to="{ name: 'imprint' }">Privacy policy</router-link>
    </div>
    </cookie-law>
    </div>
</template>

<script>
// import web3 from '@/contracts/web3'
import connect from '@/components/connect.vue'
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'app',
  data () {
    return {
      key: 0,
      noMetamask: false,
      noMetamaskDesktop: false
    }
  },
  components: {
    connect,
    CookieLaw
  },
  methods: {
    rerenderComponent () {
      this.key = this.key += 1
    },
    setLang (lang) {
      if (lang === 'en' || lang === 'de') {
        localStorage.setItem('lang', lang)
        location.reload()
      }
    }
  },
  beforeMount () {
    /* if (!web3) {
      let isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
      if (isMobile) {
        this.noMetamask = true
      } else {
        this.noMetamaskDesktop = true
      }
    } else { */
      // network id 1 = mainnet, 3 = ropsten
      /* if (this.$store.getters.getChain === 3) {
        this.$bvToast.toast('Only the Ropsten testnet is supported as of now.', {
          title: 'Change network',
          variant: 'info',
          solid: true,
          toaster: 'b-toaster-bottom-full'
        })
      } */
    // }
  }
}
</script>

<style lang="scss">
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: $primary-color;
  margin-top: 60px;
  background: #191b1c !important;
  color: #bdb7af !important;
}

h1, strong {
  color: #ED3737;
  margin-bottom:0;
}

.subpage-title h1 {
  color:#fff !important;
}

h1, .h1 {
  font-weight:900 !important;
}

h3, .h3 {
  font-size:1.3rem !important;
  color:#fff !important;
  text-transform: uppercase !important;
}

h4, .h4 {
  color:#fff;
}


ul {
  margin-left: 0;
  // list-style-type: none;
  padding: 0;
}

li {
  // display: inline-block;
  margin: 0 10px;
}

a:not(.get-started-btn):not(.btn-get-started):not(.btn-link) {
  color: #ED3737 !important;
}

.error {
  padding-bottom: 1rem;
  border: 3px solid #fff;
  padding-top: 1rem;
  margin-bottom: 1.5rem;
  background: #C00000;
  margin-left: 1rem;
  margin-right: 1rem;
}

.grid-item {
  color:#bdb7af;
}

button {
  background-color: #008cba;
  color: white;
}

button:hover {
  color: #fff;
}

.form-control:disabled, .form-control[readonly] {
  background: #4a4b4c;
}

.form-control .text-break {
  border: 0 !important;
}

.grey-bg {
  padding: 50px 0;
  background: #23323D !important;
}

.toast {
  border:0 !important;
}

svg {
  color:#fff !important;
  fill:#fff !important;
}

.editr--toolbar {
  background: #C00000 !important;
  border-bottom: 0 !important;
}

.editr {
  border: 1px solid #495057 !important
}

.editr--toolbar .dashboard {
  background: #191b1c !important;
  border: 1px solid #495057 !important;
}

button:not(#decisionDate):not(.btn-primary):not(.btn-link) {
  padding:1rem !important;
  background:transparent !important;
}

button:hover {
  opacity:0.75 !important;
}

.text-dark {
  color:#fff !important;
}

.bg-light {
  background:#495057 !important;
}

.btn-link {
  color: #fff !important;
  border-radius: 50px;
  padding: 6px 25px 7px 25px;
  white-space: nowrap;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  font-size: 14px;
  display: inline-block;
  background: #C00000;
}
.btn-link:hover {
  text-decoration:none !important;
  background:#23323D;
  color: #fff !important;
}

label {
  color: #fff!important;
  text-align:left;
}
label:not(.btn-outline-primary) span {
  color:#fff !important;
}

.btn-group>.btn-group>.btn {
  padding:0.8rem 2rem !important;
}

.btn-group-lg>.btn:hover {
  color:#fff !important;
}

.b-toast-danger .toast .toast-header {
  background:#721c24 !important;
  border-color:#721c24 !important;
  color:#fff !important;
}
.b-toast-success .toast .toast-header {
  background:#155724 !important;
  border-color:#155724 !important;
  color:#fff !important;
}
.toast-header strong {
  color:#fff !important;
}
.b-toast-danger .toast {
  border:0 !important;
}


.btn-outline-primary {
  border-color: #ED3737 !important;
}
label:not(.active).btn-outline-primary {
  color: #ED3737 !important;
}

.btn-outline-primary:hover, .btn-outline-primary:not(:disabled):not(.disabled):active, .btn-outline-primary:not(:disabled):not(.disabled).active, .show > .btn-outline-primary.dropdown-toggle, .btn.focus, .btn:focus {
  background-color: #ED3737 !important;
  border-color: #ED3737 !important;
}

li a {
  color:#fff !important;
}

.menu-navigation-round {
    font: bold 12px Arial, Helvetica, sans-serif;
    text-align: center;
    margin-top: 30px;
}

.menu-navigation-round a {
    color: rgb(156, 147, 134);
    text-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px;
    text-decoration-color: initial;
}

.menu-navigation-round a {
    color: #748c99;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 20px auto;
    line-height: 2;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
}

.menu-navigation-round a.selected {
    color: rgb(232, 230, 227);
    background-color: #23323D
}

.menu-navigation-round a.selected {
    color: #ffffff;
    border-radius: 20px;
    padding: 10px 15px;
    margin: 0 5px auto;
}

.tabs, table, thead, tbody, tfoot {
  border:none !important;
}

.tabs {
  background:transparent;
}

.nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
  border-radius: 2rem;
  background: #C00000 !important;
  padding:0.5rem 2rem !important;
  color:#fff !important;
}

.nav-tabs .nav-link {
  border:0 !important;
}

.nav-link:focus, .nav-tabs .nav-link:hover {
  border: 0 !important;
}

.nav-tabs .nav-link:hover {
  color: #ed3737 !important;
}

.nav-link a {
  color: #ffffff !important;
}


.nav-tabs, .card {
  // border-bottom: 1px solid #C00000;
  border: 0 !important;
}
.card {
  margin-top: 2rem;
  background:transparent !important;
}

.form-control {
  color: #fff !important;
  background: #1d1f20 !important;
  border: 0 !important;
}

.form-control:focus {
  border: 1px solid #C00000 !important;
  background: #1d1f20 !important;
  color: #fff !important;
}

.b-form-btn-label-control.form-control {
  padding:1rem !important;
}
.form-control, .form-control:active, .custom-select{
 border: 1px solid #495057 !important;
 background: none !important;
}

.tooltip-inner, .tooltip {
  background: #C00000 !important;;
}

.tooltip {
  background: transparent !important;;
}

.bs-tooltip-top .arrow::before, .bs-tooltip-auto[x-placement^="top"] .arrow::before {
  border-top-color: #ED3737 !important;;
}

.info-icon {
  border-radius:50%;
  padding-left: 5px;
  padding-right: 5px;
  background: #C00000 !important;;
}

select, [type='text'], [type='password'], [type='date'], [type='datetime'], [type='datetime-local'], [type='month'], [type='week'], [type='email'], [type='number'], [type='search'], [type='tel'], [type='time'], [type='url'], [type='color'], textarea {
  border-radius: 0.25rem !important;
  padding: 2rem !important;
}
input:active, input:hover, input:focus, textarea:active, textarea:hover, textarea:focus {
  border-color: #ED3737 !important;
  background: transparent !important;
}
.close {
  color:#fff !important;;
  text-shadow: 0 !important;;
}
.close:hover {
  color: #fff !important;;
}
.b-toast-info.b-toast-solid .toast {
  background: #23323D !important;
  color:#efefef !important;
  border-color:#23323D !important;
}
.b-toast-info .toast .toast-header {
  background: #23323D !important;
  color:#fff !important;
  border-color:#23323D !important;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
