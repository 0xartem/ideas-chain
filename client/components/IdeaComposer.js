import React from 'react'
import { createIdea } from '../web3/ideas'
import Button from './Button'
import getWeb3 from '../web3/get-web3'

export default class ComposeModal extends React.Component {
  state = {
    text: "",
  }

  handleChange = e => {
    this.setState({
      text: e.target.value,
    });
  }

  post = async () => {
    const { text } = this.state
    const { onClose } = this.props

    const web3 = await getWeb3();
    await createIdea(web3, text)

    alert("Your idea was posted!")

    onClose()
  }

  render() {
    const { onClose } = this.props
    const { text } = this.state

    const disabled = (text === "")

    return (
      <div>
        <h3>
          Post a new idea
        </h3>

        <textarea 
          value={text} 
          onChange={this.handleChange} 
          maxLength={140}
        />

        <Button 
          onClick={this.post} 
          disabled={disabled}
          style={{
            marginTop: 12,
            float: 'right',
          }}
        >
          Post idea
        </Button>

        <style jsx>{`
          textarea {
            box-sizing: border-box;
            margin: 0px;
            margin-top: 10px;
            border: 2px solid rgba(107,108,139,0.58);
            border-radius: 7px;
            width: 100%;
            padding: 11px;
            font-size: 16px;
          }
          textarea:focus {
            outline: none;
          }
        `}</style>
      </div>
    ) 
  }
}