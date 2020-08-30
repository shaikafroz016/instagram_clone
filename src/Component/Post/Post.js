import React from 'react';
import '../Post/post.css';
import Avatar from '@material-ui/core/Avatar';

function Post({ username,caption,imageUrl }) {
    return (
        <div className="post">
            <div className=" post_header">
            {/*Post Header*/}
            <Avatar className="post_avatar"
             alt="shaik"
             src="/static/images/avatar/3.jpg" />
            <h3>{username}</h3>
             </div>
            {/*image*/}
            <img className="post_img" src={imageUrl} alt=""></img>
            {/*username + caption*/}
    <h5 className="post_text"><b> {username}</b> {caption}</h5>
        </div>
    )
}

export default Post
