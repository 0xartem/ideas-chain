import Idea from './Idea'

export default ({ ideas = [] }) => (
  <ul className="feed">
    {!ideas.length && <p>No ideas yet.</p>}

    {ideas.map(idea => <Idea key={idea.id} idea={idea} />)}

    <style jsx>{`
      .feed {
        background-color: white;
        border: 1px solid rgba(0,0,0,0.11);
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        border-radius: 3px;
        max-width: 560px;
        margin: 20px auto;
      }
      p {
        padding: 20px;
        text-align: center;
      }
    `}</style>
  </ul>
)