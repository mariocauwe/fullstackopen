import { useState } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Persons from './components/Persons'

const App = () => {
  console.log("rerender");
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const [newPerson, setNewPerson] = useState({name:'',phone:''})
  
  const [filter, setFilter] = useState('')
  
  const addPerson = (e) => {
    console.log("addPerson")
    e.preventDefault()
    if(newPerson.name.length===0) return
 
    if(persons.find(person => person.name===newPerson.name)) {
      console.log("addPerson", newPerson.name, "is already in the phonebook.")
      alert(`${newPerson.name} is already in the phonebook.`)
      return
    }
    setPersons(persons.concat({name: newPerson.name, number: newPerson.phone, id:persons.length+1}))
   // setFilteredPersons(persons.filter(person => {
 //     console.log("updating filteredpersons list");
   //   return person.name.toLowerCase().includes(filter.toLowerCase())
   //   }))
     // setFilteredPersons(persons)
    setNewPerson({name:'',phone:''})
  }

  const handleNameChange = (e) => {
    setNewPerson({name:e.target.value, phone:newPerson.phone})
  }
  const handlePhoneChange = (e) => {
    setNewPerson({name:newPerson.name, phone:e.target.value})
  }

  const search = (e) => {
    console.log("filter on", e.target.value)
    setFilter(e.target.value)
    setFilteredPersons(persons.filter(person => person.name.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} search={search} />
   
      <h2>Add new</h2>
      <NewPersonForm name={newPerson.name} phone={newPerson.phone} nameChange={handleNameChange} phoneChange={handlePhoneChange} onSubmit={addPerson}/>

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App