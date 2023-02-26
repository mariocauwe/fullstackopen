const Error = (error => {
    console.log("Error comp",error);
    if(error && error.length) return <div>{error}</div>
    else return null
})

export default Error