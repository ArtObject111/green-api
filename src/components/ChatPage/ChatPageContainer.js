import React                from "react";
import {compose}            from "redux";
import {connect}            from "react-redux";
import {Navigate}           from "react-router-dom";

import {
    checkIncomingMessageTC, getChatHistoryTC,
    sendMessageTC,
    updateNewMessageTextAC
}                           from "../../redux/chat-reducer";
import {ChatPage}           from "./ChatPage";
import {logoutUserTC}       from "../../redux/auth-reducer";

class ChatPageContainer extends React.Component {

    state = {
        getRequests: null
    }

    componentDidMount() {

        const {currentLoginText,
            currentPasswordText,
            currentNumber}       = this.props

        this.props.getChatHistory(currentLoginText, currentPasswordText, currentNumber)

        this.setState({
            getRequests: setInterval(() =>
                this.props.checkIncomingMessage(currentLoginText, currentPasswordText, currentNumber), 5000)
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isAuthorized !== this.props.isAuthorized) {
            clearInterval(this.state.getRequests)
            console.log(this.state.getRequests)
        }
    }

    render() {

        if (!this.props.isAuthorized) {
            return (<Navigate to={"/login"}/>)
        }

        return (
                <ChatPage
                    messages             = {this.props.messages}
                    newMessageText       = {this.props.newMessageText}
                    currentLoginText     = {this.props.currentLoginText}
                    currentPasswordText  = {this.props.currentPasswordText}
                    currentNumber        = {this.props.currentNumber}
                    isFetching           = {this.props.isFetching}
                    updateNewMessageText = {this.props.updateNewMessageTextAC}
                    sendMessage          = {this.props.sendMessageTC}
                    scrollToEnd          = {this.scrollToEnd}
                    logoutUser           = {this.props.logoutUser}
                />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentLoginText:    state.auth.currentLoginText,
        currentPasswordText: state.auth.currentPasswordText,
        currentNumber:       state.auth.currentNumber,
        isAuthorized:        state.auth.isAuthorized,
        messages:            state.chat.messagesData,
        newMessageText:      state.chat.newMessageText,
        isFetching:          state.chat.isFetching,

    }
}

export default compose(
    connect(mapStateToProps, {
        updateNewMessageTextAC,
        sendMessageTC:         sendMessageTC,
        checkIncomingMessage : checkIncomingMessageTC,
        getChatHistory:        getChatHistoryTC,
        logoutUser:            logoutUserTC
    }))(ChatPageContainer)
