import React, { Component, createContext } from 'react';
import { fireStore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

export const PostsContext = createContext();

export default class PostsProvider extends Component {
	state = { posts: [] };

	unsubscribeFromFirestore = null;

	componentDidMount = () => {
		this.unsubscribeFromFirestore = fireStore
			.collection('posts')
			.onSnapshot(snapshot => {
				const posts = snapshot.docs.map(collectIdsAndDocs);
				this.setState({ posts });
			});
	};

	componentWillUnmount = async () => {
		this.unsubscribeFromFirestore();
	};

	render() {
		const { posts } = this.state;
		const { children } = this.props;

		return (
			<PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
		);
	}
}
