const Filter = (props) => {
    return (
        <div>
            <label htmlFor="filter">filter: </label><input id="filter" value={props.filter} onChange={props.search}/>
        </div>
    )
}

export default Filter