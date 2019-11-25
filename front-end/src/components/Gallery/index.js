import React, { createRef, Component } from 'react';
import Slider from 'react-slick';
import autoBind from 'react-autobind';

import './styles.scss';

export class Gallery extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.activeItemIndex = 0;
    this.slider = createRef();
    this.gallery = createRef();
    this.firstPresented = false;
  }

  shouldComponentUpdate({ active }) {
    return this.props.active !== active;
  }

  componentDidUpdate() {
    const { active, items } = this.props;

    if (!this.firstPresented) {
      this.firstPresented = true;
      return;
    }

    if (items[this.activeItemIndex].type === 'video') {
      if (active) {
        this.gallery.current.querySelector(`video[data-id="${this.activeItemIndex}"]`).play();
      } else {
        this.gallery.current.querySelector(`video[data-id="${this.activeItemIndex}"]`).pause();
      }
    }
  }

  beforeChange(oldIndex, newIndex) {
    const { items } = this.props;

    if (items[oldIndex].type === 'video') {
      this.gallery.current.querySelector(`video[data-id="${oldIndex}"]`).pause();
    }
    if (items[newIndex].type === 'video') {
      this.gallery.current.querySelector(`video[data-id="${newIndex}"]`).play();
    }
    this.activeItemIndex = newIndex;
  }

  prev() {
    this.slider.current.slickPrev();
  }

  next() {
    this.slider.current.slickNext();
  }

  render() {
    const { items } = this.props;
    const settings = {
      dots: false,
      infinite: true,
      autoplay: false,
      arrows: false,
      swipe: false,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: this.beforeChange,
    };

    return (
      <div className="gallery-main">
        <div className="gallery-wrapper">
          <div className="gallery" ref={this.gallery}>
            <img
              src="/images/icons/arrow-left.svg"
              alt="Left arrow"
              className="arrow left"
              onClick={this.prev}
            />
            <img
              src="/images/icons/arrow-right.svg"
              alt="Right arrow"
              className="arrow right"
              onClick={this.next}
            />
            <Slider ref={this.slider} {...settings}>
              {items.map(({ type, content }, i) => (
                (() => {
                  switch (type) {
                    case 'video':
                      return (
                        <video
                          key={i}
                          data-id={i}
                          src={content || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                          controls
                        />
                      );
                    case 'picture':
                      return (
                        <img
                          key={i}
                          data-id={i}
                          src={content || 'https://homepages.cae.wisc.edu/~ece533/images/baboon.png'}
                          alt="Gallery item"
                        />
                      );
                    default:
                      return null;
                  }
                })()
              ))}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default Gallery;
