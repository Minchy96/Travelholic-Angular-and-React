import React, { Component } from "react";
import axios from 'axios';
import DatePicker from 'react-datetime';
import format from "date-fns/format";
import InputFiles from 'react-input-files';
import About from './about/About'
import Favourite from './favourite/Favourite'
import SeePosts from './seePosts/SeePosts'
import EditProfile from './editProfile/EditProfile'

// reactstrap components
import {
    Button,
    Container,
    Modal,
    Input,
    InputGroup
} from "reactstrap";


class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            viewUsername: props.match.params.username,
            pageHeader: null,
            pills: '2',
            username: sessionStorage.getItem('username'),
            person: '',
            profilePhoto: '',
            modalLive: false,
            modalEmail: false,
            postTitle: '',
            postDescription: '',
            postAmount: 0,
            postStart: '',
            postEnd: '',
            postCity: '',
            postCountry: '',
            postImages: [],
            priviewImages: [],
            imageSrc: '',
            lastFocus: false,
            about: true,
            editProfile: false,
            favourite: false,
            seePosts: false,
            messageText: '',

        };
    }

    componentWillMount() {
        this.setState({ username: sessionStorage.getItem('username') })
        console.log(sessionStorage.getItem('username'))
        axios.get('/user/get/' + this.state.viewUsername).then(response => {
            this.setState({ person: response.data })
            console.log(response.data)
            if (response.data.imageName != null) {
                axios.get('/user/getImage/' + response.data.imageName).then(resp => {
                    this.setState({ profilePhoto: resp.data });
                    console.log(resp.data)
                })
            }
        })
    }

    useEffect() {
        document.body.classList.add("profile-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");

        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                this.state.pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
                document.body.classList.remove("profile-page");
                document.body.classList.remove("sidebar-collapse");
            };
        }
    };

    uploadImage(imagefile) {
        console.log(imagefile)
        let data = new FormData();
        data.append('file', imagefile);
        this.setState({ postImages: this.state.postImages.concat(data) })


        const file = imagefile;
        const reader = new FileReader();
        reader.onload = e => this.setState({ imageSrc: reader.result });
        reader.readAsDataURL(file);
        console.log(this.imageSrc)
        //this.priviewImages.push(this.imageSrc);
        this.setState({ priviewImages: this.state.priviewImages.concat(this.state.imageSrc) })



    }

    addPost = async () => {
        axios.post('/post/save', {
            title: this.state.postTitle,
            description: this.state.postDescription,
            start: this.state.postStart,
            end: this.state.postEnd,
            city: this.state.postCity,
            country: this.state.postCountry,
            username: this.state.username,
            amount: this.state.postAmount
        }).then(response => {
            if (this.state.postImages.length > 0) {

                for (let i = 0; i < this.state.postImages.length; i++) {
                    console.log(this.state.postImages[i], "slika i prilika")
                    axios.post('/post/uploadImage/' + response.data.id, this.state.postImages[i]).then(res => {
                        console.log(res.data)
                        this.setState({ priviewImages: [] })
                        this.setState({ postImages: [] })
                    })
                }
            }
        })
    }

    removePhoto = async (number) => {
        console.log(number)
        let arrayPreview = this.state.priviewImages;
        arrayPreview.splice(number, 1);
        this.setState({ priviewImages: arrayPreview })

        let arrayDB = this.state.postImages;
        arrayDB.splice(number, 1);
        this.setState({ postImages: arrayDB })
    }

    seeAbout() {
        this.setState({ about: true })
        this.setState({ favourite: false })
        this.setState({ editProfile: false })
        this.setState({ seePosts: false })
    }

    seeFavourite() {
        this.setState({ about: false })
        this.setState({ favourite: true })
        this.setState({ editProfile: false })
        this.setState({ seePosts: false })
    }

    seePostsFromUser() {
        this.setState({ about: false })
        this.setState({ favourite: false })
        this.setState({ editProfile: false })
        this.setState({ seePosts: true })
    }

    seeEditProfile() {
        this.setState({ about: false })
        this.setState({ favourite: false })
        this.setState({ editProfile: true })
        this.setState({ seePosts: false })
    }

    sendEmail() {
        axios.post('/user/sendEmail', {
            fromUsername: sessionStorage.getItem('username'),
            toUsername: this.state.viewUsername,
            text: this.state.messageText
        }).then(response => {
            console.log(response.data)
        })

        this.setState({ modalEmail: false })
    }
    componentWillReceiveProps(props) {
        console.log(props.match.params.username)
        if (props.match.params.username != this.state.viewUsername) {
            this.setState({ viewUsername: props.match.params.username })
            window.location.reload();
        }
    }

    render() {
        let checkImage = this.state.profilePhoto == '' ?
            <img src={require("assets/img/profile.png")} className="rounded-circle" alt="" width="300px"
                height="300px" />
            : <img alt="..." src={this.state.profilePhoto} className="rounded-circle" alt="" width="300px"
                height="300px" />;

        const imagesForNewPost = []
        imagesForNewPost.push(
            <div key="d0">
                <img src={this.state.imageSrc} key="0" width="200px" height="150px" alt="nije moguce prikazati sliku" />
                <Button
                    key="b0"
                    type="button"
                    onClick={() => this.removePhoto(0)}>
                    Remove photo<i className="now-ui-icons ui-1_simple-remove"></i>
                </Button>
            </div>
        )

        let showComponent;
        if (this.state.about == true)
            showComponent = <About person={this.state.person}></About>
        if (this.state.favourite == true)
            showComponent = <Favourite person={this.state.person}></Favourite>
        if (this.state.seePosts == true)
            showComponent = <SeePosts username={this.state.viewUsername}></SeePosts>
        if (this.state.editProfile == true)
            showComponent = <EditProfile person={this.state.person}></EditProfile>



        for (let i = 1; i < this.state.priviewImages.length; i++) {
            imagesForNewPost.push(
                <div key={"d" + i}>
                    <img src={this.state.priviewImages[i]} key={i} width="200px" height="150px" alt="nije moguce prikazati sliku" />
                    <Button
                        key={"b" + i}
                        type="button"
                        onClick={() => this.removePhoto(i)}>
                        Remove photo<i className="now-ui-icons ui-1_simple-remove"></i>
                    </Button>
                </div>);
        }


        return (
            <>
                <div
                    className="page-header clear-filter page-header-small"
                    filter-color="blue">
                    <div
                        className="page-header-image"
                        style={{
                            backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
                        }}
                        ref={this.state.pageHeader}
                    ></div>
                    <Container>
                        <div className="photo-container">
                            {checkImage}
                        </div>
                        <h1 className="title">{this.state.person.firstName} {this.state.person.lastName}</h1>
                    </Container>
                </div>
                <div className="wrapper">
                    <div className="section">
                        <Container>
                            <Button
                                color="info"
                                type="button"
                                onClick={() => this.seeAbout()} >
                                About
                            </Button>
                            {this.state.viewUsername == this.state.username ? <Button
                                color="info"
                                type="button"
                                onClick={() => this.setState({ modalLive: true })}>
                                Add post
                            </Button> : null}
                            <Button
                                color="info"
                                type="button"
                                onClick={() => this.seePostsFromUser()}>
                                See Posts
                            </Button>
                            {this.state.viewUsername == this.state.username ? <Button
                                color="info"
                                type="button"
                                onClick={() => this.seeEditProfile()}>
                                Edit Profile
                            </Button> : null}
                            {this.state.viewUsername == this.state.username ? <Button
                                color="info"
                                type="button"
                                onClick={() => this.seeFavourite()}>
                                Favourite
                            </Button> : null}

                            {this.state.viewUsername != this.state.username ? <Button
                                color="info"
                                type="button"
                                onClick={() => this.setState({ modalEmail: true })}
                            >
                                Send E-mail
                            </Button> : null}



                        </Container>
                    </div>
                </div>
                <div>
                    <Container>
                        {showComponent}
                    </Container>
                </div>

                <Modal toggle={() => this.setState({ modalLive: false })} isOpen={this.state.modalLive}>
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLiveLabel">
                            New Post
          </h3>
                        <button
                            aria-label="Close"
                            className="close"
                            type="button"
                            onClick={() => this.setState({ modalLive: false })}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <InputGroup
                            className={
                                "no-border input-lg" +
                                (this.state.lastFocus ? " input-group-focus" : "")}>
                            <Input
                                placeholder="Title..."
                                type="text"
                                onFocus={() => this.setState({ lastFocus: true })}
                                onBlur={() => this.setState({ lastFocus: false })}
                                onChange={(event) => this.setState({ postTitle: event.target.value })}
                            ></Input>
                        </InputGroup>

                        <InputGroup
                            className={
                                "no-border input-lg" +
                                (this.state.lastFocus ? " input-group-focus" : "")}>
                            <Input
                                placeholder="Description..."
                                type="textarea"
                                onFocus={() => this.setState({ lastFocus: true })}
                                onBlur={() => this.setState({ lastFocus: false })}
                                onChange={(event) => this.setState({ postDescription: event.target.value })}
                            ></Input>
                        </InputGroup>

                        <InputGroup
                            className={
                                "no-border input-lg" +
                                (this.state.lastFocus ? " input-group-focus" : "")}>
                            <Input
                                placeholder="Amount..."
                                type="text"
                                onFocus={() => this.setState({ lastFocus: true })}
                                onBlur={() => this.setState({ lastFocus: false })}
                                onChange={(event) => this.setState({ postAmount: event.target.value })}
                            ></Input>
                        </InputGroup>

                        <InputGroup
                            className={
                                "no-border input-lg" +
                                (this.state.lastFocus ? " input-group-focus" : "")}>
                            Start <DatePicker
                                placeholder="Start"
                                onChange={(event) => this.setState({ postStart: format(event._d, "yyyy-MM-dd") })} />
                        </InputGroup>

                        <InputGroup
                            className={
                                "no-border input-lg" +
                                (this.state.lastFocus ? " input-group-focus" : "")}>
                            End  <DatePicker
                                placeholder="End"
                                timeFormat={false}
                                onChange={(event) => this.setState({ postEnd: format(event._d, "yyyy-MM-dd") })} />
                        </InputGroup>

                        <InputGroup
                            className={
                                "no-border input-lg" +
                                (this.state.lastFocus ? " input-group-focus" : "")}>
                            <Input
                                placeholder="City..."
                                type="text"
                                onFocus={() => this.setState({ lastFocus: true })}
                                onBlur={() => this.setState({ lastFocus: false })}
                                onChange={(event) => this.setState({ postCity: event.target.value })}
                            ></Input>
                        </InputGroup>

                        <InputGroup
                            className={
                                "no-border input-lg" +
                                (this.state.lastFocus ? " input-group-focus" : "")}>
                            <Input
                                placeholder="Country..."
                                type="text"
                                onFocus={() => this.setState({ lastFocus: true })}
                                onBlur={() => this.setState({ lastFocus: false })}
                                onChange={(event) => this.setState({ postCountry: event.target.value })}
                            ></Input>
                        </InputGroup>

                        <InputGroup>
                            <InputFiles onChange={files => this.uploadImage(files[0])}>
                                <Button className="btn-round" color="info">Upload Photo</Button>
                            </InputFiles>
                        </InputGroup>
                        <div>
                            {
                                this.state.priviewImages.length > 0 ? imagesForNewPost : null
                            }
                        </div>




                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            type="button"
                            onClick={() => this.setState({ modalLive: false })}
                        >
                            Close
          </Button>
                        <Button
                            color="primary"
                            type="button"
                            onClick={() => this.addPost()}// this.setState({ modalLive: false })}
                        >
                            Save changes
          </Button>
                    </div>
                </Modal>

                <Modal toggle={() => this.setState({ modalEmail: false })} isOpen={this.state.modalEmail}>
                    <div className="modal-header">
                        <h2 className="modal-title" id="exampleModalLiveLabel">
                            Send E-mail
          </h2>
                        <button
                            aria-label="Close"
                            className="close"
                            type="button"
                            onClick={() => this.setState({ modalEmail: false })}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Input type="textarea" placeholder="Type a message..." onChange={event => this.setState({ messageText: event.target.value })} >
                        </Input>
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            type="button"
                            onClick={() => this.setState({ modalEmail: false })}
                        >
                            Close
          </Button>
                        <Button
                            color="primary"
                            type="button"
                            onClick={() => this.sendEmail()}
                        >
                            Send
          </Button>
                    </div>
                </Modal>
            </>
        );
    }
}

export default Profile;
