import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import Header from './components/Header';
import Movie from './components/Movies/Movie';
import MovieList from './components/Movies/MovieList';
import MovieListItem from './components/Movies/MovieListItem';

import { getMovies } from './lib/movies';

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

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		getMovies().then(movies => setMovies(movies.results));
	}, []);

	return (
		<BrowserRouter>
			<Header />
			<Container className={classes.root} maxWidth='lg'>
				<Paper className={classes.paper}>
					<Switch>
						<Route path='/' exact>
							<MovieList>
								{movies.map(m => (
									<MovieListItem key={m.id} movie={m} />
								))}
							</MovieList>
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
