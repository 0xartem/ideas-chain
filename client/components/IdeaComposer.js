import React from 'react'
import { toast } from 'react-toastify'
import { createIdea } from '../web3/ideas'
import Button from './Button'

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

    let toastId = null

    try {
      toastId = toast.info("Your idea is being posted. This will take a couple of seconds...")

      await createIdea(text)

      toast.update(toastId, { 
        render: "Your idea has been posted!",
        type: toast.TYPE.SUCCESS,
        autoClose: 4000,
      })

      onClose()
    } catch (err) {
      toast.update(toastId, { 
        render: "Sorry, we couldn't post your idea!",
        type: toast.TYPE.ERROR,
        autoClose: 4000,
      })
    }
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