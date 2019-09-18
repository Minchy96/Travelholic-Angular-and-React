import React, { Component } from 'react'
import axios from 'axios';

import {
    Button,
    Card,
    CardBody,
    Input,
} from "reactstrap";
import { Link } from 'react-router-dom'
import CarouselSection from 'components/CarouselSection/CarouselSection'

class Posts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            postImages: [],
            comm: '',
            type: props.type,
            changes: 0,
            username: props.username
        };
    }


    componentDidMount() {
        if (this.state.type == "seePosts") {
            axios.get('/post/get/' + this.state.username).then(res => {
                console.log(res.data)
                let darr = res.data
                this.setState({ posts: darr })
            })
        }

        if (this.state.type == "favourite") {
            axios.get('/post/getFavourite/' + sessionStorage.getItem('username')).then(res => {
                console.log(res.data)
                let darr = res.data
                this.setState({ posts: darr })
            })
        }

        if (this.state.type == "home") {
            axios.get('/post/getAll').then(res => {
                console.log(res.data)
                this.setState({ posts: res.data })
            })
        }

        if (this.state.type == "search") {
            axios.post('/post/search', {
                start: this.props.searchStart,
                end: this.props.searchEnd,
                city: this.props.searchCity,
                country: this.props.searchCountry
            }).then(response => {
                this.setState({ posts: response.data })
            })
        }
    }


    leaveComment(number) {
        axios.post('/comment/save', {
            text: this.state.comm,
            username: sessionStorage.getItem('username'),
            postId: number
        }).then(response => {
            console.log(response)
            if (this.props.type == "seePosts") {
                axios.get('/post/get/' +this.state.username).then(res => {
                    console.log(res.data)
                    let darr = res.data
                    this.setState({ posts: darr })
                })
            }
            if (this.props.type == "favourite") {
                axios.get('/post/getFavourite/' + sessionStorage.getItem('username')).then(res => {
                    console.log(res.data)
                    let darr = res.data
                    this.setState({ posts: darr })
                })
            }
            if (this.props.type == "home") {
                axios.get('/post/getAll').then(res => {
                    console.log(res.data)
                    this.setState({ posts: res.data })
                })
            }

            if (this.props.type == "search") {
                axios.post('/post/search', {
                    start: this.props.searchStart,
                    end: this.props.searchEnd,
                    city: this.props.searchCity,
                    country: this.props.searchCountry
                }).then(response => {
                    this.setState({ posts: response.data })
                })
            }
        })
    }

    deleteComment(number) {
        axios.delete('/comment/delete/' + number).then(response => {
            if (this.props.type == "seePosts") {
                axios.get('/post/get/' + this.state.username).then(res => {
                    console.log(res.data)
                    let darr = res.data
                    this.setState({ posts: darr })
                })
            }
            if (this.props.type == "favourite") {
                axios.get('/post/getFavourite/' + sessionStorage.getItem('username')).then(res => {
                    console.log(res.data)
                    let darr = res.data
                    this.setState({ posts: darr })
                })
            }
            if (this.props.type == "home") {
                axios.get('/post/getAll').then(res => {
                    console.log(res.data)
                    this.setState({ posts: res.data })
                })
            }

            if (this.props.type == "search") {
                axios.post('/post/search', {
                    start: this.props.searchStart,
                    end: this.props.searchEnd,
                    city: this.props.searchCity,
                    country: this.props.searchCountry
                }).then(response => {
                    this.setState({ posts: response.data })
                })
            }





        })
        this.setState({ changes: this.state.changes + 1 })
    }

    deletePost(number) {
        axios.delete('/post/delete/' + number).then(response => {
            axios.get('/post/get/' + sessionStorage.getItem('username')).then(res => {
                console.log(res.data)
                let darr = res.data
                this.setState({ posts: darr })
            })
        })
    }

    removeFavourite(number) {
        axios.get('/post/removeFavourite/' + sessionStorage.getItem('username') + "/" + number).then(response => {
            axios.get('/post/getFavourite/' + sessionStorage.getItem('username')).then(res => {
                console.log(res.data)
                let darr = res.data
                this.setState({ posts: darr })
            })
        })
    }

    componentWillReceiveProps(props) {
        if (props.type != this.state.type) {
            this.setState({ type: props.type })
            if (props.type == "home") {
                axios.get('/post/getAll').then(res => {
                    console.log(res.data)
                    this.setState({ posts: res.data })
                })
            }

            if (props.type == "search") {
                axios.post('/post/search', {
                    start: props.searchStart,
                    end: props.searchEnd,
                    city: props.searchCity,
                    country: props.searchCountry
                }).then(response => {
                    console.log(response.data)
                    this.setState({ posts: response.data })
                })
            }
            this.setState({ changes: this.state.changes + 1 })
        }
    }

    addFavourite(postNum) {
        axios.get('/post/favourite/' + sessionStorage.getItem('username') + '/' + postNum).then(response => {
            console.log(response.data)
        })
    }

    render() {
        let searchCity = this.props.type == "seach" ? this.state.searchCity : '';
        let searchCountry = this.props.type == "seach" ? this.props.searchCountry : '';
        let searchStart = this.props.type == "seach" ? this.props.searchStart : '';
        let searchEnd = this.props.type == "seach" ? this.props.searchEnd : '';



        return (
            <div className="row justify-content-center" >
                {
                    this.state.posts.map((post, i) => {
                        return (<Card key={"c" + i}>
                            <CardBody key={"cb" + i}>
                                <Card key={"c1" + i}>
                                    <CardBody key={"cb1" + i} >
                                        <div className="section-story-overview">
                                            <div className="row">
                                                <div className="col-md-6">
                                                   
                                                    {
                                                        post.photos.length > 0 ?
                                                            <CarouselSection key={'cs' + i}
                                                                post={post}></CarouselSection>
                                                            : null
                                                    }
                                                    <div className="row justify-content-center">
                                                        {(this.props.type == "seePosts" ) && (this.state.username == sessionStorage.getItem('username') )?
                                                         <Button type="button" className="btn btn-info"
                                                            onClick={event => this.deletePost(post.id)}>
                                                            Delete </Button> : null}

                                                        {this.props.type == "favourite" ? <Button type="button" className="btn btn-info"
                                                            onClick={event => this.removeFavourite(post.id)}>
                                                            Remouve Favourite </Button> : null}

                                                        {post.user.username != sessionStorage.getItem('username') && (this.props.type == "home" || this.props.type == "seePost")
                                                            ? <Button type="button" className="btn btn-info"
                                                                onClick={event => this.addFavourite(post.id)}>
                                                                Add Favourite </Button> : null}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <h4> {post.title}</h4>
                                                    <p>{post.description}</p>
                                                    <p>Cena putovanja je {post.amount} e.</p>
                                                    <p>U periodu izmedju  {post.start} -  {post.end}.</p>
                                                   <Link to={"/profile/"+post.user.username}>
                                                    <h5 className="text-right"> {post.user.firstName} {post.user.lastName}</h5>
                                                    </Link>
                                                    {
                                                        post.comments.map(comment => {
                                                            return (
                                                                <h5 key={"h" + comment.id}>
                                                                    <Link to={"/profile/"+comment.user.username}>
                                                                    {comment.user.firstName} {comment.user.lastName}
                                                                    </Link>: {comment.text}
                                                                    {comment.user.username == sessionStorage.getItem('username') ?
                                                                    <i className="now-ui-icons ui-1_simple-remove"
                                                                        onClick={event => this.deleteComment(comment.id)}></i>
                                                                    : null}
                                                                </h5>
                                                            )
                                                        })
                                                    }
                                                    <Input type="text" placeholder="Comment..." key={i + 'ci'}
                                                        onChange={event => this.setState({ comm: event.target.value })}></Input>
                                                    <Button key={i + 'cb'} className="btn btn-info"
                                                        onClick={event => this.leaveComment(post.id)}>Comment</Button>
                                                </div>

                                            </div>
                                        </div>

                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                        )
                    })
                }


            </div>
        )
    }
}

export default Posts;