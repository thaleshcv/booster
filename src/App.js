import React, { useReducer, useEffect, Fragment } from 'react';
import { Link as RouterLink, Redirect, Route, Switch } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

// UI components
import LoadingSpinner from './components/LoadingSpinner';
import Flash from './components/Flash';
import Header from './components/Header';
import UserMenu from './components/User/UserMenu';

// pages imports
import AccountPage from './components/User';
import DiscoverPage from './components/Discover';
import LoginPage from './components/Login';
import FavoritesPage from './components/Favorites';
import MoviesPage from './components/Movies';
import RegisterPage from './components/User/Register';

// actions imports
import useApp from './actions/app';
import useFlash from './actions/flash';
import useFavorites from './actions/favorites';

// others imports
import reducer from './reducer';
import { logoutUser } from './lib/auth';
import { getUserFavorites } from './lib/favorites';
import ProtectedRoute from './components/ProtectedRoute';

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
	const authenticated = Boolean(currentUser);

	const classes = useStyles();

	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		favorites: [],
		flashes: []
	});

	const { resetData } = useApp(dispatch);
	const { addFavorites } = useFavorites(dispatch);
	const { shiftFlashMessage } = useFlash(dispatch);

	const handleFlashClose = () => shiftFlashMessage();

	const handleLogout = () => logoutUser().then(() => resetData());

	const findMovieFavorite = movieId =>
		state.favorites.find(fav => String(fav.movieId) === movieId);

	useEffect(() => {
		if (authenticated) {
			getUserFavorites().then(favorites => addFavorites(favorites));
		}
	}, [addFavorites, authenticated]);

	console.debug('App State', state);

	return (
		<Fragment>
			<LoadingSpinner active={state.loading} message='Loading' />
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
							<DiscoverPage dispatch={dispatch} />
						</Route>
						<ProtectedRoute
							path='/favorites'
							redirect={<Redirect to='/login' />}
							authorized={authenticated}>
							<FavoritesPage dispatch={dispatch} favorites={state.favorites} />
						</ProtectedRoute>
						<ProtectedRoute
							path='/account'
							redirect={<Redirect to='/login' />}
							authorized={authenticated}>
							<AccountPage dispatch={dispatch} currentUser={currentUser} />
						</ProtectedRoute>
						<ProtectedRoute
							path='/login'
							redirect={<Redirect to='/login' />}
							authorized={authenticated}>
							<LoginPage dispatch={dispatch} redirectTo={HOME_PATH} />
						</ProtectedRoute>
						<ProtectedRoute
							path='/register'
							redirect={<Redirect to='/login' />}
							authorized={authenticated}>
							<RegisterPage dispatch={dispatch} redirectTo={HOME_PATH} />
						</ProtectedRoute>
						<Route path='/movies/:movieId'>
							{({ match }) => {
								const movieFavorite = findMovieFavorite(match.params.movieId);
								return (
									<MoviesPage
										authenticated={authenticated}
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
