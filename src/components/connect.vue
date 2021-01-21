<template>
  <span>
      <a href="#" class="get-started-btn scrollto" v-on="!btndisabled ? { onConnect: () => handler } : {}" v-if="!connected" @click="onConnect">Connect</a>
      <router-link class="get-started-btn scrollto" :to="{ name: 'account' }" v-else>Account</router-link>
  </span>
</template>

<script>
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

export default {
  name: 'walletConnect',
  data () {
    return {
      provider: [],
      btndisabled: false,
      web3ModalFunction: ''
    }
  },
  props: {
    rerender: Function
  },
  computed: {
    connected () {
      return this.$store.getters.connected
    }
  },
  async beforeMount () {
    if (location.protocol !== 'https:') {
      // https://ethereum.stackexchange.com/a/62217/620
      this.$bvToast.toast('Please open this site in a secure "https" environment for the best experience.', {
        title: 'Error',
        variant: 'danger',
        solid: true,
        toaster: 'b-toaster-bottom-right'
      })
    }

    if (this.$store.getters.getProvider) {
      // Subscribe to accounts change
      this.$store.getters.getProvider.on('accountsChanged', (accounts) => {
        if (typeof accounts[0] !== 'undefined') {
          // this.fetchAccountData(this.$store.getters.getProvider)
        } else {
          this.onDisconnect()
        }
      })

      // Subscribe to chainId change
      this.$store.getters.getProvider.on('chainChanged', (chainId) => {
        this.fetchAccountData(this.$store.getters.getProvider, 'chainChanged')
      })
    }
  },
  methods: {
    /**
     * Kick in the UI action after Web3modal dialog has chosen a provider
     */
    async fetchAccountData (provider, message) {
      if (!message) {
        this.onConnect()
      } else {
        // Get a Web3 instance for the wallet
        const web3 = new Web3(provider)

        // Get connected chain id from Ethereum node
        let chainId = await web3.eth.getChainId()
        // Get list of accounts of the connected wallet
        const accounts = await web3.eth.getAccounts()

        // MetaMask does not give you all accounts, only the selected account
        this.$store.commit('changeAddress', accounts[0])
        this.$store.commit('changeChain', chainId)
        this.$store.commit('setConnected', true)
        this.$emit('rerender')

        if (message === 'login') {
          this.$bvToast.toast('Successfully logged in with your wallet.', {
            title: 'Success',
            variant: 'success',
            solid: true,
            toaster: 'b-toaster-bottom-right'
          })
        } else if (message === 'chainChanged') {
          this.$bvToast.toast('Changed the chain successfully', {
            title: 'Success',
            variant: 'success',
            solid: true,
            toaster: 'b-toaster-bottom-right'
          })
        }
        // Go through all accounts and get their ETH balance
        const rowResolvers = accounts.map(async (address) => {
          const balance = await web3.eth.getBalance(address)
          // ethBalance is a BigNumber instance
          // https://github.com/indutny/bn.js/
          const ethBalance = web3.utils.fromWei(balance, 'ether')
          this.$store.commit('changeBalance', parseFloat(ethBalance).toFixed(4))
        })

        // Because rendering account does its own RPC commucation
        // with Ethereum node, we do not want to display any results
        // until data for all accounts is loaded
        await Promise.all(rowResolvers)
      }
    },
    /**
     * Fetch account data for UI when
     * - User switches accounts in wallet
     * - User switches networks in wallet
     * - User connects wallet initially
     */
    async refreshAccountData () {
      // If any current data is displayed when
      // the user is switching acounts in the wallet
      // immediate hide this data
      // tbd

      // Disable button while UI is loading.
      // fetchAccountData() will take a while as it communicates
      // with Ethereum node via JSON-RPC and loads chain data
      // over an API call.
      this.btndisabled = true
      let enable = await this.fetchAccountData(this.$store.getters.getProvider, 'login')
      if (enable) {
        this.btndisabled = false
      }
    },

    /**
     * Connect wallet button pressed.
     */
    async onConnect () {
       // Tell Web3modal what providers we have available.
      // Built-in web browser provider (only one can exist as a time)
      // like MetaMask, Brave or Opera is added automatically by Web3modal
      let providerOptions = {
        injected: {
          display: {
            // logo: "data:image/gif;base64,INSERT_BASE64_STRING",
            name: 'Wallet',
            description: 'Connect with the provider in your Browser'
          },
          package: null
        },
        walletconnect: {
          display: {
            name: 'WalletConnect'
          },
          package: WalletConnectProvider,
          options: {
            // Mikko's test key - don't copy as your mileage may vary
            infuraId: 'fe0e4d2c3e86450692da89ef38195d1c',
            qrcodeModalOptions: {
              mobileLinks: [
                'metamask',
                'trust',
                'rainbow',
                'klever',
                'rainbow',
                'argent',
                'imtoken',
                'pillar'
              ]
            }
          }
        }
      }

      if (Web3Modal) {
        this.web3ModalFunction = new Web3Modal({
          cacheProvider: true,
          providerOptions, // required
          theme: {
            background: 'rgb(39, 49, 56)',
            main: 'rgb(199, 199, 199)',
            secondary: 'rgb(136, 136, 136)',
            border: 'rgba(195, 195, 195, 0.14)',
            hover: 'rgb(16, 26, 32)'
          },
          disableInjectedProvider: false // optional. For MetaMask / Brave / Opera.
        })

        if (this.web3ModalFunction.cachedProvider) {
          await this.web3ModalFunction.connect()
        } else {
          let provider = await this.web3ModalFunction.connect()
          if (provider) {
            this.fetchAccountData(provider)
            this.$store.commit('changeProvider', provider)
            // Subscribe to provider disconnection
            provider.on('disconnect', error => {
              console.log(error)
            })
            provider.on('connect', success => {
              this.fetchAccountData(provider)
              console.log(success)
            })
          }
        }
      }
      let isMobile = window.matchMedia('only screen and (max-width: 760px)').matches
      if (this.web3ModalFunction) {
        this.web3ModalFunction.clearCachedProvider()
        console.log('Opening a dialog', this.web3ModalFunction)
      } else {
        if (!isMobile) {
          this.$bvToast.toast('Your browser does not support Web3 or does not have Metamask installed. <a href="https://metamask.app.link/dapp/www.betbeetle.com">Install Metamask</a>', {
            title: 'Error',
            variant: 'danger',
            solid: true,
            toaster: 'b-toaster-bottom-right'
          })
        } else {
          this.$bvToast.toast('Please use a browser that supports Web3 (Opera / Kiwi Browser / Firefox with Metamask Extension) or open this website in your wallet.', {
            title: 'Error',
            href: 'https://metamask.app.link/dapp/www.betbeetle.com',
            variant: 'danger',
            solid: true,
            toaster: 'b-toaster-bottom-right'
          })
        }
      }
      try {
        let provider = await this.web3ModalFunction.connect()
        this.$store.commit('changeProvider', provider)
      } catch (e) {
        console.log(e)
        this.$bvToast.toast('The wallet connection could not be established.' + (isMobile ? '  Open in Metamask.' : ''), {
          title: 'Error',
          href: 'https://metamask.app.link/dapp/www.betbeetle.com',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-bottom-right'
        })
        return
      }

      // Subscribe to accounts change
      this.$store.getters.getProvider.on('accountsChanged', (accounts) => {
        if (typeof accounts[0] !== 'undefined') {
          // this.fetchAccountData(this.$store.getters.getProvider)
        } else {
          this.onDisconnect()
        }
      })

      // Subscribe to chainId change
      this.$store.getters.getProvider.on('chainChanged', (chainId) => {
        this.fetchAccountData(this.$store.getters.getProvider, 'changeChain')
      })

      await this.refreshAccountData(this.$store.getters.getProvider, 'login')
    },
  /**
   * Disconnect wallet button pressed.
   */
    async onDisconnect () {
  // TODO: Which providers have close method?
      if (this.$store.getters.getProvider.close || this.$store.getters.getProvider.disconnect) {
        await this.$store.getters.getProvider.disconnect()

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
        await this.web3ModalFunction.clearCachedProvider()
        this.$store.commit('changeProvider', null)
      }

      this.$store.commit('changeAddress', null)
      this.$store.commit('changeChain', null)
      this.$store.commit('setConnected', false)
      this.$emit('rerender')

  // Set the UI back to the initial state, tbd
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
