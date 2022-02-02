import { useState } from 'react';
import { Link } from 'react-router-dom';


const Index = ({ people, createPeople, user }) => {

    const [ newForm, setNewForm ] = useState({
        name: '',
        image: '',
        title: ''
    })

    const handleChange = (e) => {
        setNewForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        if(!user) return;
        e.preventDefault();
        createPeople(newForm);
        setNewForm({
            name: '',
            image: '',
            title: ''
        })
    }

    const loaded = () => {
        return people.map(person => (
            <div className='person' key={person._id}>
                <Link to={`/people/${person._id}`} >
                    <h1>{person.name}</h1>
                </Link>
                <img style={{height: '10rem', width: '20rem'}} src={person.image} alt={person.name} />
                <h3>{person.title}</h3>
            </div>
        ))
    }

    const loading = () => (<h1>Loading...</h1>)

    return (
        <section>
            <form onSubmit={handleSubmit} id="createPersonForm">
                <input 
                    type="text" 
                    value={newForm.name}
                    name='name'
                    placeholder='name'
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    value={newForm.image}
                    name='image'
                    placeholder='image'
                    onChange={handleChange}
                />
                <input 
                    className='titleField'
                    type="text" 
                    value={newForm.title}
                    name='title'
                    placeholder='title'
                    onChange={handleChange}
                />
                <input disabled={!user} type="submit" value='Create Person' className='submitBtn' />
            </form>
            <div id='peopleContainer'>
                {people ? loaded() : loading()}    
            </div>    
        </section>
    )
}



export default Index