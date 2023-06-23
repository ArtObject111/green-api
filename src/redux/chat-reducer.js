import {messageAPI} from "../api/api";

const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT"
const TOGGLE_IS_FETCHING      = "TOGGLE-IS-FETCHING"
const SEND_MESSAGE            = "SEND-MESSAGE"
const DISPLAY_CHAT_HISTORY    = "DISPLAY-CHAT-HISTORY"
const RECEIVE_NOTIFICATION    = "RECEIVE-NOTIFICATION"

let initialState = {
    messagesData:   [],
    newMessageText: JSON.parse(localStorage.getItem("newMessageText")) || "",
    isFetching:     false
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                idMessage: action.idMessage,
                type: "outgoing",
                textMessage: action.sentMessage,
            };
            localStorage.setItem("newMessageText", JSON.stringify(""))
         return {
             ...state,
             newMessageText: "",
             messagesData: [...state.messagesData, newMessage]
         }
        case DISPLAY_CHAT_HISTORY:
            const messagesData = []
            const messagesArrayApi = [...action.messagesArray].filter(message => message.typeMessage === "textMessage"
                || message.typeMessage === "extendedTextMessage" )
            messagesArrayApi.forEach(message => {
                {
                    messagesData.push({
                        idMessage:   message.idMessage,
                        type:        message.type,
                        textMessage: message.textMessage
                    })
                }
                })
             return {
                 ...state,
                 messagesData: messagesData.reverse()
            }
        case RECEIVE_NOTIFICATION:
            let incomingMessage = {
                idMessage:   action.idMessage,
                type:        "incoming",
                textMessage: action.textMessage
            };
            console.log("message is added")
            return {
                ...state,
                messagesData: [...state.messagesData, incomingMessage],
                receiptId:    action.receiptId
            }
        case UPDATE_NEW_MESSAGE_TEXT:
            localStorage.setItem("newMessageText", JSON.stringify(action.newText))
            return  {
                ...state,
                newMessageText: action.newText
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export const updateNewMessageTextAC = (messageText) => ({type: UPDATE_NEW_MESSAGE_TEXT, newText: messageText})
export const toggleIsFetching       = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const sendMessageAC          = (idMessage, sentMessage) => ({type: SEND_MESSAGE, idMessage, sentMessage})
export const receiveNotificationAC  = (idMessage, textMessage, typeMessage) =>
    ({type: RECEIVE_NOTIFICATION, idMessage, textMessage, typeMessage})
export const displayChatHistoryAC   = (messagesArray) => ({type: DISPLAY_CHAT_HISTORY, messagesArray})

export const sendMessageTC = (sentMessage, idInstance, apiTokenInstance, chatId) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        messageAPI.sendMessage(idInstance, apiTokenInstance, chatId, sentMessage)
            .then(data => {
                dispatch(sendMessageAC(data.idMessage, sentMessage))
                console.log("message is sent")
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                dispatch(toggleIsFetching(false))
            })
    }
}

export const checkIncomingMessageTC = (idInstance, apiTokenInstance, chatId) => {
    return (dispatch) => {
        messageAPI.receiveNotification(idInstance, apiTokenInstance)
            .then(data => {
                console.log(data)
                if (!!data) {
                    const receiptId   = data.receiptId
                    const notifyBody  = data.body

                    messageAPI.deleteNotification(idInstance, apiTokenInstance, receiptId)
                        .then(data => {
                            console.log(data)
                            if (data.result === true &&
                            (!!notifyBody.messageData && notifyBody.senderData.chatId === `${chatId}@c.us`)){
                                const idMessage   = notifyBody.idMessage
                                const textMessage = notifyBody.messageData.textMessageData.textMessage
                                const typeMessage = notifyBody.messageData.typeMessage

                                dispatch(receiveNotificationAC(idMessage, textMessage, typeMessage))
                            }
                        })
                        .finally(() => console.log("notification is deleted"))
                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getChatHistoryTC = (idInstance, apiTokenInstance, chatId) => {
    return (dispatch) => {
        messageAPI.getChatHistory(idInstance, apiTokenInstance, chatId)
            .then(data => {
                console.log(data)
                dispatch(displayChatHistoryAC(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default chatReducer
