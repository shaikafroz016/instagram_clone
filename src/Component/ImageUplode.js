import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import {db, storage} from '../firebase';
import firebase from 'firebase';
import '../Component/Imageupload.css'


function ImageUplode({username} ) {
    const [caption, setCaption] =  useState('');
    const [image , setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handlechange = (e) => {
        if (e.target.files[0]){
            setImage(e.target.files[0]); 
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error function
                console.log(error);
                alert(error.message);
            },
            () => {
                //complete function
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //post image inside DB
                    db.collection('Posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl : url,
                        username: username 
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
            }
        );
    }; 

    return (
        <div className="imgupload">
            <progress className="img_progres" value={progress} max="100" />
            <input  type="text" className="input" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)} value={caption}/>
            <input type="file" onChange={handlechange} />
            <Button onClick={handleUpload}>Uploade</Button>
        </div>
    )
}

export default ImageUplode
