import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0, 2, 2, 0),
		width: "100px",
		textAlign: "center"
	},
	avatar: {
		marginBottom: theme.spacing(1),
		width: 45,
		height: 45
	}
}));

function MovieCastItem({ alt, src, footer, children, className, avatarClass }) {
	const classes = useStyles();

	const rootClassName = className
		? `${classes.root} ${className}`
		: classes.root;

	const avatarClassName = avatarClass
		? `${classes.avatar} ${avatarClass}`
		: classes.avatar;

	return (
		<div className={rootClassName}>
			<Avatar
				className={avatarClassName}
				alt={alt}
				src={src}
				children={children}
			/>
			{footer}
		</div>
	);
}

export default MovieCastItem;
