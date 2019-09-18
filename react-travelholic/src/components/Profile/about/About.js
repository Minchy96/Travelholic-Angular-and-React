import React, { Component } from "react";

function About(props) {

    return (
        <div>
            <h3 className="title">About me</h3>
            <h5 className="description">{props.person.caption}</h5>
            <h3 className="title">Date of birth</h3>
            <h5 className="description">{props.person.birthDate}</h5>
            <h3 className="title">Email Address</h3>
            <h5 className="description">{props.person.email}</h5>
            <h3 className="title">Address</h3>
            <h5 className="description">{props.person.address}</h5><br/><br/>
        </div>
    );
}

export default About;