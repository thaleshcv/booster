import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { makeStyles } from "@material-ui/core/styles";

import { getBackdropUrl } from "../../lib/tmdb";

const useStyles = makeStyles(theme => ({
	link: {
		color: theme.palette.common.white
	}
}));

function getMovieYearRelease(releaseDate) {
	if (!releaseDate) return null;
	return releaseDate.split("-")[0];
}

function MovieGridItem({ backdropPath, movieId, releaseDate, title }) {
	const classes = useStyles();
	const backUrl = getBackdropUrl(backdropPath, 300);

	return (
		<GridListTile key={backUrl}>
			<img src={backUrl} alt={title} />
			<GridListTileBar
				subtitle={<span>{getMovieYearRelease(releaseDate)}</span>}
				title={
					<Link
						className={classes.link}
						component={RouterLink}
						to={`/movies/${movieId}`}>
						{title}
					</Link>
				}
			/>
		</GridListTile>
	);
}

export default MovieGridItem;
