import "./message.scss"

export const Message = (props) => {
    const formatLineBreak = (message) => {
        return message
            .split(/\n/g)
            .map(str => <span>{str}<br/></span>)
    }

    return (
        <div className="message__wrapper">
            <div className={`message__item ${props.type === "incoming" ? "interlocutor-color" : ""}`}>
                {formatLineBreak(props.message)}
            </div>
        </div>
    )
}
