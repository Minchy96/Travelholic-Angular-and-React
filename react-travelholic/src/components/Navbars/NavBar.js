
// reactstrap components
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Navbar,
    NavItem,
    Nav,
    Container,
} from "reactstrap";
import React from "react";
import { Link } from 'react-router-dom'

function NavBar(props) {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [collapseOpen, setCollapseOpen] = React.useState(false);

    React.useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 399 ||
                document.body.scrollTop > 399
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 400 ||
                document.body.scrollTop < 400
            ) {
                setNavbarColor("navbar-transparent");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });


    function login() {
        sessionStorage.setItem('username', null)
        props.history.push('')
    }


    return (
        <>
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
                <Container>
                    
                <Collapse
                        className=""
                        isOpen={collapseOpen}
                        navbar
                    >
                        <Nav navbar>
                            <NavItem>
                                <Link to="/home">
                                    Home
                                 </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    <UncontrolledDropdown className="button-dropdown">
                        <DropdownToggle
                            caret
                            data-toggle="dropdown"
                            href="#pablo"
                            id="navbarDropdown"
                            tag="a"
                            onClick={e => e.preventDefault()}
                        >
                            <span className="button-bar"></span>
                            <span className="button-bar"></span>
                            <span className="button-bar"></span>
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="navbarDropdown">
                            <DropdownItem header tag="a">
                                Travelholic Settings
              </DropdownItem>
                            <DropdownItem onClick={e => e.preventDefault()}>
                                <Link className="dropdown-item" to={"/profile/" + sessionStorage.getItem('username')} > View Profile </Link>
                            </DropdownItem>
                            <DropdownItem onClick={e => e.preventDefault()}>
                                <Link className="dropdown-item" to='/' onClick={event => sessionStorage.setItem('username', null)}>Logout</Link>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>


                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
