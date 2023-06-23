import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware                                 from "redux-thunk";

import chatReducer                                     from "./chat-reducer";
import authReducer                                     from "./auth-reducer";

let reducers = combineReducers({
    chat: chatReducer,
    auth: authReducer
})

let store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
)

window.store = store

export default store
