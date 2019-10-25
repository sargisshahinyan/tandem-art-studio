import React, { createRef, Component } from 'react';
import Slider from 'react-slick';
import autoBind from 'react-autobind';

import './styles.scss';

export class Gallery extends Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.itemsRefs = Array(props.items.length).fill(null).map(createRef);
    this.activeItemIndex = 0;
    this.slider = createRef();
  }

  componentDidMount() {
    return;
    const { items, active } = this.props;

    if (active && items[0].type === 'video') {
      this.itemsRefs[0].current.play();
    }
  }

  shouldComponentUpdate({ active }) {
    return this.props.active !== active;
  }

  componentDidUpdate() {
    const { active, items } = this.props;
return;
    if (items[this.activeItemIndex].type === 'video') {
      if (active) {
        this.itemsRefs[this.activeItemIndex].current.play();
      } else {
        this.itemsRefs[this.activeItemIndex].current.pause();
      }
    }
  }

  beforeChange(oldIndex, newIndex) {
    return;
    const { items } = this.props;

    if (items[oldIndex].type === 'video') {
      this.itemsRefs[oldIndex].current.pause();
    }
    if (items[newIndex].type === 'video') {
      this.itemsRefs[newIndex].current.play();
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
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: this.beforeChange,
    };

    return (
      <div className="gallery">
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
                      ref={this.itemsRefs[i]}
                      src={content || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                      controls
                    />
                  );
                case 'picture':
                  return (
                    <img
                      key={i}
                      ref={this.itemsRefs[i]}
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
    );
  }
}

export default Gallery;
