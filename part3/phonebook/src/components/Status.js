const Status = (props) => {
    const className = props.isError?"notificationError":"notificationOk"
    console.log("Status", props)
    if(props.message!==null) {
        console.log("props.message not null", props.message);
        return <div className={className}>{props.message}</div>
    }
    else return null
}

export default Status