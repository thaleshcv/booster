import React, { Children } from 'react';
import Grid from '@material-ui/core/Grid';

function MovieList({ children }) {
	return (
		<Grid container>
			{Children.map(children, child => (
				<Grid xs={12} sm={6} md={3} key={child.key} item>
					{child}
				</Grid>
			))}
		</Grid>
	);
}

export default MovieList;
