import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
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
			<Navbar />
			<Switch>
				<PrivateRoute exact path="/">
					<Home />
				</PrivateRoute>
				<Route exact path="/books">
					<Books />
				</Route>
				<Route exact path="/books/:id">
					<BookDetails />
				</Route>
				<PrivateRoute exact path="/edit/:id">
					<EditDetails />
				</PrivateRoute>
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
