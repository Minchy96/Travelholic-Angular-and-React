import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'

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
    Col
} from "reactstrap";

// core components

function LoginPage(props) {

    const [firstFocus, setFirstFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    var [username, setUsername] = React.useState("");
    var [password, setPassword] = React.useState("");
    var [mistake, setMistake] = React.useState(false);

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

    function login() {
        axios.post('/user/login', { username: username, password: password }).then(response => {
            console.log(response.data);

            if (response.data == true ) {
                console.log("usao2");
                sessionStorage.setItem('username', username)
                props.history.push('/home');
            } else {
                setMistake(true);
                console.log("usao");
            }
        })
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
                            <Form  className="form" >

                                <CardBody>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (firstFocus ? " input-group-focus" : "")}>
                                        <Input
                                            placeholder="Username..."
                                            type="text"
                                            onFocus={() => setFirstFocus(true)}
                                            onBlur={() => setFirstFocus(false)}
                                            onChange={event => setUsername(event.target.value)}
                                        ></Input>
                                    </InputGroup>

                                    <InputGroup
                                        className={
                                            "no-border input-lg" +
                                            (lastFocus ? " input-group-focus" : "")}>
                                        <Input
                                            placeholder="Password..."
                                            type="password"
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={event => setPassword(event.target.value)}
                                        ></Input>
                                    </InputGroup>

                                </CardBody>
                                <CardFooter className="text-center">
                                    <Button
                                        block
                                        className="btn-round"
                                        color="info"
                                        onClick={event => login()}
                                        size="lg"
                                    >
                                        Login
                    </Button>
                                    <div className="pull-left">
                                        <h6>
                                            <Link
                                                className="btn-round"
                                                color="info"
                                                size="lg"
                                                to="/registration"
                                            >
                                                Create Account
                                                 </Link>

                                        </h6>
                                        {mistake == true ? <h6>Username or password is incorrect. Try again.</h6> : null}
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

export default LoginPage;
