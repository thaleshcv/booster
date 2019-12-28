import React, { useState, useMemo, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import TimerIcon from '@material-ui/icons/AccessTime';

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
							<Fragment>
								<IconButton
									color='secondary'
									title='Remove from favorites'
									onClick={() => handleDeleteFavorite(id)}>
									<DeleteIcon />
								</IconButton>
								{watched ? (
									<IconButton
										size='small'
										title='Mark as not watched'
										onClick={() => handleToggleWatched(id, !watched)}>
										<DoneIcon />
									</IconButton>
								) : (
									<IconButton
										size='small'
										title='Mark as watched'
										onClick={() => handleToggleWatched(id, !watched)}>
										<TimerIcon />
									</IconButton>
								)}
							</Fragment>
						}
					/>
				))}
			</MovieList>
		</Container>
	);
}

export default Favorites;
