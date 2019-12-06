import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function UserAvatar({ user, onLogout }) {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const openMenu = evt => {
		setAnchorEl(evt.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	return (
		<span>
			<Button onClick={openMenu}>
				<Avatar>{user.email.charAt(0)}</Avatar>
			</Button>
			<Menu
				id='user_menu'
				anchorEl={anchorEl}
				open={open}
				onClose={closeMenu}
				keepMounted>
				<MenuItem component={RouterLink} to='/account'>
					Account
				</MenuItem>
				<MenuItem onClick={closeMenu}>Logout</MenuItem>
			</Menu>
		</span>
	);
}

export default UserAvatar;
