import React from 'react'
import Link from "next/link"
import { Center } from "./Layout"
import Nav from "./Nav"
import Modal from "./Modal"
import Logotype from "../icons/ideas-chain-logo.svg"
import IdeaComposer from "./IdeaComposer"

import { getLoggedInUserId, getUserInfo } from "../web3/users"

export default class Header extends React.Component {

  state = {
    loggedIn: false,
    userInfo: {},
    showComposeModal: false
  }

  toggleComposeModal = () => {
    const { showComposeModal } = this.state

    this.setState({
      showComposeModal: !showComposeModal,
    })
  }

  async componentDidMount() {

    try {
      const userId = await getLoggedInUserId()
      const userInfo = await getUserInfo(userId)
      console.log("Logged in as", userInfo)

      this.setState({
        loggedIn: true,
        userInfo,
      })
    } catch (err) {
      console.error("Couldn't find logged in user", err)
    }

  }

  render() {
    const { loggedIn, userInfo, showComposeModal } = this.state

    return (
      <header>
        <Center>
          <Link href="/">
            <a className="logotype">
              <Logotype />
            </a>
          </Link>
          <nav>
            {loggedIn && (
              <Nav
                userInfo={userInfo}
                toggleComposeModal={this.toggleComposeModal}
              />
            )}
          </nav>
        </Center>

        {showComposeModal && (
          <Modal
            onClose={this.toggleComposeModal}
          >
            Create an idea!
            <IdeaComposer onClose={this.toggleComposeModal} />
          </Modal>
        )}

        <style jsx>{`
          header {
            background-color: #FFFFFF;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.14);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }
        `}</style>
      </header>
    )
  }
}