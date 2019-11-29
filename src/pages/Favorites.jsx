import React from 'react';
import FavoriteList from '../components/Favorites/FavoriteList';
import FavoriteListItem from '../components/Favorites/FavoriteListItem';

import { actions } from '../reducer';
import { deleteFavorite } from '../lib/favorites';

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

	return (
		<FavoriteList>
			{favorites.map(favorite => (
				<FavoriteListItem
					key={favorite.id}
					onDelete={handleDeleteFavorite}
					{...favorite}
				/>
			))}
		</FavoriteList>
	);
}

export default Favorites;
