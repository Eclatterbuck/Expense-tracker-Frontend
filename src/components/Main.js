import { useEffect, useState, useRef } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props) {
	console.log(props)
	const [expense, setExpense] = useState([]);
	const getExpenseRef = useRef();

	const URL = "http://localhost:3001/expense/"
	// const URL = 'https://phoenix-api-app.herokuapp.com/people/';
	// retrieve all the people

	const getExpense = async () => {
		if(!props.user) return;
		const token = await props.user.getIdToken();
		console.log(token)
		const response = await fetch(URL, {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token
			}
		});

		const data = await response.json();
		
		setExpense(data);
	};
	
	
	const createExpense = async (expense) => {
		if(!props.user) return;
		const token = await props.user.getIdToken();
		console.log(expense)
		await fetch(URL, {
			method: 'POST',
			headers: { 
				'Content-Type': 'Application/json',
				'Authorization': 'Bearer ' + token 
			},
            body: JSON.stringify(expense)
		});
		getExpense()
	};


	const updateExpense = async (expense, id) => {
		if(!props.user) return;
		const token = await props.user.getIdToken();
		await fetch(URL + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'Application/json',
				'Authorization': 'Bearer ' + token
			},
			body: JSON.stringify(expense)
		});
		getExpense()
	}

	const deleteExpense = async (id) => {
		if(!props.user) return;
		const token = await props.user.getIdToken();
		await fetch(URL + id, {
			method: 'DELETE',
			headers: {
				'Authorization': 'Bearer ' + token
			}
		});
	
		getExpense();
	};

	const handleLogout = () => {
		setExpense([]);
	}

	// run getPeople once when component is mounted

	useEffect(() => {
		getExpenseRef.current = getExpense;
	})

	useEffect(() => {
	
		if(props.user) {
			getExpense() 
		} else {
			handleLogout()
		}

	}, [props.user]);

	return (
		<main>
			<Switch>
				<Route exact path='/'>
					<Index user={props.user} expense={expense} createExpense={createExpense} />
				</Route>

				<Route path='/expense/:id' render={(rp) => (
					props.user ?
					<Show 
						{...rp}
						updateExpense={updateExpense}
						deleteExpense={deleteExpense}
						expense={expense} 
					/>
					:
					<Redirect to="/" />
				)} />
			</Switch>
			{/* <Switch>
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
			</Switch> */}
		</main>
	);
}

export default Main;