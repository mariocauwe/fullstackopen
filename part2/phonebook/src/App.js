import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Persons from './components/Persons'
import  DbService from './services/dbService' 

const App = () => {
  console.log("re-render");

  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newPerson, setNewPerson] = useState({name:'',number:''})
  
  const [filter, setFilter] = useState('')


  const reloadPeople = () => {
    console.log("loading people from db with axios");
    DbService.loadPeople().then( response => {
        console.log("db called returned", response);
        setPersons(response)
        setFilteredPersons(response)
      } )
    }

  const addPerson = (e) => {
    console.log("addPerson")
    e.preventDefault()
    if(newPerson.name.length===0) return
 
    var p = persons.find(person => person.name===newPerson.name)
    if(p!==undefined) {
      if(window.confirm(`${newPerson.name} is already in the phonebook. Replace the old number?`)) {
        DbService.updateNumber({...p, number:newPerson.number})
      }
      return
    }
    DbService.savePerson(newPerson)
      .then(response => {
        console.log(response);
        setPersons(persons.concat(newPerson))
      }
      )
    setNewPerson({name:'',number:''})
  }

  const handleNameChange = (e) => {
    setNewPerson({name:e.target.value, number:newPerson.phone})
  }
  const handlePhoneChange = (e) => {
    setNewPerson({name:newPerson.name, number:e.target.value})
  }

  const search = (e) => {
    console.log("filter on", e.target.value)
    setFilter(e.target.value)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const removePerson = (e) => {
    console.log("removePerson execution",e.target.value)
    const p = filteredPersons.find(person => person.id==e.target.value)
    if(p!==undefined && window.confirm(`Are you sure te remove ${p.name}?`)) {
      console.log("Ok to delete person")
      DbService.removePerson(e.target.value)
    }
  }

  useEffect( reloadPeople ,[])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} search={search} />
   
      <h2>Add new</h2>
      <NewPersonForm name={newPerson.name} phone={newPerson.phone} nameChange={handleNameChange} phoneChange={handlePhoneChange} onSubmit={addPerson}/>

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} removePerson={removePerson}/>
    </div>
  )
}

export default App