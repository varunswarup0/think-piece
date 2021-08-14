# [THINK PIECE](https://think-piece-b7cba.web.app/ "Think Piece")


|[DOCUMENTATION](https://firebase.google.com/docs "Firebase's Docs")       |
| ------------- |

![alt text](https://github.com/varunswarup0/think-piece/blob/master/think-piece.png)

# Cloud Firestore is based on collections

In the Real time database, you get whatever node of the
tree you required and all of it's subnodes

This meant you had to be really careful about how you
structured your data. In Firestore, queries are shallow

In Cloud Firestore, queries are shallow. You don't get all of the sub-collections by default

You still need to be mindful, but maybe less paranoid.

```javascript

firestore.collection('posts').orderBy('createdAt','desc');

```



# Configuring the Firebase
 ```javascript
 
 import firebase from 'firebase/app'
 
 ```
  This gives you just the barebone minimum to    get started
```javascript
  import 'firebase/firestore'
  export const firestore=firebase.firestore();
  export default firebase;
  
```

# Aside
We should never fetch any data in render method, as render is a pure function and calling APIs here may cause side effects. There is another lifecycle method that is a perfect match to fetch data: componentDidMount(). When this method runs, the component was already rendered once with the render() method, but it would render again when the fetched data would be stored in the local state of the component with setState(). Afterward, the local state could be used in the render() method to display it or to pass it down as props.

```javascript
 componentDidMount=async()=>{
     const posts=await firestore.collection('posts').get();
 }

```


# QuerySnapshot Properties

  Query snapshot also holds onto a number of QueryDocumentSnapshots which inherit from
  Document Snpashot

  docs: All of the documents in the snapshot
  id:   The id of the given document
  exists: Is this even a thing in the database
  ref: A reference to the documents location        in the database

  data(): Gets all the fields of the object
  get(): Allows you to access a particular            property
    
 # Adding a New Post

```javascript
 const docRef= await firestore.collection('posts').add(post)
 const doc=await docRef.get()

 const newPost={
     id:doc.id,
     ...doc.data()
 }
 
```

# Deleting a Post
```javascript
await firestore.doc(`posts/${id}`).delete();

```

# As the application grows, you want to update the UI as soon as the database changes.

    Instead of using get() which will get you the data each time, we will
    use onSnapshot.

```javascript
    firestore.collection('posts').onSnapshot(snapshot=>{
      const posts=snapshot.docs.map(doc=>({
          id:doc.id,
          ...doc.data()
      }))

      this.setState({posts});

    })

 ```

# Cloud Firestore rules always follow this structure

```javascript

service cloud.firestore{
match /databases/{database}/documents {
//.....
}
}

# Security rules for cloud firestore
# This is the pattern for rules

service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if <condition>;
      allow write: if <condition>;
    }
  }
}

```
resource.data will have the fields on the document as it is stored in Firebase

request.resource.data will have the incoming 
document


# Authentication

# Signup
```javascript

firebase.auth().createUserWithEmailAndPassword(email,password).catch(error=>{
console.error("Error")
})

```

# SignIn
```javascript

firebase.auth().signInWithEmailAndPassword(email,password).catch(error=>{
console.error("Error");

})

this.unsubscribeFromAuth=auth.onAuthStateChanged(user=>{
    this.setState({user})
})

```



# SignOut

```javascript

firebase.auth().signOut().the(function(){
//Sign out successfull
})
.catch(function(error){
//An Error occurred

});

```

# Creating Documents

Document Reference
A DocumentReference refers to a document location in a Firestore database and can be used to write, read, or listen to the location. The document at the referenced location may or may not exist. A DocumentReference can also be used to create a CollectionReference to a subcollection.

get()

-Reads the document referred to by this DocumentReference.

onSnapshot()

-Attaches a listener for DocumentSnapshot events. You may either pass individual onNext and onError callbacks or pass a single observer object with next and error callbacks.


# Cloud Storage for Firebase

Cloud storage for firebase lets you upload and share
user generated content such as images and video. Your
data is stored in a Google Cloud Storage bucket, an
exabyte scale object storage solution with high
availability and global redudancy. Cloud 
Storage let's you securely upload these files
directly from mobile devices and web browsers, handling spotty networks with ease.


# Create a Storage Reference on Web

Your files are stored in a Google Cloud Storage bucket. The files in this bucket are presented in a hierarchical structure, just like the file system on your local hard disk, or the data in the Firebase Realtime Database. By creating a reference to a file, your app gains access to it. These references can then be used to upload or download data, get or update metadata or delete the file. A reference can either point to a specific file or to a higher level node in the hierarchy.

If you've used the Firebase Realtime Database, these paths may seem very familiar to you—they should! However, your file data is stored in Google Cloud Storage, not in the Realtime Database.

# Create a Reference
In order to upload or download files, delete files, or get or update metadata, you must create a reference to the file you want to operate on. A reference can be thought of as a pointer to a file in the cloud. References are lightweight, so you can create as many as you need, and they are also reusable for multiple operations.

You can create a reference to a location lower in the tree, say 'images/space.jpg' by using the child() method.
```javascript

var imagesRef=storageRef.child('images');

```
# Points to the root reference
```javascript
var storageRef = firebase.storage().ref();

```
# Points to 'images'
```javascript
var imagesRef = storageRef.child('images');

```
# Points to 'images/space.jpg'
# Note that you can use variables to create child values

```javascript
var fileName = 'space.jpg';
var spaceRef = imagesRef.child(fileName);

```
# File path is 'images/space.jpg'
```javascript
var path = spaceRef.fullPath

```
# File name is 'space.jpg'

```javascript
var name = spaceRef.name

```
# Points to 'images'

```javascriptt
var imagesRef = spaceRef.parent;

```
React has a higher order component called withRouter that will take all of
this route information and pass it in as props to the given component


# Deploying with the Firebase CLI
``` javascript

npm install -g firebase-tools firebase-admin
firebase login

firebase init


# Cloud Functions

npm install firebase-functions@latest firebase-admin@latest --save

```


