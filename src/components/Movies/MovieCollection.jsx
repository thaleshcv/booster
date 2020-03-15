import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

import { getPosterUrl } from "../../lib/tmdb";

const useStyles = makeStyles(theme => ({
	root: {
		"display": "flex",
		"maxHeight": "235px",
		"overflowY": "auto",
		"flexFlow": "row wrap",
		"& > *": {
			margin: theme.spacing(0, 1)
		}
	}
}));

function MovieCollection({ parts }) {
	const classes = useStyles();

	if (!parts || parts.length === 0) {
		return null;
	}

	return (
		<div className={classes.root}>
			{parts.map(movie => (
				<Link
					key={movie.id}
					component={RouterLink}
					to={`/movies/${movie.id}/${movie.original_title}`}>
					<img
						src={getPosterUrl(movie.poster_path, 154)}
						alt={movie.original_title}
					/>
				</Link>
			))}
		</div>
	);
}

export default MovieCollection;
