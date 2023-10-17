import axios from 'axios'

//const server = "http://localhost:3001"
const server = "https://phonebook-xutl.onrender.com"
const infoURL = "/info"
const baseURL = server + "/api/persons"

const savePerson = newPerson => {
    console.log("dbService.addPerson");
    return axios.post(baseURL,newPerson)
        .then(response => {
            console.log("Add person",response)
            return response.data
        })
        .catch(error => {
            let str = error.response.data.content
            console.log('dbservice.savePerson, saving to db failed',str)
            throw new Error(str)
        })       
}
const updateNumber= updatePerson => {
    console.log("dbService.updateNumber",updatePerson);
    return axios
        .put(`${baseURL}/${updatePerson.id}`,updatePerson)
        .then(response => {
            console.log("Update number",response)
            return response.data
        })
        .catch(error => {
            let str = error.response.data.content
            console.log('updateNumber, saving to db failed',str)
            throw new Error(str)
        })
}
const loadPeople = () => {
    console.log("dbService.loadPeople");
    return axios.get(baseURL)
        .then(response => {
             console.log(response)
            return response.data
        })
        .catch(error => {
            console.log('loading people from db failed')
            throw new Error(error.data)
         })
}

const removePerson = personId => {
    console.log("dbService.removePerson", personId);
    return axios
        .delete(`${baseURL}/${personId}`)
        .then(response => {
            console.log("deleted", personId)
            return personId
        })
        .catch(error => {
            console.log("delete failed", error)
            throw new Error(personId)
        })
}

const getInfo = () => {
    console.log("dbService.getInfo")
    return axios.get(`${infoURL}`)
        .then(response => {
            console.log(response)
            return response;
        })        
        .catch(error => {
            console.log("count retrieval faild failed", error)
            throw new Error(error.data)
        })
}
export default {savePerson, loadPeople,removePerson,updateNumber, getInfo} 