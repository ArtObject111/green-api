import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.green-api.com/",
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

export const authAPI = {
    authUser (idInstance, apiTokenInstance) {
        return instance.get(`waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
            .then(response => {
                return response.data.stateInstance
            })
    },

    logout (idInstance, apiTokenInstance) {
        return instance.get(`waInstance${idInstance}/logout/${apiTokenInstance}`)
            .then(response => {
                return console.log(response.data)
            })
    }
}

export const messageAPI = {
    sendMessage (idInstance, apiTokenInstance, chatId, sentMessage) {
        return instance.post(`waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
            {"chatId": `${chatId}@c.us`,
                "message": `${sentMessage}`}
        ).then(response => {
            return response.data
        })
    },

    receiveNotification (idInstance, apiTokenInstance) {
        return instance.get(`waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
            .then(response => {
                return response.data
            })
    },

    deleteNotification (idInstance, apiTokenInstance, receiptId) {
        return instance.delete(`waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`)
            .then(response => {
                return response.data
            })
    },

    getChatHistory (idInstance, apiTokenInstance, chatId) {
        return instance.post(`waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
            {
                "chatId": `${chatId}@c.us`,
                "count": 100
            }
            )
            .then(response => {
                return response.data
            })
    }
}
