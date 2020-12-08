import React from 'react'
import { Page, Center } from "../components/Layout"
import Button from "../components/Button"
import MetaMaskIcon from "../icons/metamask.svg"
import Modal from "../components/Modal"
import RegistrationForm from "../components/RegistrationForm"

import getWeb3 from '../web3/get-web3'
import { getUserInfo, createUser } from "../web3/users"
import { getIdea, createIdea } from '../web3/ideas'

export default class IndexPage extends React.Component {

  state = {
    showRegisterModal: false,
  }

  toggleRegisterModal = async () => {
    const { showRegisterModal } = this.state

    this.setState({
      showRegisterModal: !showRegisterModal,
    })
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();
      console.log(this.web3.currentProvider)

      // Use web3 to get the user's accounts.
      const accounts = await this.web3.eth.getAccounts();
      console.log(accounts);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  logUser = async () => {
    const userInfo = await getUserInfo(this.web3, 1)
    console.log(userInfo)
  }

  createUser = async () => {
    const tx = await createUser(this.web3, "artem")
    console.log(tx)
  }

  logIdea = async () => {
    const ideaInfo = await getIdea(this.web3, 1)
    console.log(ideaInfo)
  }

  createIdea = async () => {
    const tx = await createIdea(this.web3, 1, "my super cool idea")
    console.log(tx)
  }

  render() {
    const { showRegisterModal } = this.state // Get the state
    
    return (
      <Page>
        <Center>
          <h2>
            A decentralized Ideas Chain. Create your idea now!
          </h2>

          <div className="right-side">

            <Button style={{
              paddingLeft: 64,
            }} onClick={this.toggleRegisterModal}>
              <MetaMaskIcon />
              Create your account
            </Button>

            <div className="disclaimer">
              <p style={{color: "#8C8D90"}}>
                MetaMask will automatically open and ask you to confirm a transaction.
              </p>
              <p style={{color: "#8C8D90"}}>
                Please note that creating an account on the Ethereum blockchain costs a small amount of Ether.
              </p>
            </div>
          </div>
        </Center>

        {/* Add the Modal component: */}
        {showRegisterModal && (
          <Modal
            onClose={this.toggleRegisterModal}
          >
            <RegistrationForm />
          </Modal>
        )}

        <style jsx global>{`
          html, body {
            min-height: 100%;
          }
          body {
            background-color: #262740;
            background-image: url("/static/images/pexels-photo-316465.jpeg");
            background-size: cover;
            background-position: center center;
          }
        `}</style>

        <style jsx>{`
          h2 {
            font-size: 50px;
            color: #8C8D90;
            line-height: 78px;
            position: relative;
            text-transform: uppercase;
            max-width: 520px;
            display: inline-block;
          }
          mark {
            color: inherit;
            background-color: #9F99EC;
            padding: 0 7px;
          }
          .right-side {
            float: right;
            position: relative;
            max-width: 320px;
            text-align: center;
            margin-top: 120px;
          }
          .right-side :global(svg) {
            position: absolute;
            margin-left: -46px;
            margin-top: -8px;
          }
          .disclaimer {
            font-size: 14px;
            color: rgba(255,255,255,0.8);
            line-height: 23px;
            font-weight: 400;
            margin-top: 23px;
          }
        `}</style>
      </Page>
    )
  }
}