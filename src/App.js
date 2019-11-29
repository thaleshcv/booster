import React, { useReducer, useEffect } from 'react';
import {
	BrowserRouter,
	Link as RouterLink,
	Redirect,
	Route,
	Switch
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header';
import UserAvatar from './components/UserAvatar';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import MoviePage from './pages/Movie';
import RegisterPage from './pages/Register';
import FavoritesPage from './pages/Favorites';

import { logoutUser } from './lib/auth';
import { getUserFavorites } from './lib/favorites';

import reducer, { actions } from './reducer';
import './App.css';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		boxSizing: 'border-box',
		padding: theme.spacing(1, 0)
	}
}));

function App({ currentUser }) {
	const classes = useStyles();

	const [state, dispatch] = useReducer(reducer, {
		favorites: []
	});

	useEffect(() => {
		if (currentUser) {
			getUserFavorites().then(payload => {
				dispatch({
					type: actions.ADD_FAVORITES,
					payload
				});
			});
		}
	}, [currentUser]);

	console.log('App State', state);

	return (
		<BrowserRouter>
			<Header>
				<Button component={RouterLink} to='/' color='inherit'>
					Home
				</Button>
				<Button component={RouterLink} to='/favorites' color='inherit'>
					Favorites
				</Button>
				{currentUser ? (
					<UserAvatar user={currentUser} onLogout={() => logoutUser()} />
				) : (
					<Button component={RouterLink} to='/login' color='inherit'>
						Login
					</Button>
				)}
			</Header>
			<Container className={classes.root} maxWidth='lg'>
				<Paper className={classes.paper}>
					<Switch>
						<Route path='/' exact>
							<HomePage />
						</Route>
						<Route path='/favorites'>
							<FavoritesPage dispatch={dispatch} favorites={state.favorites} />
						</Route>
						<Route path='/login'>
							{() => (currentUser ? <Redirect to='/' /> : <LoginPage />)}
						</Route>
						<Route path='/register'>
							{() => (currentUser ? <Redirect to='/' /> : <RegisterPage />)}
						</Route>
						<Route path='/movies/:movieId'>
							{({ match }) => {
								const favorite = state.favorites.find(
									fav => String(fav.movieId) === String(match.params.movieId)
								);

								return (
									<MoviePage
										movieId={match.params.movieId}
										favoriteId={favorite ? favorite.id : null}
										dispatch={dispatch}
									/>
								);
							}}
						</Route>
					</Switch>
				</Paper>
			</Container>
		</BrowserRouter>
	);
}

export default App;
