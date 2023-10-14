
import DeleteButton from '../components/DeleteButton'

const Persons = (props) => {
    console.log("Persons Component", props)
    return (
        <ul>
             { props.filteredPersons.map(person => 
             <li key={person.id}>{person.name} {person.number} <DeleteButton onClick={props.removePerson} personId={person.id}>Remove</DeleteButton></li>
             ) }
        </ul>
    )
}

export default Persons