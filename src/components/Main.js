import { useEffect, useState, useRef } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
	const [people, setPeople] = useState([]);
	const getPeopleRef = useRef();

	const URL = "http://localhost:3001/people/"
	// const URL = 'https://phoenix-api-app.herokuapp.com/people/';
	// retrieve all the people

	const getPeople = async () => {
		if(!props.user) return;
		const token = await props.user.getIdToken();
		
		const response = await fetch(URL, {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token
			}
		});

		const data = await response.json();
		
		setPeople(data);
	};
	
	const createPeople = async (person) => {
		if(!props.user) return;
		const token = await props.user.getIdToken();
		
		await fetch(URL, {
			method: 'POST',
			headers: { 
				'Content-Type': 'Application/json',
				'Authorization': 'Bearer ' + token 
			},
            body: JSON.stringify(person)
		});
		getPeople()
	};


	const updatePeople = async (person, id) => {
		if(!props.user) return;
		const token = await props.user.getIdToken();
		await fetch(URL + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'Application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(person)
		});
		getPeople()
	}

	const deletePeople = async (id) => {
		if(!props.user) return;
		const token = await props.user.getIdToken();
		await fetch(URL + id, {
			method: 'DELETE',
			headers: {
				'Authorization': 'Bearer ' + token
			}
		});
	
		getPeople();
	};

	const handleLogout = () => {
		setPeople([]);
	}

	// run getPeople once when component is mounted

	useEffect(() => {
		getPeopleRef.current = getPeople;
	})

	useEffect(() => {
	
		if(props.user) {
			getPeopleRef.current();
		} else {
			handleLogout()
		}

	}, [props.user]);

	return (
		<main>
			<Switch>
				<Route exact path='/'>
					<Index user={props.user} people={people} createPeople={createPeople} />
				</Route>

				<Route path='/people/:id' render={(rp) => (
					props.user ?
					<Show 
						{...rp}
						updatePeople={updatePeople}
						deletePeople={deletePeople}
						people={people} 
					/>
					:
					<Redirect to="/" />
				)} />
			</Switch>
		</main>
	);
}

export default Main;