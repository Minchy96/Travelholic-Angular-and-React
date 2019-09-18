import React, { Component } from "react";
import axios from 'axios';

// reactstrap components
import {
    Container,
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselIndicators
} from "reactstrap";

// core components



class CarouselSection extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            activeIndex: 0,
            animating: false,
            post: props.post
        };
    }

    componentWillReceiveProps(props) {
        if (props.post.id != this.state.post.id){
            console.log("menjaj"+props.post.title);
            this.setState({ post: props.post })
            let arr = []
            for (let j = 0; j < props.post.photos.length; j++) {
                axios.get('/post/getImage/' + props.post.photos[j].name).then(res => {
                    arr[j] = res.data
    
                })
            }
            this.setState({ items: arr })
        }

    }

    componentDidMount() {
        this.setState({ post: this.props.post })
        let arr = []
        for (let j = 0; j < this.state.post.photos.length; j++) {
            axios.get('/post/getImage/' + this.state.post.photos[j].name).then(res => {
                arr[j] = res.data

            })
        }
        this.setState({ items: arr })
    }


    render() {
        const onExiting = () => {
            this.setState({ animating: true });
        };
        const onExited = () => {
            this.setState({ animating: false });
        };
        const next = () => {
            if (this.state.animating) return;
            const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
            this.setState({ activeIndex: nextIndex });
        };
        const previous = () => {
            if (this.state.animating) return;
            const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
            this.setState({ activeIndex: nextIndex });
        };
        const goToIndex = newIndex => {
            if (this.state.animating) return;
            this.ssetActiveIndex(newIndex);
        };
        return (
            <>
                <div className="section" id="carousel">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg="8" md="12">
                                <Carousel
                                    activeIndex={this.state.activeIndex}
                                    next={next}
                                    previous={previous}
                                >
                                    <CarouselIndicators
                                        items={this.state.items}
                                        activeIndex={this.state.activeIndex}
                                        onClickHandler={goToIndex}
                                    />
                                    {this.state.items.map(item => {
                                        return (
                                            <CarouselItem
                                                onExiting={onExiting}
                                                onExited={onExited}
                                                key={item}
                                            >
                                                <img src={item} width="400px"
                                                    height="230px" />

                                            </CarouselItem>
                                        );
                                    })}
                                    <a
                                        className="carousel-control-prev"
                                        data-slide="prev"
                                        href="#pablo"
                                        onClick={e => {
                                            e.preventDefault();
                                            previous();
                                        }}
                                        role="button"
                                    >
                                        <i className="now-ui-icons arrows-1_minimal-left"></i>
                                    </a>
                                    <a
                                        className="carousel-control-next"
                                        data-slide="next"
                                        href="#pablo"
                                        onClick={e => {
                                            e.preventDefault();
                                            next();
                                        }}
                                        role="button"
                                    >
                                        <i className="now-ui-icons arrows-1_minimal-right"></i>
                                    </a>
                                </Carousel>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }
}

export default CarouselSection;
