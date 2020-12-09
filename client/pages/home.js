import React from 'react'
import { Page, Center } from "../components/Layout"
import { getLatestIdeaIds, getIdea, loadIdeasWithUsers } from '../web3/ideas'

import IdeaList from '../components/IdeaList'

export default class HomePage extends React.Component {
  state = { 
    ideas: [],
  }

  componentDidMount() {
    this.loadLatestIdeas()
  }

  loadLatestIdeas = async () => {
    const ideaIds = await getLatestIdeaIds()

    const ideaPromises = ideaIds.map(ideaId => {
      return getIdea(ideaId)
    })

    const rawIdeas = await Promise.all(ideaPromises)
    const ideas = await loadIdeasWithUsers(rawIdeas)

    this.setState({
      ideas,
    })
  }

  render() {
    const { ideas } = this.state

    return (
      <Page>
        <Center>
          <h2>
            Latest ideas
          </h2>

          <IdeaList ideas={ideas} />
        </Center>

        <style jsx>{`
          h2 {
            font-size: 16px;
            color: rgba(84,83,98,0.64);
            letter-spacing: 0.5px;
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 16px;
            margin-top: 20px;
          }
        `}</style>
      </Page>
    )
  }
}