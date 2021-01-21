<template>
  <div>

    <section id="hero" class="d-flex align-items-center" data-aos="slide-down" data-aos-delay="200">

    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1 aos-init aos-animate">
          <h1>YOUR BET ON A SMART CONTRACT.</h1>
          <h2>Crypto, sports, politics and more. No KYC and no registration required. Private and public bets - decentralized, secure, instant.</h2>
          <div class="d-lg-flex mx-auto">
            <router-link :to="{ name: 'create' }" class="btn-get-started scrollto">Create new bet</router-link>
            <a href="https://betbeetle.com/static/assets/whitepaper.pdf" class="venobox btn-watch-video vbox-item">Whitepaper</a>
          </div>
        </div>

        <div class="col-lg-6 order-1 order-lg-2 hero-img aos-init aos-animate">
          <img src=".././assets/logo_small.png" class="img-fluid animated" alt="">
        </div>
      </div>
    </div>

  </section>

  <b-container data-aos="fade-up" data-aos-delay="200">
    <div v-if="connected">
      <b-tabs class="mt-5 mb-5" >
        <b-tab v-bind:key="cat" v-for="cat of cats" :title="cat">
          <div class="mt-5" v-if="bets[cat]">
          <div v-bind:key="item.id" v-for="item in bets[cat]" data-aos="zoom-in" data-aos-delay="100">
            <router-link :to="{ name: 'detail', params: { id: item.id }}">
              <div class="grid-item large floatLeft">
                <span class="token">{{ token[item.tokenAddress] }}</span>
                <img :src="'https://www.betbeetle.com/static/assets/bets/bet_' + item.id + '.jpg'" @error="$event.target.src = 'https://www.betbeetle.com/static/assets/bets/default.jpg'" :alt="item.title" />
                <div class="info hide-info">
                  <div class="title">{{ item.title }}</div>
                  <div class="description">{{ item.option0 }} vs. {{ item.option1 }}</div>
                  <div class="date float-right">{{ new Date(parseInt(item.endDate) * 1000).toLocaleDateString() }}, {{ new Date(parseInt(item.endDate) * 1000).toLocaleTimeString() }}</div>
                </div>
              </div>
              </router-link>
            </div>
          </div>
          <div v-else class="ml-3 mt-4">No open bets found.</div>
        </b-tab>
      </b-tabs>
    </div>
    <div class="mt-5" v-else>
      <h4>Not connected</h4>
        <div class="mt-4 mb-5">
          <div>Please make sure that your wallet is connected to view all bets.</div>
          <div>
          <a class="btn-get-started scrollto" href="https://metamask.app.link/dapp/www.betbeetle.com">Open in Metamask Browser</a> | <a class="btn-get-started scrollto" href="https://metamask.io/download">Install Metamask</a> | <a href="https://link.trustwallet.com/open_url?coin_id=60&url=https://www.betbeetle.com">Open in Trustwallet</a>
          </div>
        </div>
    </div>
    <!--
    <div class="mt-5" v-else>
      <h2>Install Metamask to view bets</h2>
      <div class="mt-4 mb-5">
        <a :class="buttontext != 'Install Metamask now' ? 'disabled' : ''" @click="updateButton()" class="btn-get-started scrollto" href="https://metamask.app.link/dapp/www.betbeetle.com">Install Metamask</a>
      </div> 
    </div>
    -->
  </b-container>
  <hr data-aos="fade-up" data-aos-delay="200" />
  <b-container class="mt-5 mb-5" data-aos="fade-up" data-aos-delay="200">
  <div class="footer-newsletter">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <h4>Learn more (soon)</h4>
            <p>Learn more about our decentralized, tamper-proof and secure betting platform.</p>
            <a class="btn-link" href="#">Conditions</a>
            <a class="btn-link" href="https://betbeetle.com/static/assets/whitepaper.pdf">Whitepaper</a>
          </div>
        </div>
      </div>
    </div>
  </b-container>

  </div>
</template>

<script>
// import web3 from '../contracts/web3'
import BetContract from '@/contracts/auctionBoxInstance'
import MetaMaskOnboarding from '@metamask/onboarding'

//
// Wallet Connect
/*
https://docs.walletconnect.org/quick-start/dapps/client

import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  infuraId: "fe0e4d2c3e86450692da89ef38195d1c",
});

//  Enable session (triggers QR Code modal)
*/

export default {
  name: 'home',
  data () {
    return {
      amount: 0,
      noMetamask: false,
      noMetamaskDesktop: false,
      connected: false,
      buttontext: 'Install Metamask now',
      publicPath: process.env.BASE_URL,

      bets: {},
      token: [],
      cats: []
    }
  },
  beforeMount () {
    this.token['0x0000000000000000000000000000000000000000'] = 'ETH'
    // this.token['0x0000000000000000000000000000000000000010'] = 'xx'
    this.connected = this.$store.getters.connected
    if (this.connected) {
      this.getPositivesBets()
    } /* else {
      let isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
      if (isMobile) {
        this.noMetamask = true
      } else {
        this.noMetamaskDesktop = true
      }
    } */

    this.cats = ['Crypto', 'Sports', 'Politics', 'Other']
  },
  methods: {
    updateButton () {
      let onboarding = new MetaMaskOnboarding()
      if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
        // this.buttontext = 'Onboarding in progress'
        onboarding.startOnboarding()
      }
    },
    getPositivesBets () {
      BetContract.methods
      .getPositivesBets(
        0,
        10,
      )
      .call()
      .then((bets) => {
        if (bets) {
          this.bets = bets[0]
          this.bets = this.bets.reduce(function (r, a) {
            r[a[3]] = r[a[3]] || []
            r[a[3]].push(a)
            return r
          }, Object.create(null))

          // this.updateFile(this.bets)

          // set the amount of bets
          this.amount = bets[0].length
        }
      })
    }
    /*
    updateFile (arr) {
        const data = JSON.stringify(arr)
        const fs = require('file-system');
        try { fs.writeFileSync('bets.json', data, 'utf-8'); }
        catch(e) { console.log(e) }
    }
    */
  }
}
</script>

<style>
#isBid, #isFin {
  height: 32px;
  margin-top: 16px;
  margin-left: 8px;
}

.grid-container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: auto;
  overflow: hidden;
}

.floatLeft {
  float: left;
}

.grid-item {
  position: relative;
  overflow: hidden;
  margin: 0.2%;
  height: 0px;
}

.grid-item:hover {
  transform: scale(0.97);
  cursor: pointer;
}

.grid-item:active {
  transform: scale(0.93);
  cursor: pointer;
}

.large {
  width: 32.9%;
  padding-bottom: 39.55%;
}

.grid-item img {
  overflow: hidden;
  width: 105%;
}

.grid-item .info {
  overflow: hidden;
  position: absolute;
  background-color: rgba(15, 15, 15, 0.9) !important;;
  bottom: 0;
  height: auto;
  left: 0;
  width: 100%;
  font-size: 100%;
  transition: all 0.25s ease-in-out;
}

.grid-item .show-info {
  height: 100%;
}

.grid-item .hide-info {
  padding: 0.75rem;
  height: 40%;
  max-height: 100px;
}

.grid-item .token {
    top: 2%;
    right: 2%;
    border-radius: 2rem;
    background: #2A3C4A !important;;
    padding: 0.5rem 1rem;
    color: #fff;
    position: absolute;
}

.grid-item .title {
  color:#fff !important;;
  font-weight:600;
  margin-top: 5px;
  font-size: 15px;
  padding: 1%;
}

.grid-item .date {
  padding: 3%;
  padding-top: 5px;
  font-size: 13px;
}

.grid-item .description {
  font-size: 13px;
  padding: 1%;
}

@media all and (max-width:680px) {
  .large {
    width: 99.3%;
    padding-bottom: 49.3%;
    margin-bottom: 1%;
  }
}
</style>
