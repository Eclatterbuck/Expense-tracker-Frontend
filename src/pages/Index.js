import { useState } from 'react';
import { Link } from 'react-router-dom';

function Index(props) {
	const [newForm, setNewForm] = useState({
		name: '',
		image: '',
		amount: '',
	});

	const handleChange = (event) => {
		if(!props.user) return;
		setNewForm({
			...newForm,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		if(!props.user) return;
		event.preventDefault();
		props.createExpense(newForm);
		setNewForm({
			name: '',
			image: '',
			amount: '',
		});
	};

	// handleSubmit - will submit our new user for creation

	const loaded = () => {
		
		return props.expense.map((expense) => (
			
			<div key={expense._id} className='expense'>
				<Link to={`/expense/${expense._id}`}>
					<h1>{expense.name}</h1>
				</Link>
				{/* <img src={person.image} alt={person.name} /> */}
				<h3>{expense.title}</h3>
			</div>
		));
	};

	const loading = () => {
		return <h1>Loading</h1>;
	};

	  return (
			<section>
				<form style={{marginTop: '5rem'}} onSubmit={handleSubmit}>
					<input
						type='text'
						value={newForm.name}
						name='name'
						placeholder='expense name'
						onChange={handleChange}
					/>
					<br />
					<input
						type='text'
						value={newForm.image}
						name='image'
						placeholder='image URL'
						onChange={handleChange}
					/>
					<br />
					<input
						type='text'
						value={newForm.amount}
						name='amount'
						placeholder='amount'
						onChange={handleChange}
					/>
					<br />
					<input disabled={!props.user} type='submit' value='Create Expense' />
				</form>
				{props.expense.length > 0 ? loaded() : loading()}
			</section>
		);
}

export default Index;