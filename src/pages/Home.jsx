import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MovieList from '../components/Movies/MovieList';
import MovieListItem from '../components/Movies/MovieListItem';
import Pagination from '../components/Pagination';

import { getMovies } from '../lib/tmdb';

function Home() {
	const history = useHistory();
	const { location } = history;

	const [movies, setMovies] = useState({
		results: [],
		page: 0,
		total_pages: 0
	});

	useEffect(() => {
		const search = new URLSearchParams(location.search);

		getMovies({ page: search.get('page') })
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
		<div>
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
		</div>
	);
}

export default Home;
