import React, {useState, useEffect} from 'react';
import Post from './Component/Post';
import './App.css';
import {db, auth} from './firebase'
import { Modal, Button,Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ImageUplode from './Component/ImageUplode';
import InstagramEmbed from 'react-instagram-embed'

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] =useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn,setOpenSignIn] =useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe =  auth.onAuthStateChanged((authUser)=>{
      if (authUser) {
        //user loged in
        console.log(authUser);
        setUser(authUser);
      }
      else {
        //user loged out
        setUser(null);
      }
    })
    return () =>{
      unsubscribe();
    }
  },[user,username]);
 //useEffect -> run a piece of code based on condition
  useEffect(()=> {
    //here the code run
    db.collection('Posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
      setPosts(snapshot.docs.map(doc => ({
        id : doc.id,
        post:doc.data()})))
    })
  }, []);

  const signUp=(event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=> {
     return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=> alert(error.message))
  }
const signIn=(event) => {
  event.preventDefault();
  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error)=> alert(error.message))
  setOpenSignIn(false)
}

  return (
    <div className="App">
      {/*coment section*/}
      <Modal 
      open={open}
      onClose={()=>setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="form">
          <center>
          <img 
        className="App-Headerimg"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""></img>
        </center>
        <Input
        placeholder="User Name"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        placeholder="Password"
        type="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signUp} variant="contained" color="primary">Sign Up</Button>
        </form>
        </div>
      </Modal>
      <Modal 
      open={openSignIn}
      onClose={()=>setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="form" >
          <center>
          <img 
        className="App-Headerimg"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""></img>
        </center>
        <Input
        placeholder="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <Input
        placeholder="Password"
        type="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" onClick={signIn} variant="contained" color="primary">Log In</Button>
        </form>
        </div>
      </Modal>
       {/*Header */}
      <div className="App_Header">
        <img 
        className="App-Headerimg"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""></img>
        {/*if user logedin then it convert into logout*/}
      {user ?  (
        <Button  variant="contained" onClick={() => auth.signOut()}>Logout</Button>
      ):(
        <div className="app_logincontainer">
        <Button  onClick={()=> setOpen(true)} variant="contained" >Sign Up</Button>
        <Button  onClick={()=> setOpenSignIn(true)} variant="contained" >Login</Button>

        </div>
      )}
      </div>
      <div className="header-padding">

      </div>
      <div className="app-posts">
        <div className="post_left">
      {/*Post*/}
      {
        posts.map(({id,post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      </div>
      <div className="right_post">
      <InstagramEmbed
        url='https://www.instagram.com/p/CDrcwykscvS/'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
      </div>
      </div>
      {/*file upload*/}
      {/*post button*/}
              {user?.displayName ? (
                <ImageUplode username={user.displayName} />
            ) : (
              <h3>You Need to Login to uplaod</h3>
            )}
    </div>
  );
}

export default App;
