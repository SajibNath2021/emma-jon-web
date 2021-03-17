

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../config/config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};
function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: '',
        photo: ''
    })

    const provider = new firebase.auth.GoogleAuthProvider();
    const FbProvider = new firebase.auth.FacebookAuthProvider();

    const handleSignIn=()=>{
       firebase.auth().signInWithPopup(provider)
       .then(res => {
      const {displayName, photoURL, email} = res.user;
      const isSignedInUser = {
      isSignedIn : true,
      name: displayName,
      email: email,
      photo : photoURL
      }
      setUser(isSignedInUser)

    })
     .catch(err=>{
       console.log(err);
     })
    }  

    const handleSignOut = () => {
      firebase.auth().signOut()
      .then(res => {
        const signOutUser = {
          isSignedIn : false,
          name: '',
          photo: '',
          email: ''
        }
        setUser(signOutUser)
        })
    }
    //contex api
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    // jfgjfhgjfhgj
    const handleChange = (e) => {
        let isFromValue = true;
        if (e.target.name === 'email') {
            isFromValue = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            isFromValue = /\d{1}/.test(e.target.value);


        }
        if (isFromValue) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }

    }
    const handleSubmit = (e) => {
        console.log("click");
        console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    // ..
                });
        }

        if (user.email && user.password && !newUser) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((userCredential) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    console.log('sign in user info', userCredential.user);
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    // ..
                });
        }


        e.preventDefault();
    }
    const updateUserName = name => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('name updated sucessfully');
        }).catch(function (error) {
            console.log(error);
        });
    }
    const handleFbButton = () => {
        firebase.auth().signInWithPopup(FbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;
                console.log(user);

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    }
    return (
        <div className="App">

            {
         user.isSignedIn? <button onClick={handleSignOut}>Sign out</button>:
         <button onClick={handleSignIn} >Sign in</button>
      }
    
       {
         user.isSignedIn && <div>
           <p>Welcome, {user.name}</p> 
           <p>email: {user.email}</p>
           <img style={{width :"50%"}} src={user.photo} alt=""/>
         </div> 
       }

            <h1>Our own authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New user signIn</label>

            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" name="name" onBlur={handleChange} placeholder="name " required />
                }
                <br />
                <input type="text" name="email" onBlur={handleChange} placeholder="Email" required />
                <br />
                <input type="password" name="password" onBlur={handleChange} placeholder="Password" required />
                <br />
                <input type="submit" value={newUser ? "sign up" : 'sign in'} />

            </form>

            {
                user.success ? <p style={{ color: 'green' }}>user  {newUser ? 'crated' : 'LoggedIn'} successfully</p> : <p style={{ color: 'red' }}>{user.error}</p>
            }
            <br />

            <button onClick={handleFbButton}>Sign in with FB</button>

        </div>

    );
}

export default Login;
