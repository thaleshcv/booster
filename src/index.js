import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import App from './App';
import * as serviceWorker from './serviceWorker';

const fbConfig = {
	apiKey: process.env.REACT_APP_FB_API_KEY,
	authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
	projectId: process.env.REACT_APP_FB_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FB_APP_ID
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(fbConfig);
}

function renderApp(user) {
	ReactDOM.render(
		<BrowserRouter>
			<App currentUser={user} />
		</BrowserRouter>,
		document.getElementById('root')
	);
}

firebase.auth().onAuthStateChanged(function(user) {
	const newUser = user ? user.toJSON() : null;
	renderApp(newUser);
});

ReactDOM.render(<span>loading...</span>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
