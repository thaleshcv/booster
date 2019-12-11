import React from 'react';
import FavoriteList from '../components/Favorites/FavoriteList';
import FavoriteListItem from '../components/Favorites/FavoriteListItem';

import { actions } from '../reducer';
import { deleteFavorite, setFavoriteWatched } from '../lib/favorites';

function Favorites({ dispatch, favorites }) {
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

	return (
		<FavoriteList>
			{favorites.map(favorite => (
				<FavoriteListItem
					key={favorite.id}
					onDelete={handleDeleteFavorite}
					onWatched={handleToggleWatched}
					{...favorite}
				/>
			))}
		</FavoriteList>
	);
}

export default Favorites;
