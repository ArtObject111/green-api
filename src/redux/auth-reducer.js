import {authAPI} from "../api/api";

const LOGIN_USER                   = "LOGIN-USER"
const TOGGLE_IS_FETCHING           = "TOGGLE-IS-FETCHING"
const UPDATE_CURRENT_LOGIN_TEXT    = "UPDATE-CURRENT-LOGIN-TEXT"
const UPDATE_CURRENT_PASSWORD_TEXT = "UPDATE-CURRENT-PASSWORD-TEXT"
const UPDATE_CURRENT_NUMBER        = "UPDATE-CURRENT-NUMBER"

let initialState = {
    isAuthorized:        JSON.parse(localStorage.getItem("isAuthorized")) || false,
    currentLoginText:    JSON.parse(localStorage.getItem("currentLoginText")) || "",
    currentPasswordText: JSON.parse(localStorage.getItem("currentPasswordText")) || "",
    currentNumber:       JSON.parse(localStorage.getItem("currentNumber")) || "",  // 79339967486
    isFetching:          false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_LOGIN_TEXT:
            localStorage.setItem("currentLoginText", JSON.stringify(action.loginText || ""))
            return {
                ...state,
                currentLoginText: action.loginText
            }
        case UPDATE_CURRENT_PASSWORD_TEXT:
            localStorage.setItem("currentPasswordText", JSON.stringify(action.passwordText || ""))
            return {
                ...state,
                currentPasswordText: action.passwordText
            }
        case UPDATE_CURRENT_NUMBER:
            localStorage.setItem("currentNumber", JSON.stringify(action.number || ""))
            return {
                ...state,
                currentNumber: action.number
            }
        case LOGIN_USER:
            localStorage.setItem("isAuthorized", JSON.stringify(action.isAuth))
            !action.isAuth && localStorage.setItem("currentLoginText", JSON.stringify( ""))
            !action.isAuth && localStorage.setItem("currentPasswordText", JSON.stringify(""))
            !action.isAuth && localStorage.setItem("currentNumber", JSON.stringify(""))
            return {
                ...state,
                isAuthorized:        action.isAuth,
                currentLoginText:    action.isAuth ? state.currentLoginText : "",
                currentPasswordText: action.isAuth ? state.currentPasswordText : "",
                currentNumber:       action.isAuth ? state.currentNumber : ""
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
                default:
           return state
    }
}

export const updateCurrentLoginTextAC    = (loginText) => ({type: UPDATE_CURRENT_LOGIN_TEXT, loginText})
export const updateCurrentPasswordTextAC = (passwordText) => ({type: UPDATE_CURRENT_PASSWORD_TEXT, passwordText})
export const updateCurrentNumberAC       = (number) => ({type: UPDATE_CURRENT_NUMBER, number})
export const loginUserAC                 = (idInstance,  apiTokenInstance, isAuth) => ({
    type: LOGIN_USER,
    isAuth,
    idInstance,
    apiTokenInstance
})
export const toggleIsFetching            = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const loginUserTC = (idInstance, apiTokenInstance) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        authAPI.authUser(idInstance, apiTokenInstance)
            .then((data) => {
                dispatch(loginUserAC(idInstance, apiTokenInstance, true))
                console.log(data)
            })
            .catch(() => {
                alert("Ooops :(")
            })
            .finally(() => {
                dispatch(toggleIsFetching(false))
            })
    }
}

export const logoutUserTC = (idInstance, apiTokenInstance) => {
    return dispatch => {
        dispatch(loginUserAC(idInstance, apiTokenInstance, false))
        // authAPI.logout(idInstance, apiTokenInstance)
        //     .then(() => {
        //         console.log("You are log out")}
        //     )
        //     .catch(error =>
        //         console.log(error)
        //     )
        //     .finally(() =>
        //         dispatch(toggleIsFetching(false))
        //     )
    }
}

export default authReducer
