import React from 'react';
import Chip from '@material-ui/core/Chip';

function MovieGenres({ genres }) {
	const movieGenres = [].concat(genres);

	return (
		<span>
			{movieGenres.map(g => (
				<Chip key={g.id} label={g.name} size='small' />
			))}
		</span>
	);
}

export default MovieGenres;
