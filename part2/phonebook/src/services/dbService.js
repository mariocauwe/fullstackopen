import axios from 'axios'

const localServer = "http://localhost:3001/persons"

const savePerson = newPerson => {
    console.log("dbService.addPerson");
    return axios.post(localServer,newPerson)
        .then(response => {
            console.log("Add person",response)
            return response.data
        })
        .catch(error => {
            console.log('saving to db failed')
            throw new Error(error)
        })
        
}
const updateNumber= updatePerson => {
    console.log("dbService.updateNumber",updatePerson);
    return axios
        .put(`${localServer}/${updatePerson.id}`,updatePerson)
        .then(response => {
            console.log("Update number",response)
            return response.data
        })
        .catch(error => {
            console.log('saving to db failed',error)
            throw new Error(error.data)
        })
}
const loadPeople = () => {
    console.log("dbService.loadPeople");
    return axios.get(localServer)
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
        .delete(`${localServer}/${personId}`)
        .then(response => {
            console.log("deleted", personId)
            return personId
        })
        .catch(error => {
            console.log("delete failed", error)
            throw new Error(personId)
        })
}

export default {savePerson, loadPeople,removePerson,updateNumber} 