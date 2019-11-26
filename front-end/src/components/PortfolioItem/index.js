import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { convertText } from '../../utils';

import { loadPortfolio } from '../../actions/portfolios';

import './styles.scss';

export class PortfolioItem extends PureComponent {
  componentDidMount() {
    const { loadPortfolio, portfolio } = this.props;

    if (portfolio) this.setBackgroundColor();
    else loadPortfolio();
  }

  componentDidUpdate(prevProps) {
    const { portfolio } = this.props;

    if (portfolio !== prevProps.portfolio) this.setBackgroundColor();
  }

  setBackgroundColor() {
    const { portfolio } = this.props;

    const { background_color: backgroundColor } = portfolio;

    document.body.style.setProperty('background-color', backgroundColor);
  }

  render() {
    const { portfolio } = this.props;

    if (!portfolio) return null;

    const {
      title,
      description,
      main_picture: mainPicture,
      sections,
    } = portfolio;

    return (
      <main className="portfolio-single">
        <img
          className="main-picture"
          src={mainPicture}
          alt="Main"
        />
        <h1 className="title">
          {title}
        </h1>
        <p className="description">
          {convertText(description)}
        </p>
        <div className="sections">
          {sections.map(({ id, images }) => (
            <section
              key={id}
              className="section"
            >
              {images.map(({ id, src }) => (
                <div key={id} className="section-img-wrapper">
                  <img src={src} alt={title} />
                </div>
              ))}
            </section>
          ))}
        </div>
      </main>
    );
  }
}

function mapToStateProps({ portfolios: { selected }, common: { width } }) {
  return {
    width,
    portfolio: selected,
  };
}

function mapToDispatchProps(dispatch) {
  return {
    loadPortfolio: id => dispatch(loadPortfolio(id)),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;

  return {
    ...stateProps,
    loadPortfolio: () => dispatchProps.loadPortfolio(id),
  };
}

export default connect(mapToStateProps, mapToDispatchProps, mergeProps)(PortfolioItem);
