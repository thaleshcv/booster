import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	topbar: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}));

function Header({ children, className, style }) {
	const classes = useStyles();

	return (
		<div className={classes.topbar}>
			<AppBar position='static'>
				<Toolbar style={style} className={className}>
					<Typography variant='h6' className={classes.brand}>
						BOOSTER
					</Typography>
					{children}
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Header;
