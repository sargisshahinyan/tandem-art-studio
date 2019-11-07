import React, { PureComponent, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import autoBind from 'react-autobind';
import Swipe from 'react-easy-swipe';
import { Animated } from 'react-animated-css';

import { ITEMS_ON_SCREEN } from '../../data/portfolio';

import { loadPortfolios } from '../../actions/portfolios';

import './styles.scss';

export class MainPortfolio extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    const { itemsInPage } = (
      ITEMS_ON_SCREEN.find(({ width }) => props.width >= width)
      || ITEMS_ON_SCREEN[0]
    );

    this.portfolio = createRef();
    this.animationTimer = 0;
    this.state = {
      level: 0,
      itemsInPage,
    };
    this.scrolling = false;
  }

  componentDidMount() {
    const { loadPortfolios, portfolios } = this.props;
    if (!portfolios.length) loadPortfolios();

    window.addEventListener('wheel', this.onScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.onScroll);
    clearTimeout(this.animationTimer);
  }

  static getDerivedStateFromProps(props, state) {
    const { itemsInPage } = (
      ITEMS_ON_SCREEN.find(({ width }) => props.width >= width)
      || ITEMS_ON_SCREEN[0]
    );

    if (itemsInPage !== state.itemsInPage) {
      return {
        itemsInPage,
      };
    }

    return null;
  }

  onScroll({ deltaY }) {
    if (this.scrolling) return;

    const { level, itemsInPage } = this.state;
    const { portfolios } = this.props;

    const maxLevels = Math.ceil(portfolios.length / (itemsInPage / 2)) - 2;

    if (deltaY > 0 && level < maxLevels) {
      this.scrolling = true;
      this.setState({
        up: false,
        down: true,
        level: level + 1,
      }, () => {
        this.animationTimer = setTimeout(() => {
          this.scrolling = false;
        }, 2000);
      });
    }

    if (deltaY < 0 && level > 0) {
      this.scrolling = true;
      this.setState({
        up: true,
        down: false,
        level: level - 1,
      }, () => {
        this.animationTimer = setTimeout(() => {
          this.scrolling = false;
        }, 2000);
      });
    }
  }

  onSwipeMove({ x, y }) {
    if (Math.abs(x) < Math.abs(y)) this.onScroll({ deltaY: -y });
  }

  render() {
    let {
      portfolios,
      match: { path },
    } = this.props;
    const {
      level,
      itemsInPage,
    } = this.state;

    return (
      <div className="portfolio-wrapper">
        <Swipe onSwipeMove={this.onSwipeMove}>
          <div
            className="portfolio"
            ref={this.portfolio}
            style={{
              marginTop: `calc(${level * 35}px - ${level * 50}vh)`
            }}
          >
            {portfolios.map((portfolio, i) => (
              <Animated
                key={portfolio.id}
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInDelay={500 + (i % (itemsInPage / 2)) * 250}
                isVisible={
                  i >= level * (itemsInPage / 2)
                  && i < itemsInPage + level * (itemsInPage / 2)
                }
              >
                <div
                  className="portfolio-item"
                >
                  <Link
                    className="portfolio-item-wrapper"
                    to={`${path}/${portfolio.id}`}
                    style={{
                      backgroundImage: `url('${portfolio.presentable_picture}')`
                    }}
                  />
                </div>
              </Animated>
            ))}
          </div>
        </Swipe>
      </div>
    );
  }
}

function mapToStateProps({ pages, portfolios, common: { width } }) {
  const { data } = pages.pagesList.find(item => item.path === '/portfolio') || {};

  return {
    data,
    width,
    portfolios: portfolios.list,
  };
}

function mapToDispatchProps(dispatch) {
  return {
    loadPortfolios: () => dispatch(loadPortfolios()),
  };
}

export default connect(mapToStateProps, mapToDispatchProps)(MainPortfolio);
