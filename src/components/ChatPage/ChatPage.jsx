import React, {
    useEffect,
    useRef}      from "react";

import "./chat-page.scss"
import {Message} from "./Message/Message";

export const ChatPage = (props) => {
    const scrollPoint                             = useRef(null)
    const newTextElement                          = React.createRef();

    const {currentLoginText,
        currentPasswordText,
        currentNumber}                            = props

    const onUpdateText = () => {
        let messageText = newTextElement.current.value
        props.updateNewMessageText(messageText)
    }

    const sendMessage = (e) => {
        if (e.key === "Enter" || !e.key) {
            props.sendMessage(props.newMessageText.replace(/\n$/, ""), //deleting '\n' in the end of the str
                currentLoginText,
                currentPasswordText,
                currentNumber)
         }
    }

    const logout = () => {
        props.logoutUser(currentLoginText, currentPasswordText)
    }

    const scrollToBottom = () => {
        scrollPoint.current?.scrollIntoView({block: "end", inline: "nearest"})
    }

    const messageElements = props.messages.map(
            (message) => <Message
                    key     ={message.idMessage}
                    type    ={message.type}
                    message ={message.textMessage}/>
        )

    useEffect(() => {
        scrollToBottom()
    })

    return (
        <div className="chat-page">
            <div className="chat-page__wrapper">
                <div className="chat-page__field">
                        {messageElements}
                        <div ref={scrollPoint}></div>
                </div>
                <div className="chat-page__footer">
                    <textarea className   = "chat-page__input"
                          placeholder = {"Enter your message"}
                          onChange    = {onUpdateText}
                          value       = {props.newMessageText}
                          ref         = {newTextElement}
                          onKeyDown   = {(e) => !e.shiftKey && sendMessage(e)}
                    />
                    <div className="buttons-wrapper">
                            <button className="buttons-wrapper__logout"
                                    onClick={logout}
                            >
                                Exit
                            </button>
                        <button className = "buttons-wrapper__send"
                                onClick   = {sendMessage}
                                disabled  = {props.isFetching || props.newMessageText === ""}
                        >Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
