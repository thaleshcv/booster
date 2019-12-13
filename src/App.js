import React, { useReducer, useEffect, Fragment, useCallback } from 'react';
import { Link as RouterLink, Redirect, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import ProtectedRoute from './components/ProtectedRoute';

// UI components
import Flash from './components/Flash';
import Header from './components/Header';
import UserMenu from './components/UserMenu';

// pages imports
import AccountPage from './components/Account';
import DiscoverPage from './components/Discover';
import LoginPage from './components/Login';
import FavoritesPage from './components/Favorites';
import MoviesPage from './components/Movies';
import RegisterPage from './components/User/Register';

import { logoutUser } from './lib/auth';
import { getUserFavorites } from './lib/favorites';

import reducer, { actions } from './reducer';
import './App.css';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		boxSizing: 'border-box',
		padding: theme.spacing(1, 0)
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between'
	}
}));

const HOME_PATH = '/discover';

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

	const findMovieFavorite = useCallback(
		movieId => state.favorites.find(fav => String(fav.movieId) === movieId),
		[state.favorites]
	);

	return (
		<Fragment>
			<Header className={classes.header}>
				<div>
					<Button component={RouterLink} to='/discover' color='inherit'>
						Discover
					</Button>
					{currentUser ? (
						<Fragment>
							<Button component={RouterLink} to='/favorites' color='inherit'>
								Favorites
							</Button>
							<UserMenu user={currentUser} onLogout={handleLogout} />
						</Fragment>
					) : (
						<Button component={RouterLink} to='/login' color='inherit'>
							Login
						</Button>
					)}
				</div>
			</Header>
			<Container className={classes.root} maxWidth='lg'>
				<Flash open={state.flashes.length > 0} onClose={handleFlashClose}>
					{state.flashes[0]}
				</Flash>
				<Paper>
					<Switch>
						<Route path='/discover'>
							<DiscoverPage />
						</Route>
						<ProtectedRoute
							path='/favorites'
							redirect={<Redirect to='/login' />}
							authorized={Boolean(currentUser)}>
							<FavoritesPage dispatch={dispatch} favorites={state.favorites} />
						</ProtectedRoute>
						<ProtectedRoute
							path='/account'
							redirect={<Redirect to='/login' />}
							authorized={Boolean(currentUser)}>
							<AccountPage dispatch={dispatch} currentUser={currentUser} />
						</ProtectedRoute>
						<ProtectedRoute
							path='/login'
							redirect={<Redirect to='/login' />}
							authorized={!currentUser}>
							<LoginPage redirectTo={HOME_PATH} />
						</ProtectedRoute>
						<ProtectedRoute
							path='/register'
							redirect={<Redirect to='/login' />}
							authorized={!currentUser}>
							<RegisterPage redirectTo={HOME_PATH} />
						</ProtectedRoute>
						<Route path='/movies/:movieId'>
							{({ match }) => {
								const movieFavorite = findMovieFavorite(match.params.movieId);
								return (
									<MoviesPage
										currentUser={currentUser}
										movieId={match.params.movieId}
										favoriteId={movieFavorite ? movieFavorite.id : null}
										watched={movieFavorite ? movieFavorite.watched : false}
										dispatch={dispatch}
									/>
								);
							}}
						</Route>
						<Redirect to={HOME_PATH} />
					</Switch>
				</Paper>
			</Container>
		</Fragment>
	);
}

export default App;
