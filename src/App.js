import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header';
import Movie from './components/Movies/Movie';

import HomePage from './pages/Home';

import './App.css';

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		boxSizing: 'border-box',
		padding: theme.spacing(1, 0)
	}
}));

function App() {
	const classes = useStyles();

	return (
		<BrowserRouter>
			<Header />
			<Container className={classes.root} maxWidth='lg'>
				<Paper className={classes.paper}>
					<Switch>
						<Route path='/' exact>
							{({ history, location }) => (
								<HomePage history={history} location={location} />
							)}
						</Route>
						<Route path='/movies/:movieId'>
							{({ match }) => <Movie movieId={match.params.movieId} />}
						</Route>
					</Switch>
				</Paper>
			</Container>
		</BrowserRouter>
	);
}

export default App;
