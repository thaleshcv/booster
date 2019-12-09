import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import UserAvatar from './User/UserAvatar';

function UserMenu({ user, onLogout }) {
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
				<UserAvatar
					src={user.photoURL}
					name={user.displayName}
					email={user.email}
				/>
			</Button>
			<Menu
				id='user_menu'
				anchorEl={anchorEl}
				open={open}
				onClose={closeMenu}
				variant='menu'>
				<MenuItem component={RouterLink} to='/account'>
					Account
				</MenuItem>
				<MenuItem onClick={onLogout}>Logout</MenuItem>
			</Menu>
		</span>
	);
}

export default UserMenu;
