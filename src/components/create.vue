<template>
  <div>
    <div class="subpage-title" data-aos="slide-down" data-aos-delay="200">
    <h1>
      Create new bet
    </h1>
    </div>


    <div class="container">

      
    
    <div>
      Please choose if you want to create a public or private bet and fill out all fields. A private bet doesn't appear in the public list of bets and only two bets with the same amount can be made. After you have created your bet, you have to place the first bet so that your bet will appear in the public list. 
    </div>

    <loading :active.sync="isLoad" 
    :can-cancel="true" 
    :is-full-page="true"></loading>

        <b-card data-aos="fade-up" data-aos-delay="200">
          <div class="b-row">
            <div>
              <!--
              <div>
                <div>
                  <label for="Example">
                    EXAMPLE BETS
                  </label>
                  <b-form-select v-model="newbet.token" :options="[]" id="Example" 
                  required
                  selected="0x0000000000000000000000000000000000000000"></b-form-select>
                </div>
              </div>
              -->


              <div>
            <b-form-group>
              <b-form-radio-group
                id="bettype"
                v-model="newbet.bettype"
                :options="[
                  { text: 'Public bet', value: 1 },
                  { text: 'Private bet', value: 0 }
                ]"
                buttons
                button-variant="outline-primary"
                size="lg"
                name="radio-btn-outline"
              ></b-form-radio-group>
            </b-form-group>
          </div>


              <div class="mt-5">
                  <label for="title">
                    TITLE
                  </label>
                <b-form-input
                  id="title"
                  v-model="newbet.title"
                  type="text"
                  placeholder="CMC ranking winner: ADA vs. LINK"
                  maxlength="55"
                  required
                  :state="$v.newbet.title.$error ? false : null"
                />
              </div>
            </div>
          </div>
          <b-row>
              <b-col>
                <div>
                  <label for="option0">
                    BET OPTION A
                  </label>
                  <b-form-input
                    id="option0"
                    v-model="newbet.option0"
                    type="text"
                    placeholder="ADA"
                    required
                    :state="$v.newbet.option0.$error ? false : null"
                  />
                </div>
              </b-col>
              
              <b-col>
                <div>
                  <label for="option1">
                    BET OPTION B
                  </label>
                  <b-form-input
                    id="option1"
                    v-model="newbet.option1"
                    type="text"
                    placeholder="LINK"
                    required
                    :state="$v.newbet.option1.$error ? false : null"
                  />
                </div>
              </b-col>
            </b-row>


            <b-row class="mt-4" v-if="newbet.bettype === 0">
            <b-col cols="6">
            <div>
              <label for="Amount">
                  TOTAL BET AMOUNT
                </label>
                <b-form-input
                  id="amount"
                  v-model="newbet.amount"
                  required
                  :state="$v.newbet.amount.$error ? false : null"
                  type="number"
                />
            </div>
          </b-col>
          <b-col>
            <div>
              <label for="odds">
                  ODDS (OPTION A)
                </label>
                <b-input-group append="%">
                  <b-form-input
                    id="amount"
                    v-model="newbet.betOdds"
                    required
                    :min="1"
                    :max="99"
                    :state="$v.newbet.amount.$error ? false : null"
                    type="number"
                  />
                </b-input-group>
            </div>
          </b-col>
            <b-col>
              <label for="odds">
                  ODDS (OPTION B)
                </label>
              <b-input-group append="%">
                <b-form-input
                  id="amount"
                  :value="100 - newbet.betOdds"
                  type="number"
                  disabled
                />
              </b-input-group>
              </b-col>
          </b-row>


          <div class="b-row">
            <div>
              <label for="description">
                DESCRIPTION
              </label>
              <wysiwyg v-model="newbet.description" :state="$v.newbet.description.$error ? false : null" />
            </div>
            <small>Describe the conditions and a source for the decision as clearly as possible so that the admins can quickly settle the bet.</small>
          </div>


            <b-row class="mt-5">
              <b-col sm>
                <div>
                  <label for="endDate">BET DURATION <span v-b-tooltip.hover title="How long can bets be placed? Must end before decision date" class="info-icon">?</span></label>
                  <b-input-group append="days">
                    <b-form-input id="endDate" v-model="newbet.endDate" type="number"></b-form-input>
                  </b-input-group>
                  
                </div>
              </b-col>
              <b-col sm>
                <div>
                  <label for="decisionDate">DECISION DATE <span v-b-tooltip.hover title="When is the bet decided? Important for admins to settle the bet as fast as possible after it will be decided." class="info-icon">?</span></label>
                  <b-form-datepicker
                      id="decisionDate"
                      v-model="newbet.decisionDate"
                      required
                      :state="$v.newbet.decisionDate.$error ? false : null"
                      :min="min"
                      class="mb-2"
                      :dark="true"
                    />
                </div>
              </b-col>
            </b-row>
            <b-row v-if="$v.newbet.decisionDate.$dirty && !$v.newbet.decisionDate.DateGreaterThan">
              <b-col class="error" sm>
              Decision date must always be after the end of the bet (bet duration)
              </b-col>
            </b-row>


          

          <b-row>
          <b-col v-if="newbet.bettype === 1 || (!newbet.bettype && newbet.bettype !== 0)">
              <div>
                <div>
                  <label for="Category">
                    CATEGORY
                  </label>
                  <b-form-select v-model="newbet.category" :options="cats" id="Category" 
                  required
                  :state="$v.newbet.category.$error ? false : null"></b-form-select>
                </div>
              </div>
            </b-col>
            <!--
            <b-col>
              <div>
                <div>
                  <label for="Token">
                    BET CURRENCY
                  </label>
                  <b-form-select v-model="newbet.token" :options="tokens" id="Token" 
                  required
                  selected="0x0000000000000000000000000000000000000000"
                  :state="$v.newbet.token.$error ? false : null"></b-form-select>
                </div>
              </div>
            </b-col>
            -->
            </b-row>
          

          <div class="b-row mt-5">
            <div>
              <b-button
                :variant="'primary'"
                @click="handleSubmit"
              >
                Create Bet
              </b-button>
            </div>
          </div>
        </b-card>
    </div>
    
    
  </div>
</template>

<script>
import BetContract from '../contracts/auctionBoxInstance'
import { validationMixin } from 'vuelidate'
import { required, requiredIf, between } from 'vuelidate/lib/validators'

// Import loading
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  name: 'create',
  mixins: [validationMixin],
  data () {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    // 15th two months prior
    const minDate = new Date(today)
    // 15th in two months
    const maxDate = new Date(today)
    maxDate.setMonth(maxDate.getMonth() + 12)

    return {
      auctionCard: [],
      amount: 0,

      bets: [],
      myBets: [],
      fields: [],

      title: '',
      startPrice: '',
      description: '',
      isShow: false,
      isLoad: false,
      newbet: [],

      cats: [],
      tokens: [],

      min: minDate,
      max: maxDate
    }
  },
  components: {
    Loading
  },
  validations: {
    newbet: {
      title: {
        required
      },
      description: {
        required
      },
      category: {
        required: requiredIf(function () {
          return this.newbet.bettype === 1 || (!this.newbet.bettype && this.newbet.bettype !== 0)
        })
      },
      amount: {
        required: requiredIf(function () {
          return this.newbet.bettype === 0
        }),
        between (value) {
          return between(1, 99)(value)
        }
      },
      option0: {
        required
      },
      option1: {
        required
      },
      decisionDate: {
        required,
        DateGreaterThan (value) {
          return new Date(value).getTime() > (new Date().getTime() + (this.newbet.endDate * 86400 * 1000))
        }
      },
      endDate: {
        required
      },
      token: {
        required
      }
    }
  },
  beforeMount () {
    this.newbet.endDate = 7
    this.newbet.category = null
    this.newbet.token = '0x0000000000000000000000000000000000000000'

    this.cats = [
      { value: null, text: 'Please select' },
      { value: 'Sports', text: 'Sports' },
      { value: 'Politics', text: 'Politics' },
      { value: 'Crypto', text: 'Crypto' },
      { value: 'Other', text: 'Other' }
    ]
    this.tokens = [
      { value: null, text: 'Please select' },
      { value: '0x0000000000000000000000000000000000000000', text: 'ETH' },
      { value: '0x0fF6ffcFDa92c53F615a4A75D982f399C989366b', text: 'LAYER' }
    ]
  },
  methods: {
    createBet () {
      // get accounts
      if (this.$store.getters.connected && this.$store.getters.getAddress) {
        // BetContract.at(0x2137127721) --> für anderen Token!
        // let value = amount.times(web3.toBigNumber(10).pow(decimals));
        /* // call transfer function
        BetContract.at(0x2137127721).transfer(toAddress, value, (error, txHash) => {
          // it returns tx hash because sending tx
          console.log(txHash);
        });
        */

        BetContract.methods.createBet(
          this.newbet.title,
          this.newbet.description,
          this.newbet.category ? this.newbet.category : 3,
          this.newbet.option0,
          this.newbet.option1,
          this.newbet.endDate * 86400,
          new Date(this.newbet.decisionDate).getTime() / 1000,
          this.newbet.betOdds ? this.newbet.betOdds : 0,
          this.newbet.amount ? this.newbet.amount : 1,
          this.newbet.token
        )
        .send({ from: this.$store.getters.getAddress }, (err, txHash) => {
          if (err) {
            this.$bvToast.toast('Metamask Connection did not work', {
              title: 'Error',
              variant: 'danger',
              solid: true,
              toaster: 'b-toaster-bottom-right'
            })
          } else {
            this.$bvToast.toast('Please stay on the page while you will get redirected.', {
              title: 'Success',
              variant: 'success',
              solid: true,
              toaster: 'b-toaster-bottom-right'
            })
          }
        })
        .then((receipt) => {
          BetContract.methods
          .getBetsCount().call()
          .then((count) => {
            this.$router.push({name: 'detail', params: { id: count - 1 }})
            this.isLoad = false
          })
        })
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
    handleSubmit () {
      this.isLoad = true
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log(this.$v)
        console.log(Object.keys(this.$v.$params).filter(fieldName => this.$v[fieldName].$invalid))
        this.isLoad = false
        this.$bvToast.toast('Please fill in all fields correctly.', {
          title: 'Error',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-bottom-right'
        })
      } else {
        this.createBet()
      }
    }
  }
}
</script>

<style>
</style>
