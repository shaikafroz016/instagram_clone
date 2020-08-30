import React ,{useState,useEffect}from 'react';
import '../Component/post.css';
import {db} from '../firebase';
import Avatar from '@material-ui/core/Avatar';
import { Button } from '@material-ui/core';
import firebase from 'firebase';

function Post({postId,user, username,caption,imageUrl }) {
    const [comments,setComments] = useState([]);
    const [comment , setComment] = useState('');

    useEffect(()=> {
        let unsubscribe;
        if (postId){
            unsubscribe=db
            .collection("Posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () =>{
            unsubscribe();
        };
    },[postId]);

    const postComment =(event) => {
        event.preventDefault();
        db.collection("Posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
    return (
        <div className="post">
            <div className=" post_header">
            {/*Post Header*/}
            <Avatar className="post_avatar"
             alt={username}
             src="/static/images/avatar/1.jpg" />
            <h3>{username}</h3>
             </div>
            {/*image*/}
            <img className="post_img" src={imageUrl} alt=""></img>
            {/*username + caption*/}
    <h5 className="post_text"><b> {username}</b> {caption}</h5>
    <div className="comment_box">
        {comments.map((comment)=>(
            <p>
                <b>{comment.username}</b>&nbsp;{comment.text}
            </p>
        ))}
    </div>
    {user && (
        <form className="post-comment">
        <input
        className="post_input"
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e)=> setComment(e.target.value)}
        />
        <Button
        disabled={!comment}
        className="post-button"
        type="submit"
        onClick={postComment}>
            Post
        </Button>
        
    </form>
    )}
        </div>
    )
}

export default Post
