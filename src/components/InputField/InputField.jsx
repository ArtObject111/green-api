import React     from "react";
import PropTypes from "prop-types"

export const InputField = ({
    label,
    inputValue,
    handleFunction }) => {

    return (
        <>
            <label>{label}:</label>
            <input
                type         = "text"
                value        = {inputValue}
                onChange     = {handleFunction}
            />
        </>
    )
}

InputField.propTypes = {
    label:          PropTypes.string,
    inputValue:     PropTypes.string,
    handleFunction: PropTypes.func.isRequired
}
