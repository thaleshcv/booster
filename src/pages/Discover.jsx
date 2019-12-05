import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import MovieList from '../components/Movies/MovieList';
import MovieListItem from '../components/Movies/MovieListItem';
import Pagination from '../components/Pagination';

import { getMovies, searchMovies } from '../lib/tmdb';

function fetchMovies(query, page) {
	return query ? searchMovies({ query, page }) : getMovies({ page });
}

function Discover() {
	const history = useHistory();
	const { location } = history;

	const [movies, setMovies] = useState({
		results: [],
		page: 0,
		total_pages: 0
	});

	useEffect(() => {
		const search = new URLSearchParams(location.search);

		fetchMovies(search.get('query'), search.get('page'))
			.then(movies => setMovies(movies))
			.then(() => window.scrollTo(0, 0));
	}, [location.search]);

	const handlePagination = page => {
		const search = new URLSearchParams(location.search);
		search.set('page', page);

		history.push({
			pathname: location.pathname,
			search: search.toString()
		});
	};

	return (
		<Container>
			<Typography variant='h2' gutterBottom>
				Discover movies
			</Typography>
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
