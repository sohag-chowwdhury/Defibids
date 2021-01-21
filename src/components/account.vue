<template>
  <div>
    <div class="subpage-title" data-aos="slide-down" data-aos-delay="200">
    <h1>
      My Account
    </h1>
    </div>

    <div class="container">

    <div>
      <div class="b-row">
        <b-card>
          <div class="b-row">
            <div v-if="$store.getters.connected">
              <h4>{{ myacc }}</h4>
              <b-row class="mt-5">
                <b-col>
                  <strong>Balance (on Wallet)</strong><br />
                  ETH {{ $store.getters.getBalance }}
                </b-col>
                <b-col>
                  <strong>Balance (on betbeetle.com)</strong><br />
                  ETH {{ myethBalance }}
                </b-col>
              </b-row>
              <b-row class="mt-5">
                <b-col>
                  <strong>Victories</strong><br>
                  {{ victories }}
                </b-col>
                <b-col>
                  <strong>Level</strong><br>
                  {{ victoryLevel }}

                </b-col>
              </b-row>
              <br><br>
              <b-button v-if="ethBalance > 0"
                :variant="'primary'"
                @click="ethBalance()"
              >Withdraw ETH</b-button>
            </div>
          </div>
        </b-card>
       
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import BetContract from '../contracts/auctionBoxInstance'

// Import loading
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'account',
  data () {
    return {
      myacc: '',
      myethBalance: '',
      victories: 0,
      victoryLevel: 'Beginner',
      noMetamask: false,
      noMetamaskDesktop: false
    }
  },
  components: {
    Loading
  },
  beforeMount () {
    if (this.$store.getters.connected && this.$store.getters.getAddress) {
      if (BetContract) {
        BetContract.methods
        .ethBalance(this.$store.getters.getAddress)
        .call()
        .then((balance) => {
          if (balance) {
            this.myacc = this.$store.getters.getAddress
            this.myethBalance = balance
          }
        })

        BetContract.methods
        .getVictories(this.$store.getters.getAddress)
        .call()
        .then((data) => {
          if (data) {
            this.victories = data
            this.setLevel(this.victories)
          }
        })
      } else {
        let isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
        if (isMobile) {
          this.noMetamask = true
        } else {
          this.noMetamaskDesktop = true
        }
      }
    }
  },
  methods: {
    ethBalance () {
      if (BetContract) {
        BetContract.methods
        .withdrawEth()
        .call()
        .then((balance) => {
          console.log(balance)
        })
      }
    },
    setLevel (victories) {
      if (victories >= 5) {
        this.victoryLevel = 'Beginner'
      } else if (victories >= 20) {
        this.victoryLevel = 'Intermediate'
      } else if (victories >= 50) {
        this.victoryLevel = 'Advanced'
      } else if (victories >= 100) {
        this.victoryLevel = 'Pro'
      }
    }
  }
}
</script>

<style>
</style>
