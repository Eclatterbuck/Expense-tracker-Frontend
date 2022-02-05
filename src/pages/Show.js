import { useState } from 'react';

function Show(props) {
	const id = props.match.params.id;
	const expense = props.expense.find(p => p._id === id);

	const [ editForm, setEditForm ] = useState(expense);

	const handleChange = (event) => {
		setEditForm({
			...editForm,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		props.updateExpense(editForm, id);
		props.history.push('/');
	}

	const handleClick = () => {
		props.deleteExpense(id);
		props.history.push('/');
	}

	return (
		<div className="expense">
			<h1>{expense.name}</h1>
			<h2>{expense.title}</h2>
			{
				expense.image && <img src={expense.image} alt={expense.name} />
			}
			<button id="delete" onClick={handleClick}>
				DELETE
			</button>
			<form onSubmit={handleSubmit}>
				<input 
					type="text" 
					name="name" 
					placeholder="Name"
					value={editForm.name}
					onChange={handleChange} 
				/>
				<br />
				<input 
					type="text" 
					name="image" 
					placeholder="Image URL"
					value={editForm.image}
					onChange={handleChange}
				/>
				<br />
				<input 
					type="number" 
					// min="1"
					// step="any"//for use of cents and decimals
					name="amount" 
					placeholder="Amount"
					value={editForm.amount}
					onChange={handleChange}
				/>
				<br />
				<input type="submit" value="Update Expense" />
			</form>
		</div>
	);
}

export default Show;