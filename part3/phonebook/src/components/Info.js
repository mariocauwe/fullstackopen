const Info = ({amount}) => {
    console.log("Info - count")
    return (
        <div>
            There are {amount} entries in the phonebook at {new Date()}
        </div>
    )
}

export default Info