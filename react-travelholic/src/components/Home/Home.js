import React, { Component } from "react";

// reactstrap components
import {
    Button,
    Input,
    InputGroup,
    Container,
} from "reactstrap";
import DatePicker from 'react-datetime';
import format from "date-fns/format";
import axios from 'axios';
import Posts from 'components/Posts/Posts'


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageHeader: null,
            firstFocus: '',
            lastFocus: '',
            start: '',
            end: '',
            city: '',
            country: '',
            cities: [],
            countries: [],
            findPrfile: '',
            profiles: [],
            viewSearch: false,

        };
    }



    componentDidMount() {
        axios.get('/country/getAll').then(response => {
            this.setState({ countries: response.data });
        })
        axios.get('/post/getAll').then(response => {
            this.setState({ posts: response.data });
        })
    }



    useEffect = async () => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                this.state.pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    }

    startChange(event) {
        this.setState({ start: (format(event._d, "yyyy-MM-dd")) })
    }

    endChange(event) {
        this.setState({ end: (format(event._d, "yyyy-MM-dd")) })
    }

    findCities(event) {
        console.log(event.target.value)
        axios.get('/city/get/' + event.target.value).then(response => {
            this.setState({ cities: response.data });
            console.log(response)
        })
        let drzava = event.target.value

        this.setState({ country: (drzava) })
        console.log(this.state.country)
    }

    chooseCity(event) {
        this.setState({ city: (event.target.value) })
        console.log(this.state.city)
    }

    searchFilteredPosts = async () => {
        this.setState({ viewSearch: true })

    }

    searchProfile = async () => {
        axios.get('/user/all/' + this.state.findPrfile).then(response => {
            this.setState({ profiles: response.data })
            console.log(response)
        })
    }

    goToProfile(event){
        console.log(event.target.value)
        this.props.history.push("/profile/"+event.target.value)
    }



    render() {
        let countriesList = this.state.countries.length > 0
            && this.state.countries.map((item, i) => {
                return (
                    <option key={i} value={item.name}>{item.name}</option>
                )
            }, this);

        let citiesList = this.state.countries.length > 0
            && this.state.cities.map((item, i) => {
                return (
                    <option key={i} value={item.name}>{item.name}</option>
                )
            }, this);

        let searchedProfiles = this.state.profiles.length > 0
            && this.state.profiles.map((item, i) => {
                return (
                    <option key={i} value={item.username}>
                        {item.firstName} {item.lastName}
                    </option>
                )
            }, this);


        return (
            <>
                <div className="page-header page-header-small">
                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")"
                        }}
                        ref={this.state.pageHeader}
                    ></div>
                    <div className="content-center">
                        <Container>
                            <div className="text-center">
                                <div className="form-inline">
                                    <div className="form-group col-md-3">
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (this.state.lastFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <Input
                                                placeholder="Search profile..."
                                                type="text"
                                                onFocus={() => this.setState({ lastFocus: true })}
                                                onBlur={() => this.setState({ lastFocus: false })}
                                                onChange={(event) => this.setState({ findPrfile: event.target.value })}
                                            ></Input>
                                        </InputGroup>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <Button className="btn btn-round" onClick={this.searchProfile}>Search</Button>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (this.state.lastFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <Input id="exampleFormControlSelect1" type="select"
                                                onFocus={() => this.setState({ firstFocus: true })}
                                                onBlur={() => this.setState({ firstFocus: false })}
                                                onChange={event => this.goToProfile(event)}>
                                                {
                                                    searchedProfiles
                                                }
                                            </Input>
                                        </InputGroup>
                                    </div>
                                </div>

                                <div className="form-inline">
                                    <div className="form-group col-md-6">
                                        <p className="h4">Start</p>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <p className="h4">End</p>
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group col-md-6">
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (this.state.lastFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <DatePicker
                                                onChange={(event) => this.startChange(event)}
                                            />
                                        </InputGroup>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (this.state.lastFocus ? " input-group-focus" : "")
                                            }
                                        >
                                            <DatePicker
                                                onChange={(event) => this.endChange(event)}
                                            />
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className="form-inline">
                                    <div className="form-group col-md-6">
                                        <p className="h4">Country</p>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <p className="h4">City</p>
                                    </div>
                                </div>

                                <div className="form-inline">
                                    <div className="form-group col-md-6">
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (this.state.lastFocus ? " input-group-focus" : "")
                                            }
                                        >

                                            <Input id="exampleFormControlSelect1" type="select"
                                                onFocus={() => this.setState({ firstFocus: true })}
                                                onBlur={() => this.setState({ firstFocus: false })}
                                                onChange={event => this.findCities(event)}>
                                                {
                                                    countriesList
                                                }

                                            </Input>
                                        </InputGroup>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <InputGroup
                                            className={
                                                "no-border input-lg" +
                                                (this.state.lastFocus ? " input-group-focus" : "")
                                            }
                                        >

                                            <Input id="exampleFormControlSelect1" type="select"
                                                onFocus={() => this.setState({ firstFocus: true })}
                                                onBlur={() => this.setState({ firstFocus: false })}
                                                onChange={event => this.chooseCity(event)}>
                                                {
                                                    citiesList
                                                }
                                            </Input>
                                        </InputGroup>
                                    </div>
                                </div>
                                <div><br />

                                    <h1>     {this.state.viewSearch.value}</h1>
                                    <Button className="btn btn-round btn-lg"
                                        onClick={event => this.setState({ viewSearch: true })}>Search</Button>
                                    <Button className="btn  btn-round btn-lg"
                                        onClick={event => this.setState({ viewSearch: false })}>See All</Button>
                                </div>



                            </div>
                        </Container>

                    </div>

                </div>
                <Container>
                    {this.state.viewSearch === false ?
                        <Posts type="home"></Posts> :
                        <Posts type="search"
                            searchCity={this.state.city}
                            searchCountry={this.state.country}
                            searchStart={this.state.start}
                            searchEnd={this.state.end}></Posts>
                    }


                </Container>
            </>
        );
    }
}

export default Home;
