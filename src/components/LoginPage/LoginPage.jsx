import React        from "react";

import "./login-page.scss"
import Preloader    from "../common/Preloader/Preloader";
import {InputField} from "../InputField/InputField";

export const LoginPage = (props) => {
    const {currentLoginText,
        currentPasswordText,
        currentNumber}                            = props

    const loginUser = () => {
        props.loginUser(currentLoginText, currentPasswordText)
    }

    const updateCurrentLoginText = (e) => {
        const id = e.currentTarget.value

        return props.updateCurrentLoginText(id)
    }

    const updateCurrentPasswordText = (e) => {
        const token = e.currentTarget.value

        return props.updateCurrentPasswordText(token)
    }

    const updateCurrentNumber = (e) => {
        const number = e.currentTarget.value

        return props.updateCurrentNumber(number)
    }

    return (
        <div className='auth-page'>
            {props.isFetching && <Preloader/>}
            {!props.isFetching && <div className='auth-page__content'>
                <InputField
                    label           = "Login (idInstance)"
                    inputValue      = {currentLoginText}
                    handleFunction  = {updateCurrentLoginText}
                />
                <InputField
                    label           = "Password (apiTokenInstance)"
                    inputValue      = {currentPasswordText}
                    handleFunction  = {updateCurrentPasswordText}
                />
                <InputField
                    label          = "Interlocutor Number"
                    inputValue     = {currentNumber}
                    handleFunction = {updateCurrentNumber}
                />
                <div className='auth-page__send-button'>
                    <button
                        onClick={loginUser}
                    >Login
                    </button>
                </div>
            </div>}
        </div>
    )
}
