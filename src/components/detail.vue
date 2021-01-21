<template>
  <div>
    <div class="subpage-title" data-aos="slide-down" data-aos-delay="200" v-if="bet && $store.getters.connected">
    <h1>
      {{ bet.title }}
    </h1>
    </div>
    
    <div data-aos="slide-down" data-aos-delay="200" v-else-if="!$store.getters.connected">
      <b-container fluid="sm" class="mt-5 mb-5 bv-example-row">
        <div class="subpage-title">
          <h1>Not connected</h1>
        </div>
        <div class="text-center">
          Please make sure that your wallet is connected to view the bet.
        </div>
      </b-container>
    </div>

    <loading :active.sync="isLoad" 
    :can-cancel="true" 
    :is-full-page="true"></loading>


    <div>
      <div class="b-row" v-if="bet && $store.getters.connected">

          <b-container fluid="sm" class="mb-4 bv-example-row">
            
            <div v-html="bet.description"></div>
            <div v-if="bet.decisionDate" class="mt-3"><b>Decision date</b>: {{ new Date(parseInt(bet.decisionDate) * 1000).toLocaleDateString() }}</div>
 
            <b-row class="align-items-center mt-4">
              <b-col class="text-center">
                <div>
                  <div class="circle" :style="'width:' + circleSize + 'px; height:' + circleSize + 'px;'">&nbsp;</div>
                  <div style="color:#fff" class="mt-2">{{ bet.option0 }}</div>
                </div>
              </b-col>
              <b-col class="text-center">
                <div>
                  <div class="circle2" :style="'width:' + circle2Size + 'px; height:' + circle2Size + 'px;'">&nbsp;</div>
                  <div style="color:#595959" class="mt-2">{{ bet.option1 }}</div>
                </div>
              </b-col>
            </b-row>

            <b-row class="align-items-center">
              <b-col class="text-center">
                <div>
                  <div class="mt-1"><strong>{{ totalOptions0 }} {{ token[bet.tokenAddress] }}</strong></div>
                </div>
              </b-col>
              <b-col class="text-center">
                <div>
                  <div class="mt-1"><strong>{{ totalOptions1 }} {{ token[bet.tokenAddress] }}</strong></div>
                </div>
              </b-col>
            </b-row>
          </b-container>


          <div class="grey-bg text-center">
            <div v-if="new Date(parseInt(bet.endDate) * 1000) - new Date > 0">
              <h4>Time until betting end</h4>
              <countdown :time="Math.abs(new Date(parseInt(bet.endDate) * 1000) - new Date)">
                <template slot-scope="props">
                  <div id="countdown">
                    <ul>
                      <li v-if="props.days > 0"><span id="days">{{ props.days }}</span>day</li>
                      <li v-if="props.hours > 0 || props.days > 0"><span id="hours"> {{ props.hours }}</span>hour</li>
                      <li v-if="props.minutes > 0 || props.hours > 0 || props.days > 0"><span id="minutes">{{ props.minutes }}</span>min</li>
                      <li v-if="props.seconds > 0 || props.minutes > 0 || props.hours > 0 || props.days > 0"><span id="seconds">{{ props.seconds }}</span>sec</li>
                    </ul>
                  </div>
                  </template>
              </countdown>
            </div>
            <div v-else>
              Bet is expired, not possible to bet anymore.
            </div>

          <div class="mt-5" v-if="bet && bet.description">
            <span class="ml-2 mr-2">

              <ShareNetwork
                network="facebook"
                :url="'https://www.betbeetle.com/#/' + bet.id"
                :title="bet.title + ' - bet now on betbeetle.com!'"
                :description="bet.description.replace(/<[^>]*>?/gm, '').substr(0, 200) + '...'"
              >
                <img src="../assets/facebook.png" /> 
            </ShareNetwork>
          </span>
            <span class="ml-2 mr-2">

            <ShareNetwork
              network="telegram"
              :url="'https://www.betbeetle.com/#/' + bet.id"
              :title="bet.title + ' - bet now on betbeetle.com!'"
              :description="bet.description.replace(/<[^>]*>?/gm, '').substr(0, 200) + '...'"
            >
              <img src="../assets/telegram.png" /> 
          </ShareNetwork>
          </span>
            <span class="ml-2 mr-2">

          <ShareNetwork
            network="twitter"
            :url="'https://www.betbeetle.com/#/' + bet.id"
            :title="bet.title + ' - bet now on betbeetle.com!'"
          >
            <img src="../assets/twitter.png" /> 
        </ShareNetwork>
          </span>
            <span class="ml-2 mr-2">

          <ShareNetwork
            network="whatsapp"
            :url="'https://www.betbeetle.com/#/' + bet.id"
            :title="bet.title + ' - bet now on betbeetle.com!'"
            :description="bet.description.replace(/<[^>]*>?/gm, '').substr(0, 200) + '...'"
          >
            <img src="../assets/whatsapp.png" /> 
        </ShareNetwork>
          </span>
            <span class="ml-2 mr-2">

          <ShareNetwork
            network="line"
            :url="'https://www.betbeetle.com/#/' + bet.id"
            :title="bet.title + ' - bet now on betbeetle.com!'"
            :description="bet.description.replace(/<[^>]*>?/gm, '').substr(0, 200) + '...'"
          >
            <img src="../assets/line.png" /> 
        </ShareNetwork>
          </span>
            <span class="ml-2 mr-2">
          <ShareNetwork
            network="reddit"
            :url="'https://www.betbeetle.com/#/' + bet.id"
            :title="bet.title + ' - bet now on betbeetle.com!'"
            :description="bet.description.replace(/<[^>]*>?/gm, '').substr(0, 200) + '...'"
          >
            <img src="../assets/reddit.png" /> 
        </ShareNetwork>
          </span>
          </div>
          </div>

          


          <div v-if="$route.params.type === 'admin'">
            <h3>Admin</h3>
            <b-button
              :variant="'primary'"
              @click="cancelBet($route.params.id)"
            >
              Cancel bet
            </b-button>
            <b-button
              :variant="'primary'"
              @click="declareWinner($route.params.id, 0)"
            >
              Decide Bet (0)
            </b-button>
            <b-button
              :variant="'primary'"
              @click="declareWinner($route.params.id, 1)"
            >
              Decide Bet (1)
            </b-button>
          </div>
          <div class="pb-5 pt-5" v-if="new Date(parseInt(bet.endDate) * 1000) - new Date > 0">
            
              <b-container fluid="sm" class="bv-example-row">
            <h3>Place new bet</h3>
            <b-row>
              <b-form-checkbox
                id="terms"
                v-model="terms"
                name="terms"
                :value="true"
                :unchecked-value="false"
              >
                I accept the <router link="{ name: 'imprint' }">terms and conditions</router>
              </b-form-checkbox>
            </b-row>
                <b-row>
                  <b-col sm>
                    <!--
                      v-if="bet.tokenAddress != '0x0000000000000000000000000000000000000000'"
                    <b-button
                      :variant="'primary'"
                      @click="approve(bet.tokenAddress)"
                    >
                      Approve
                    </b-button>
                    -->
                    <b-form-group>
                      <b-form-radio-group
                        id="bettype"
                        v-model="betoption"
                        :options="[
                          { text: bet.option0, value: 0 },
                          { text: bet.option1, value: 1 }
                        ]"
                        buttons
                        button-variant="outline-primary"
                        size="lg"
                        name="radio-btn-outline"
                        :disabled="!terms"
                        :state="$v.betoption.$error ? false : null"
                      ></b-form-radio-group>
                    </b-form-group>
                    <div class="error" v-if="$v.betoption.$error && !$v.betoption.required">No option selected</div>
                  </b-col>
                  <b-col sm>
                    <b-input-group size="lg" prepend="ETH">
                      <b-form-input
                        id="amount"
                        type="number"
                        v-model="amount"
                        :disabled="!terms"
                        required
                        :state="$v.amount.$error ? false : null"
                      />
                    </b-input-group>
                    
                    <div class="error" v-if="$v.amount.$error && !$v.amount.required">No amount entered</div>
                    <div class="error" v-if="$v.amount.$error && !$v.amount.minValue">Amount must be at least 0.02 ETH.</div>
                  </b-col>
                  <b-col sm>
                    <b-button
                      :variant="'primary'"
                      v-on:click="terms ? handleSubmit() : ''">
                      Send bet
                    </b-button>
                  </b-col>
                </b-row>
              </b-container>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Web3 from 'web3'

// Import loading
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

import BetContract from '@/contracts/auctionBoxInstance'
// import layer from '@/contracts/layer'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
const greaterThanMin = (value) => value >= 0.02

export default {
  name: 'create',
  mixins: [validationMixin],
  components: {
    Loading
  },
  data () {
    return {
      auctionCard: [],
      amount: '',
      bet: [],
      bets: [],
      myBets: [],
      fields: [],
      terms: false,

      title: '',
      betoption: '',
      startPrice: '',
      description: '',
      isShow: false,
      isLoad: false,
      token: [],

      cats: [],
      tokens: [],

      web3: '',

      totalOptions0: '',
      totalOptions1: '',

      circleSize: '0',
      circle2Size: '0'
    }
  },
  validations: {
    amount: {
      required,
      minValue: greaterThanMin
    },
    betoption: {
      required
    }
  },
  beforeMount () {
    if (this.$store.getters.getProvider) {
      this.web3 = new Web3(this.$store.getters.getProvider)
      if (this.web3) {
        this.web3.eth.getTransactionReceiptMined = require('@/contracts/getTransactionReceiptMined')
      }
    }
    this.token['0x0000000000000000000000000000000000000000'] = 'ETH'
    this.token['0x0000000000000000000000000000000000000010'] = 'BTC'
    this.fields = [
      {
        key: '0',
        label: 'ID',
        sortable: true
      },
      {
        key: '1',
        label: 'Title',
        sortable: true
      },
      /*
      {
          key: '2',
          label: 'Desc',
          sortable: true
      },

      {
          key: '3',
          label: 'Categorie',
          sortable: true
      },
      */
      {
        key: '4',
        label: 'Teams',
        sortable: true
      },
      {
        key: '6',
        label: 'Date',
        sortable: true
      },
      {
        key: '8',
        label: 'Amount',
        sortable: true
      },
      {
        key: '9',
        label: 'Token',
        sortable: true
      }
    ]

    this.updateBet(this.$route.params.id)

    this.cats = [
      { value: '0', text: 'Sports' },
      { value: '1', text: 'Politics' },
      { value: '2', text: 'Crypto' },
      { value: '3', text: 'Other' }
    ]
    this.tokens = [
      { value: '0x0000000000000000000000000000000000000000', text: 'ETH' },
      { value: '0x0fF6ffcFDa92c53F615a4A75D982f399C989366b', text: 'LAYER' }
    ]
  },
  methods: {
    updateBet (id) {
      if (BetContract) {
        BetContract.methods
        .getBet(id)
        .call()
        .then((bet) => {
          console.log(bet)
          this.bet = bet
          if (Number(this.bet.id) !== Number(id)) {
            this.$router.push({name: 'home'})
          } else {
            BetContract.methods
            .getBetTotalOptions0(bet.id)
            .call()
            .then((option0) => {
              this.totalOptions0 = Number(option0) / 1000000000000000000

              BetContract.methods
              .getBetTotalOptions1(bet.id)
              .call()
              .then((option1) => {
                this.totalOptions1 = Number(option1) / 1000000000000000000
                this.circleSize = (this.totalOptions1 === 0 ? 150 : (this.totalOptions0 === 0 ? 10 : 150 * (this.totalOptions0 / (this.totalOptions0 + this.totalOptions1))))
                this.circle2Size = (this.totalOptions0 === 0 ? 150 : (this.totalOptions1 === 0 ? 10 : (150 * this.totalOptions1 / (this.totalOptions0 + this.totalOptions1))))

                if (Number(bet.betOdds) === 0 && this.totalOptions0 + this.totalOptions1 === 0) {
                  this.$bvToast.toast('Please make sure that you place the first bet so that your bet will be listed publicly.', {
                    title: 'Info',
                    variant: 'danger',
                    solid: true,
                    toaster: 'b-toaster-bottom-right'
                  })
                }
              })
            })
          }
        })
      }
    },
    sendBet (id) {
      // get accounts
      // add creator!! --> load "my bets" on website by own address!
      if (this.$store.getters.connected && this.$store.getters.getAddress) {
        if (this.bet) {
          let amount = this.token[this.bet.tokenAddress] === 'ETH' ? Number(this.amount) * 1000000000000000000 : this.amount
          BetContract.methods.sendBet(
            id,
            this.betoption,
            amount >= 1 && amount <= 1000000 ? amount : 1
          ).send({ from: this.$store.getters.getAddress, value: Number(amount) }, (err, txHash) => {
            if (err) {
              if (err.code === 4001) {
                this.$bvToast.toast('Payment was cancelled', {
                  title: 'Error',
                  variant: 'danger',
                  solid: true,
                  toaster: 'b-toaster-bottom-right'
                })
              } else {
                this.$bvToast.toast('Metamask Connection did not work', {
                  title: 'Error',
                  variant: 'danger',
                  solid: true,
                  toaster: 'b-toaster-bottom-right'
                })
              }
            } else {
              /*
              if(this.betoption === 0) {

              } else {

              }
              */
              this.$bvToast.toast('Bet placed successfully. Please update the page to see the updated bet balance.', {
                title: 'Success',
                variant: 'success',
                solid: true,
                toaster: 'b-toaster-bottom-right'
              })
              return true
            }
            this.isLoad = false
          })
          .then((receipt) => {
            console.log(receipt)
            this.isLoad = false
          })
        }
      } else {
        this.isLoad = false
        this.$bvToast.toast('Please connect your wallet first.', {
          title: 'Error',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-bottom-right'
        })
      }
    },
    cancelBet (id) {
      // get accounts
      // add creator!! --> load "my bets" on website by own address!
      if (this.$store.getters.connected && this.$store.getters.getAddress) {
        BetContract.methods.cancelBet(
          id
        ).send({ from: this.$store.getters.getAddress }, (err, txHash) => {
          if (err) {
            if (err.code === 4001) {
              this.$bvToast.toast('Payment was cancelled', {
                title: 'Error',
                variant: 'danger',
                solid: true,
                toaster: 'b-toaster-bottom-right'
              })
            } else {
              this.$bvToast.toast('Metamask Connection did not work', {
                title: 'Error',
                variant: 'danger',
                solid: true,
                toaster: 'b-toaster-bottom-right'
              })
            }
          } else {
            this.$bvToast.toast('All successful!', {
              title: 'Success',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-bottom-right'
            })

            return true
          }
          this.isLoad = false
        })
        .then((receipt) => {
          console.log(receipt)
          this.isLoad = false
        })
      }
    },
    declareWinner (id, option) {
      // get accounts
      // add creator!! --> load "my bets" on website by own address!
      if (this.$store.getters.connected && this.$store.getters.getAddress) {
        BetContract.methods.declareWinner(
          id,
          option
        ).send({ from: this.$store.getters.getAddress }, (err, txHash) => {
          if (err) {
            if (err.code === 4001) {
              this.$bvToast.toast('Payment was cancelled', {
                title: 'Error',
                variant: 'danger',
                solid: true,
                toaster: 'b-toaster-bottom-right'
              })
            } else {
              this.$bvToast.toast('Metamask Connection did not work', {
                title: 'Error',
                variant: 'danger',
                solid: true,
                toaster: 'b-toaster-bottom-right'
              })
            }
          } else {
            this.$bvToast.toast('All successful!', {
              title: 'Success',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-bottom-right'
            })

            return true
          }
          this.isLoad = false
        })
        .then((receipt) => {
          console.log(receipt)
          this.isLoad = false
        })
      }
    },
    handleSubmit () {
      this.isLoad = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.isLoad = false
        this.$bvToast.toast('Please fill in all fields correctly.', {
          title: 'Error',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-bottom-right'
        })
      } else {
        this.sendBet(this.$route.params.id)
      }
    }
    /*
    approve (token) {
      this.isLoad = true
      if (this.web3) {
        this.web3.eth.getAccounts().then((accounts) => {
          layer.methods.approve(
            accounts[0],
            10
          ).send({ from: accounts[0] }, (err, txHash) => {
            if (err) {
              if (err.code === 4001) {
                this.$bvToast.toast('Payment was cancelled', {
                  title: 'Error',
                  variant: 'danger',
                  solid: true,
                  toaster: 'b-toaster-bottom-right'
                })
              } else {
                this.$bvToast.toast('Metamask Connection did not work', {
                  title: 'Error',
                  variant: 'danger',
                  solid: true,
                  toaster: 'b-toaster-bottom-right'
                })
              }
            } else {
              this.$bvToast.toast('All successful!', {
                title: 'Success',
                variant: 'success',
                solid: true,
                toaster: 'b-toaster-bottom-right'
              })

              return this.web3.eth.getTransactionReceiptMined(txHash)
            }
            console.log('Tx Hash', txHash)
            this.isLoad = false
          })
          .then((receipt) => {
            console.log(receipt)
            this.isLoad = false
          })
        })
      }
    }
    */
  }
}
</script>

<style scoped>
#countdown li {
  display: inline-block;
  font-size: 1em;
  list-style-type: none;
  padding-right: 1rem;
  margin: 0;
  text-transform: uppercase;
}

#countdown li span {
  display: block;
  color:#fff !important;;
  font-size: 2rem !important;;
}
.circle, .circle2 {
  margin: 0 auto;
  border-radius: 50%;
  background: #fff;
}

.circle2 { 
  background: #595959 !important;
  color: #fff !important;
}
</style>
