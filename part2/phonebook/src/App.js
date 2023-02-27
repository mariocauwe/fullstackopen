import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Persons from './components/Persons'
import  DbService from './services/dbService' 
import Status from './components/Status'

import './style.css'

const App = () => {
  console.log("re-render");

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newPerson, setNewPerson] = useState({name:'',number:''})
  
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({message:null,isError:false})
 
  const ADDSUCCESS = " added successfully"
  const ADDFAIL = " add failed"
  const UPDATESUCCESS = " updated successfully"
  const UPDATEFAIL = " update failed"
  const REMOVESUCCESS = " removed successfully"
  const REMOVEFAIL = " remove failed"

  const updateNotification = (message,isError) => {
    setNotification({message,isError})
    setTimeout( () => setNotification({message:null,isError:false}),10000)
  }

  const reloadPeople = () => {
    console.log("reloadPeople from db")
    DbService.loadPeople().then( response => {
        console.log("reloadPeople db called returned", response);
        setPersons(response)
        if(filter){
          console.log("Filter on reload'",filter,"'");
          setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())))
         } else
          setFilteredPersons(persons)
      } )
    }

  const addPerson = (e) => {
    console.log("addPerson")
    e.preventDefault()
    if(newPerson.name.length===0) return
 
    var p = persons.find(person => person.name===newPerson.name)
    if(p) {
      if(window.confirm(`${newPerson.name} is already in the phonebook. Replace the old number?`)) {
      DbService.updateNumber({...p, number:newPerson.number})
      .then(response => {
          console.log("response from update",response)
          updateNotification(newPerson.name + UPDATESUCCESS,false)
          reloadPeople()
        })
      .catch( error => {
            updateNotification(newPerson.name + UPDATEFAIL,true)
      })
      }
    }
    else {
      DbService.savePerson(newPerson)
        .then(response => {
          updateNotification(newPerson.name + ADDSUCCESS,false)
          reloadPeople()
        })
        .catch(error => {
          updateNotification(newPerson.name + ADDFAIL,true)
      })
    }
    setNewPerson({name:'',number:''})
  }

  const removePerson = (e) => {
    console.log("removePerson execution",e.target.value)
    const p = filteredPersons.find(person => person.id===Number(e.target.value))
    if(p && window.confirm(`Are you sure te remove ${p.name}?`)) {
      console.log("Ok to delete person")
      DbService.removePerson(e.target.value)
        .then(response => {
          console.log("app then remove", response)
          updateNotification(p.name + REMOVESUCCESS,false)
          reloadPeople()
        })
        .catch(error => {   
          console.log("app catch remove", error)
          updateNotification(p.name + REMOVEFAIL,true)
        })
    }
  }

  const search = (e) => {
    console.log("filter on", e.target.value)
    setFilter(e.target.value)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleNameChange = (e) => {
    setNewPerson({name:e.target.value, number:newPerson.number})
  }
  const handlePhoneChange = (e) => {
    setNewPerson({name:newPerson.name, number:e.target.value})
  }
  console.log("Before calling reload effect", filteredPersons)

  useEffect( reloadPeople ,[filter, persons])
  console.log("after calling reload effect", filteredPersons)

  return (
    <div>
      <Status message={notification.message} isError={notification.isError} />
      <h2>Phonebook</h2>
      <Filter filter={filter} search={search} />
   
      <h2>Add new</h2>
      <NewPersonForm name={newPerson.name} phone={newPerson.number} nameChange={handleNameChange} phoneChange={handlePhoneChange} onSubmit={addPerson}/>

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} removePerson={removePerson}/>
    </div>
  )
}

export default App