import React, { Children } from 'react';
import Grid from '@material-ui/core/Grid';

function FavoriteList({ children }) {
	return (
		<Grid container>
			{Children.map(children, child => (
				<Grid xs={12} sm={6} md={4} key={child.key} item>
					{child}
				</Grid>
			))}
		</Grid>
	);
}

export default FavoriteList;
