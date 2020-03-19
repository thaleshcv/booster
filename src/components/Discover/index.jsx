import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SearchInput from "../SearchInput";
import MovieGrid from "../Movies/MovieGrid";
import MovieGridItem from "../Movies/MovieGridItem";
import Pagination from "../Pagination";

import useApp from "../../actions/app";
import { getMovies, searchMovies } from "../../lib/tmdb";

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
		fetchMovies(search.get("query"), search.get("page"))
			.then(movies => setMovies(movies))
			.then(() => window.scrollTo(0, 0))
			.then(() => setLoading(false));
	}, [location.search, setLoading]);

	const handlePagination = page => {
		const search = new URLSearchParams(location.search);
		search.set("page", page);

		history.push({
			pathname: location.pathname,
			search: search.toString()
		});
	};

	const handleSearchChange = value => {
		history.push({
			pathname: "/discover",
			search: `query=${value}`
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
					<SearchInput onSubmit={handleSearchChange} />
				</Grid>
			</Grid>
			{movies.results.length === 0 ? (
				<Typography variant='body1' align='center'>
					No movies to show
				</Typography>
			) : (
				<Fragment>
					<MovieGrid>
						{movies.results.map(
							({ id, title, backdrop_path, release_date }) => (
								<MovieGridItem
									key={id}
									movieId={id}
									releaseDate={release_date}
									title={title}
									backdropPath={backdrop_path}
								/>
							)
						)}
					</MovieGrid>
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
