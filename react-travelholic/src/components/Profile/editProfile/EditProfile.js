import React, { Component } from "react";

import axios from 'axios';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Form,
    Input,
    InputGroup,
    Container,
    Col,
} from "reactstrap";
import InputFiles from 'react-input-files';

function EditProfile(props) {

    const [lastFocus, setLastFocus] = React.useState(false);
    var [firstName, setFirstName] = React.useState(null);
    var [lastName, setLastName] = React.useState(null);
    var [username, setUsername] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [caption, setCaption] = React.useState(null);
    var [address, setAddress] = React.useState(null);
    var [email, setEmail] = React.useState(null);
    var [image, setImage] = React.useState("");

    function uploadImage(imagefile) {
        console.log(imagefile)
        let data = new FormData();
        data.append('file', imagefile);
        setImage(data)

    }

    function saveChanges() {
        axios.post('/user/update', {
            firstName: firstName,
            lastName: lastName,
            username: props.person.username,
            password: password,
            caption: caption,
            address: address,
            email: email,
            birthDate: null,
            newUsername: username
        }).then(response => {
            if (username != null && username !=  props.person.username){
                sessionStorage.setItem('username', username)
                console.log(sessionStorage.getItem('username'))
            }
            console.log(image, "ovo je slika")
            if (image != "") {
                axios.post('/user/uploadImage/' + props.person.username, image).then(response =>
                    console.log(response));
            }
            window.location.reload(); 
        })
}


return (
    <div>
        <div className="row">
            <div className="form-group col-md-2">
                <h5 className="description">First name:</h5>
            </div>
            <div className="form-group col-md-6">
                <Input type="text" className="form-control" id="inputfirstName" placeholder={props.person.firstName}
                    onChange={event => setFirstName(event.target.value)} />
            </div>
        </div>

        <div className="row">
            <div className="form-group col-md-2">
                <h5 className="description">Last name:</h5>
            </div>
            <div className="form-group col-md-6">
                <Input type="text" className="form-control" placeholder={props.person.lastName}
                    onChange={event => setLastName(event.target.value)} />
            </div>
        </div>

        <div className="row">
            <div className="form-group col-md-2">
                <h5 className="description">Caption:</h5>
            </div>
            <div className="form-group col-md-6">
                <Input type="textarea" className="form-control" placeholder={props.person.caption}
                    onChange={event => setCaption(event.target.value)} />
            </div>
        </div>

        <div className="row">
            <div className="form-group col-md-2">
                <h5 className="description">Username:</h5>
            </div>
            <div className="form-group col-md-6">
                <Input type="text" className="form-control" id="inputfirstName" placeholder={props.person.username}
                    onChange={event => setUsername(event.target.value)} />
            </div>
        </div>

        <div className="row">
            <div className="form-group col-md-2">
                <h5 className="description">Password:</h5>
            </div>
            <div className="form-group col-md-6">
                <Input type="password" className="form-control" id="inputfirstName"
                    onChange={event => setPassword(event.target.value)} />
            </div>
        </div>

        <div className="row">
            <div className="form-group col-md-2">
                <h5 className="description">Email:</h5>
            </div>
            <div className="form-group col-md-6">
                <Input type="text" className="form-control" id="inputfirstName" placeholder={props.person.email}
                    onChange={event => setEmail(event.target.value)} />
            </div>
        </div>

        <div className="row">
            <div className="form-group col-md-2">
                <h5 className="description">Address:</h5>
            </div>
            <div className="form-group col-md-6">
                <Input type="text" className="form-control" id="inputfirstName" placeholder={props.person.address}
                    onChange={event => setAddress(event.target.value)} />
            </div>
        </div>

        <div className="row">
            <InputFiles onChange={files => uploadImage(files[0])}>
                <Button className="btn-round" color="info">Upload Photo</Button>
            </InputFiles>
        </div>


        <Button type="submit" className="btn btn-info" onClick={saveChanges} >Save</Button>



    </div>

);
}

export default EditProfile;