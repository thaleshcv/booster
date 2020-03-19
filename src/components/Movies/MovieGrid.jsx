import React from "react";
import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper
	}
}));

function MovieGrid({ children }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<GridList cellHeight={300} className={classes.gridList}>
				{children}
			</GridList>
		</div>
	);
}

export default MovieGrid;
