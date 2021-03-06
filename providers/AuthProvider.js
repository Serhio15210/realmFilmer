import React, {useContext, useState, useEffect, useRef, useMemo} from "react";
import Realm from "realm";
import app from "../realmApp";
import {createUser, getCurrentUserData, getCurrentUserLists} from "../controllers/UserController";
const AuthContext = React.createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(app.currentUser);
  const [userData, setUserData] = useState({
    username:'',
    lists:[],
    favoriteList:{},
    userID:'',
    subscribers:[],
    subscriptions:[]
  });
  const [userLists,setUserLists]=useState([])
  useMemo( () => {
    getCurrentUserLists().then(data=>setUserLists(data))
    console.log('list',userData.lists)
    // setUserData({...userData,lists:userLists})
  },[userData])

  useEffect( () => {
    if (user===null) {
      return;
    }
    getCurrentUserData().then(newUserData=>
    setUserData({ username: newUserData.username,lists: newUserData.lists,favoriteList:newUserData.favoriteList,userID:newUserData.userID,subscriptions: newUserData.subscriptions,subscribers: newUserData.subscribers}))

  }, []);


  const signIn = async (email, password) => {
    // TODO: Pass the email and password to Realm's email password provider to log in.

    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds)
    setUser(newUser);
    const newUserData=await getCurrentUserData()
    setUserData(newUserData)

  };

  // The signUp function takes an email and password and uses the
  // emailPassword authentication provider to register the user.
  const signUp = async (email, password, username) => {
    // TODO: Pass the email and password to Realm's email password provider to register the user.
    // Registering only registers and does not log in.

    await app.emailPasswordAuth.registerUser({email, password})
    await app.logIn(Realm.Credentials.emailPassword(email, password));
    await createUser(username)

  };

  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user === null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
    // TODO: Log out the current user and use the setUser() function to set the current user to null.
  };
  const resetPassword = async (email) => {
    const reset=await app.emailPasswordAuth.sendResetPasswordEmail({email});

  }
  return (
      <AuthContext.Provider
          value={{
            signUp,
            signIn,
            signOut,
            resetPassword,
            user,
            setUserData,
            userLists,
            setUserLists,
            userData, // list of projects the user is a memberOf
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export {AuthProvider, useAuth};
