import React, { Component } from 'react';
import { auth, fireStore, storage } from '../firebase';

export default class UserProfile extends Component {
	state = { displayName: '' };
	imageInput = null;

	get uid() {
		return auth.currentUser.uid;
	}

	get userRef() {
		return fireStore.doc(`users/${this.uid}`);
	}

	get file() {
		return this.imageInput && this.imageInput.files[0];
	}

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = event => {
		event.preventDefault();
		const { displayName } = this.state;

		if (displayName) {
			this.userRef.update({ displayName });
		}

		if (this.file) {
			storage
				.ref()
				.child('user-profiles')
				.child(this.uid)
				.child(this.file.name)
				.put(this.file)
				.then(response => response.ref.getDownloadURL())
				.then(photoURL => this.userRef.update({ photoURL }));
		}
	};

	render() {
		const { displayName } = this.state;
		return (
			<section className='UserProfile'>
				<form onSubmit={this.handleSubmit}>
					<input
						type='text'
						value={displayName}
						name='displayName'
						onChange={this.handleChange}
						placeholder='Display Name'
					/>
					<input type='file' ref={ref => (this.imageInput = ref)} />
					<input className='update' type='submit' />
				</form>
			</section>
		);
	}
}
