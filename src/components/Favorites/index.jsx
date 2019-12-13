import React, { useState, useMemo } from 'react';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import FavoriteList from './FavoriteList';
import FavoriteListItem from './FavoriteListItem';
import { actions } from '../../reducer';
import { deleteFavorite, setFavoriteWatched } from '../../lib/favorites';

function applyFilterOnFavorites(favorites, filter) {
	if (filter.hideWatched) {
		return favorites.filter(f => !f.watched);
	}

	return favorites;
}

function Favorites({ dispatch, favorites }) {
	const [hideWatched, setHideWatched] = useState(false);

	const handleDeleteFavorite = favId => {
		return (
			window.confirm(
				'This will remove this movie from your favorites. Are you sure?'
			) &&
			deleteFavorite(favId).then(() => {
				dispatch({
					type: actions.REMOVE_FAVORITE,
					payload: favId
				});
			})
		);
	};

	const handleToggleWatched = (favId, watched) => {
		setFavoriteWatched(favId, watched).then(() => {
			dispatch({
				type: actions.UPDATE_FAVORITE,
				payload: {
					id: favId,
					watched
				}
			});
		});
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
			<FavoriteList>
				{favoritesList.map(favorite => (
					<FavoriteListItem
						key={favorite.id}
						onDelete={handleDeleteFavorite}
						onWatched={handleToggleWatched}
						{...favorite}
					/>
				))}
			</FavoriteList>
		</Container>
	);
}

export default Favorites;
