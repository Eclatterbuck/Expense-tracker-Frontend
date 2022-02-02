import { useState } from "react"

const Show = (props) => {
    const person = props.people.find(person => person._id === props.match.params.id)

    const [ editForm, setEditForm ] = useState(person);

    const handleChange = (e) => {
         setEditForm((prevState) => ({
             ...prevState,
             [e.target.name]: e.target.value
         }))   
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updatePerson(editForm, person._id);
        
        // Then redirect them back to the main dashboard page
        props.history.push('/people')
    }

    const handleDelete = (e) => {
        props.deletePerson(person._id);
        props.history.push('/people');
    }

    return (
        <div className="personDetails">
            <h1>{person.name}</h1>
            <img src={person.image} alt={person.name} />
            <h3>{person.title}</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name='name'
                    placeholder={editForm.name}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name='image'
                    placeholder={editForm.image}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    name='title'
                    placeholder={editForm.title}
                    onChange={handleChange}
                />
                <input type="submit" value="Update Person"/>
            </form>
            <form onSubmit={handleDelete}>
                <input type="submit" value="Delete Person"/>
            </form>
        </div>

    )
}

export default Show