import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import BookDetails from './views/BookDetails';
import Books from './views/Books';
import EditDetails from './views/EditDetails';
import Home from './views/Home';
import Login from './views/Login';
import Profile from './views/Profile';
import Register from './views/Register';

const App = (props: AppProps) => {
	
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/books">
					<Books />
				</Route>
				<Route exact path="/books/:id">
					<BookDetails />
				</Route>
				<Route exact path="/edit/:id">
					<EditDetails />
				</Route>
				<PrivateRoute exact path="/profile">
					<Profile />
				</PrivateRoute>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/register">
					<Register />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

interface AppProps {}

export default App;
