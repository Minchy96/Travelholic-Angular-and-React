import React, { Component } from "react";
import Posts from 'components/Posts/Posts'

function SeePosts(props) {


    return (
        <div>
            <Posts type="seePosts" username={props.username} ></Posts>
        </div>
    );
}

export default SeePosts;