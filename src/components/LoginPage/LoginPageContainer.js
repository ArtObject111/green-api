import React                       from "react";
import {compose}                   from "redux";
import {connect}                   from "react-redux";
import {Navigate}                  from "react-router-dom";

import {LoginPage}                 from "./LoginPage";
import {
    loginUserTC,
    updateCurrentLoginTextAC,
    updateCurrentNumberAC,
    updateCurrentPasswordTextAC
}                                  from "../../redux/auth-reducer";

class LoginPageContainer extends React.Component {

    render() {

        if (!!this.props.isAuthorized) {
            return (
                <Navigate to = {"/chat"}/>
            )
        }

        return (
            <LoginPage
                currentLoginText          = {this.props.currentLoginText}
                currentPasswordText       = {this.props.currentPasswordText}
                currentNumber             = {this.props.currentNumber}
                isAuth                    = {this.props.isAuth}
                isFetching                = {this.props.isFetching}
                updateCurrentLoginText    = {this.props.updateCurrentLoginTextAC}
                updateCurrentPasswordText = {this.props.updateCurrentPasswordTextAC}
                updateCurrentNumber       = {this.props.updateCurrentNumberAC}
                loginUser                 = {this.props.loginUser}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    currentLoginText:    state.auth.currentLoginText,
    currentPasswordText: state.auth.currentPasswordText,
    currentNumber:       state.auth.currentNumber,
    isAuthorized:        state.auth.isAuthorized,
    isFetching:          state.auth.isFetching
})

export default compose(
    connect(
        mapStateToProps,
        {
        updateCurrentLoginTextAC,
        updateCurrentPasswordTextAC,
        updateCurrentNumberAC,
        loginUser: loginUserTC
    })
)(LoginPageContainer)
