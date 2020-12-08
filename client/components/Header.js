import React from 'react'
import Link from "next/link"
import { Center } from "./Layout"
import Nav from "./Nav"
import Logotype from "../icons/ideas-chain-logo.svg"

import { getLoggedInUserId, getUserInfo } from "../web3/users"
import getWeb3 from '../web3/get-web3'

export default class Header extends React.Component {

  state = {
    loggedIn: false,
    userInfo: {}
  }

  async componentDidMount() {

    try {
      const web3 = await getWeb3()
      const userId = await getLoggedInUserId(web3)
      const userInfo = await getUserInfo(web3, userId)
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
    const { loggedIn, userInfo } = this.state

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
              />
            )}
          </nav>
        </Center>

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