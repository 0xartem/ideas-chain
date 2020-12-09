import React from 'react'
import { withRouter } from 'next/router'

import { Page, Center } from '../components/Layout'
import Avatar from '../components/Avatar'

import { getUserIdFromUsername, getUserInfo, } from '../web3/users'
import { getIdea, getIdeaIdsFromUser } from '../web3/ideas'

const AVATAR_SIZE = 113

class ProfilePage extends React.Component {
  state = {
    profile: {},
  }

  async componentDidMount() {
    const { router } = this.props
    const userId = await getUserIdFromUsername(router.query.u)

    this.loadProfile(userId)
    this.loadIdeas(userId)
  }

  loadProfile = async (userId) => {
    const profile = await getUserInfo(userId)

    this.setState({
      profile,
    })
  }

  loadIdeas = async (userId) => {
    // Fetch the IDs:
    const ideaIds = await getIdeaIdsFromUser(userId)

    // Fetch the idea info for every idea ID:
    const ideaPromises = ideaIds.map(ideaId => {
      return getIdea(ideaId)
    })

    const ideas = await Promise.all(ideaPromises)

    console.log(ideas)
  }

  render() {
    const { profile } = this.state
    const { username, firstName, lastName, bio, gravatarEmail } = profile

    return (
      <Page>
        <Center style={{
          maxWidth: 560, 
        }}>
          {username && (
            <div className="profile-top">
              <div className="info">
                <h1>
                  {firstName} {lastName}
                </h1>
                <p className="username">
                  @{username}
                </p>
                <p className="desc">
                  {bio}
                </p>
              </div>
              <Avatar 
                size={AVATAR_SIZE} 
                email={gravatarEmail}
              />
            </div>
          )}

        </Center>

        <style jsx>{`
          .profile-top {
            margin: 40px 0;
          }
          .info {
            display: inline-block;
            width: calc(100% - ${AVATAR_SIZE}px);
            vertical-align: top;
          }
          h1 {
            font-size: 30px;
            font-weight: 500;
          }
          .username {
            font-size: 17px;
            font-weight: 400;
            margin: 7px 0;
          }
          .desc {
            font-size: 19px;
            font-weight: 400;
            margin-top: 22px;
          }

          h2 {
            font-size: 18px;
            font-weight: 600;
            margin-top: 70px;
          }
        `}</style>

      </Page>
    )
  }
}

export default withRouter(ProfilePage)