import React, { useReducer, useEffect, Fragment } from 'react';
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

import ProtectedRoute from './components/ProtectedRoute';
import Flash from './components/Flash';
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
		favorites: [],
		flashes: []
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

	const handleFlashClose = () => {
		dispatch({
			type: actions.SHIFT_FLASH_MESSAGE
		});
	};

	const handleLogout = () => {
		logoutUser().then(() => {
			dispatch({
				type: actions.RESET_DATA
			});
		});
	};

	console.log('App State', state);

	return (
		<BrowserRouter>
			<Header>
				<Button component={RouterLink} to='/' color='inherit'>
					Home
				</Button>
				{currentUser ? (
					<Fragment>
						<Button component={RouterLink} to='/favorites' color='inherit'>
							Favorites
						</Button>
						<UserAvatar user={currentUser} onLogout={handleLogout} />
					</Fragment>
				) : (
					<Button component={RouterLink} to='/login' color='inherit'>
						Login
					</Button>
				)}
			</Header>
			<Container className={classes.root} maxWidth='lg'>
				<Flash open={state.flashes.length > 0} onClose={handleFlashClose}>
					{state.flashes[0]}
				</Flash>
				<Paper className={classes.paper}>
					<Switch>
						<Route path='/' exact>
							<HomePage />
						</Route>
						<ProtectedRoute
							path='/favorites'
							redirect={<Redirect to='/login' />}
							authorized={Boolean(currentUser)}>
							<FavoritesPage dispatch={dispatch} favorites={state.favorites} />
						</ProtectedRoute>
						<ProtectedRoute
							path='/login'
							redirect={<Redirect to='/' />}
							authorized={!currentUser}>
							<LoginPage />
						</ProtectedRoute>
						<ProtectedRoute
							path='/register'
							redirect={<Redirect to='/' />}
							authorized={!currentUser}>
							<RegisterPage />
						</ProtectedRoute>
						<Route path='/movies/:movieId'>
							{({ match }) => {
								const favorite = state.favorites.find(
									fav => String(fav.movieId) === match.params.movieId
								);
								return (
									<MoviePage
										currentUser={currentUser}
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
