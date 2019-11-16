import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import Swipe from 'react-easy-swipe';
import { Animated } from 'react-animated-css';

import { ITEMS_ON_SCREEN } from '../../data/portfolio';

import { loadPortfolios } from '../../actions/portfolios';

import './styles.scss';

const FREEZE_PERIOD = 2000;

export class MainPortfolio extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    const { itemsInLine } = (
      ITEMS_ON_SCREEN.find(({ width }) => props.width >= width)
      || ITEMS_ON_SCREEN[0]
    );

    this.portfolios = createRef();
    this.animationTimer = 0;
    this.state = {
      level: 0,
      height: 0,
      rowsCount: 0,
      itemHeight: (props.width / itemsInLine),
      itemsInLine,
    };
    this.scrolling = false;
  }

  componentDidMount() {
    const { loadPortfolios, portfolios } = this.props;
    if (!portfolios.length) loadPortfolios();

    window.addEventListener('wheel', this.onScroll, { passive: true });
    this.onResize();
  }

  componentDidUpdate({ width: prevWidth, height: prevHeight }) {
    const { width: currentWidth, height: currentHeight } = this.props;

    if (prevWidth !== currentWidth || prevHeight !== currentHeight) this.onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.onScroll);
    clearTimeout(this.animationTimer);
  }

  static getDerivedStateFromProps(props, state) {
    const { itemsInLine } = (
      ITEMS_ON_SCREEN.find(({ width }) => props.width >= width)
      || ITEMS_ON_SCREEN[0]
    );

    if (itemsInLine !== state.itemsInLine) {
      return {
        itemsInLine,
      };
    }

    return null;
  }

  onScroll({ deltaY }) {
    if (this.scrolling) return;

    const { level, itemsInLine, rowsCount } = this.state;
    const { portfolios } = this.props;

    const maxLevels = Math.ceil(portfolios.length / itemsInLine) - rowsCount;

    if (deltaY > 0 && level < maxLevels) this.changeLevel(1);
    if (deltaY < 0 && level > 0) this.changeLevel(-1);
  }

  onResize() {
    const { width } = this.props;
    const { itemsInLine } = this.state;

    const itemHeight = Math.floor(width / itemsInLine);
    const rowsCount = Math.floor(this.portfolios.current.clientHeight / itemHeight);
    const height = rowsCount * itemHeight;

    this.setState({
      itemHeight,
      rowsCount,
      height,
    });
  }

  onSwipeMove({ x, y }) {
    if (Math.abs(x) < Math.abs(y)) this.onScroll({ deltaY: -y });
  }

  changeLevel(step) {
    this.scrolling = true;
    this.setState(({ level }) => ({
      level: level + step,
    }), () => {
      this.animationTimer = setTimeout(() => {
        this.scrolling = false;
      }, FREEZE_PERIOD);
    });
  }

  render() {
    let {
      portfolios,
      match: { path },
    } = this.props;
    const {
      level,
      height,
      rowsCount,
      itemHeight,
      itemsInLine,
    } = this.state;

    return (
      <div className="portfolios-wrapper" ref={this.portfolios}>
        <Swipe onSwipeMove={this.onSwipeMove}>
          <div className="portfolios-container" style={{ height: `${height}px`, }}>
            <div
              className="portfolios"
              style={{
                marginTop: `-${level * itemHeight}px`
              }}
            >
              {portfolios.map((portfolio, i) => (
                <Animated
                  key={portfolio.id}
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  animationInDelay={500 + (i % itemsInLine) * 250}
                  isVisible={
                    i >= level * itemsInLine
                    && i < (rowsCount * itemsInLine) + level * itemsInLine
                  }
                  style={{
                    height: `${itemHeight}px`,
                    width: `${itemHeight}px`,
                    display: 'inline-block',
                  }}
                >
                  <div className="portfolio-item">
                    <Link
                      className="portfolio-item-wrapper"
                      to={`${path}/${portfolio.id}`}
                      style={{
                        backgroundImage: `url('${portfolio.presentable_picture}')`,
                      }}
                    >
                      <div className="title">
                        {portfolio.title}
                      </div>
                    </Link>
                  </div>
                </Animated>
              ))}
            </div>
          </div>
        </Swipe>
      </div>
    );
  }
}

function mapToStateProps({ pages, portfolios, common: { width, height } }) {
  const { data } = pages.pagesList.find(item => item.path === '/portfolio') || {};

  return {
    data,
    width,
    height,
    portfolios: portfolios.list.length ? Array(16).fill(null).map(() => ({
      ...portfolios.list[0],
      id: Math.random(),
    })) : [],
  };
}

function mapToDispatchProps(dispatch) {
  return {
    loadPortfolios: () => dispatch(loadPortfolios()),
  };
}

export default connect(mapToStateProps, mapToDispatchProps)(MainPortfolio);
