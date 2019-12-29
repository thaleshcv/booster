import React, { useState, useMemo, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import MovieList from '../Movies/MovieList';
import MovieListItem from '../Movies/MovieListItem';
import { deleteFavorite, setFavoriteWatched } from '../../lib/favorites';
import useFavorites from '../../actions/favorites';

function applyFilterOnFavorites(favorites, filter) {
	if (filter.hideWatched) {
		return favorites.filter(f => !f.watched);
	}

	return favorites;
}

function Favorites({ dispatch, favorites }) {
	const [hideWatched, setHideWatched] = useState(false);
	const { updateFavorite, removeFavorite } = useFavorites(dispatch);

	const handleDeleteFavorite = favId => {
		return (
			window.confirm(
				'This will remove this movie from your favorites. Are you sure?'
			) && deleteFavorite(favId).then(() => removeFavorite(favId))
		);
	};

	const handleToggleWatched = (favId, watched) => {
		setFavoriteWatched(favId, watched).then(() =>
			updateFavorite({
				id: favId,
				watched
			})
		);
	};

	const handleHideWatched = () => {
		setHideWatched(!hideWatched);
	};

	const favoritesList = useMemo(
		() => applyFilterOnFavorites(favorites, { hideWatched }),
		[favorites, hideWatched]
	);

	return (
		<Container>
			<Grid alignItems='center' justify='space-between' container>
				<Grid item>
					<Typography variant='h2'>Favorite movies</Typography>
				</Grid>
				<Grid item>
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={hideWatched}
									onChange={handleHideWatched}
									value={hideWatched}
								/>
							}
							label='Hide watched'
						/>
					</FormGroup>
				</Grid>
			</Grid>

			{!favoritesList.length && (
				<Typography align='center' variant='body1'>
					Your favorites list is empty
				</Typography>
			)}

			<MovieList>
				{favoritesList.map(({ id, movieId, title, watched, posterPath }) => (
					<MovieListItem
						key={id}
						movieId={movieId}
						title={title}
						posterPath={posterPath}
						actions={
							<Button
								size='small'
								title='Remove from favorites'
								onClick={() => handleDeleteFavorite(id)}
								startIcon={<DeleteIcon />}>
								Remove
							</Button>
						}
					/>
				))}
			</MovieList>
		</Container>
	);
}

export default Favorites;
