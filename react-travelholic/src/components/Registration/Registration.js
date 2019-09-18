import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

// reactstrap components
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
import DatePicker from 'react-datetime';
import format from "date-fns/format";
import InputFiles from 'react-input-files';


function Registration(props) {
    var [firstName, setFirstName] = React.useState("");
    var [lastName, setLastName] = React.useState("");
    var [username, setUsername] = React.useState("");
    var [password, setPassword] = React.useState("");
    var [caption, setCaption] = React.useState("");
    var [address, setAddress] = React.useState("");
    var [email, setEmail] = React.useState("");
    var [image, setImage] = React.useState("");
    var [birthday, setBirthday] = React.useState("");
    const [lastFocus, setLastFocus] = React.useState(false);
    var [validUsername, setValidUsername] = React.useState(true);


    React.useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("login-page");
            document.body.classList.remove("sidebar-collapse");
        };
    });

    function createAccount() {
        axios.get('/user/try/' + username).then(response => {
            if (response.data === true) {
                axios.post('/user/save', {
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    password: password,
                    caption: caption,
                    address: address,
                    email: email,
                    birthDate: birthday,
                    newUsername: null
                }).then(response => {
                    sessionStorage.setItem('username', username);
                    if (image != "") {
                        axios.post('/user/uploadImage/' + username,  image ).then(response =>
                            console.log(response));
                            props.history.push('/home');
                    } else {
                        props.history.push('/home');
                    }

                })
            } else {
                setValidUsername(false);
            }
        })

    }

    function birthdayChange(event) {
        setBirthday( format(event._d, "yyyy-MM-dd"))
    }

    function uploadImage(imagefile){
        let data = new FormData();
        data.append('file', imagefile);
        setImage(data)    
    }



    return (
        <div className="page-header clear-filter" filter-color="blue">
            <div
                className="page-header-image"
                style={{
                    backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
                }}
            ></div>
            <div className="content">
                <Container>
                    <Col className="ml-auto mr-auto" md="4">
                        <Card className="card-login card-plain">
                            <Form action="" className="form" method="">

                                <CardBody>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "") }>
                                        <Input
                                            placeholder="First Name..."
                                            type="text"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={(event) => setFirstName(event.target.value)}
                                        ></Input>
                                    </InputGroup>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "")
                                        }
                                    >

                                        <Input
                                            placeholder="Last Name..."
                                            type="text"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={(event) => setLastName(event.target.value)}
                                        ></Input>
                                    </InputGroup>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "")
                                        }
                                    >

                                        <Input
                                            placeholder="Username..."
                                            type="text"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={(event) => setUsername(event.target.value)}
                                        ></Input>
                                    </InputGroup>
                                    {validUsername === true ?
                                        null
                                        : <h6> Username must be unique! </h6>}
                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "")
                                        }
                                    >

                                        <Input
                                            placeholder="Password..."
                                            type="password"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={(event) => setPassword(event.target.value)}
                                        ></Input>
                                    </InputGroup>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "")
                                        }
                                    >

                                        <Input
                                            placeholder="Email..."
                                            type="text"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={(event) => setEmail(event.target.value)}
                                        ></Input>
                                    </InputGroup>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "")
                                        }
                                    >

                                        <Input
                                            placeholder="Address..."
                                            type="text"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={(event) => setAddress(event.target.value)}
                                        ></Input>
                                    </InputGroup>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "")
                                        }
                                    >

                                        <Input
                                            placeholder="Caption..."
                                            type="textarea"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={(event) => setCaption(event.target.value)}
                                        ></Input>
                                    </InputGroup>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <DatePicker
                                            placeholder="Birthday"
                                            onChange={(event) => birthdayChange(event)}
                                        />
                                    </InputGroup>

                                    <InputFiles onChange={files => uploadImage(files[0])}>
                                        <Button className="btn-round" color="info"> Upload Photo </Button>
                                    </InputFiles>

                                </CardBody>
                                <CardFooter className="text-center">
                                    <Button
                                        block
                                        className="btn-round"
                                        color="info"
                                        onClick={createAccount}
                                        size="lg">
                                        Create Account
                                    </Button>

                                    <div className="pull-left">
                                        <h6>
                                            Already have an account?
                                            <Link
                                                className="btn-round"
                                                color="info"
                                                size="lg"
                                                to="/"
                                            >
                                                Login
                                                 </Link>

                                        </h6>
                                    </div>
                                  
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Container>
            </div>
        </div>

    );
}

export default Registration;
