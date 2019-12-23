import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SearchInput from '../SearchInput';
import MovieList from '../Movies/MovieList';
import MovieListItem from '../Movies/MovieListItem';
import Pagination from '../Pagination';

import useApp from '../../actions/app';
import { getMovies, searchMovies } from '../../lib/tmdb';

function fetchMovies(query, page) {
	return query ? searchMovies({ query, page }) : getMovies({ page });
}

function Discover({ dispatch }) {
	const { setLoading } = useApp(dispatch);

	const history = useHistory();
	const { location } = history;

	const [movies, setMovies] = useState({
		results: [],
		page: 0,
		total_pages: 0
	});

	useEffect(() => {
		setLoading(true);

		const search = new URLSearchParams(location.search);
		fetchMovies(search.get('query'), search.get('page'))
			.then(movies => setMovies(movies))
			.then(() => window.scrollTo(0, 0))
			.then(() => setLoading(false));
	}, [location.search, setLoading]);

	const handlePagination = page => {
		const search = new URLSearchParams(location.search);
		search.set('page', page);

		history.push({
			pathname: location.pathname,
			search: search.toString()
		});
	};

	let timeoutId;
	const handleSearchChange = ({ target }) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(function() {
			history.push({
				pathname: '/discover',
				search: `query=${target.value}`
			});
		}, 500);
	};

	const handleSearchClear = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		history.push({
			pathname: '/discover'
		});
	};

	return (
		<Container>
			<Grid justify='space-between' alignItems='center' container>
				<Grid item>
					<Typography variant='h2' gutterBottom>
						Discover movies
					</Typography>
				</Grid>
				<Grid item>
					<SearchInput
						onChange={handleSearchChange}
						onClear={handleSearchClear}
					/>
				</Grid>
			</Grid>
			{movies.results.length === 0 ? (
				<Typography variant='body1' align='center'>
					No movies to show
				</Typography>
			) : (
				<Fragment>
					<MovieList>
						{movies.results.map(m => (
							<MovieListItem key={m.id} movie={m} />
						))}
					</MovieList>
					<Pagination
						onPaginate={handlePagination}
						currentPage={movies.page}
						pages={movies.total_pages}
					/>
				</Fragment>
			)}
		</Container>
	);
}

export default Discover;
