import React, { memo, useState } from 'react';
import { connect } from 'react-redux';

import Header from '../Header';
import BasicFooter from '../BasicFooter';
import HiddenFooter from '../HiddenFooter'
import Signature from '../Signature';

import { convertText } from '../../utils';

import './styles.scss';

export const About = memo(
  function About({ description, width }) {
    const [opened, setMode] = useState(false);
    const wrapperHidden = (opened || width > 767) ? 'hidden' : '';
    const arrowHidden = (opened && width <= 767) ? '' : 'hidden';
    const bigContent = (opened && width <= 767) ? 'opened' : '';
    const eventBinder = {
      onScroll: e => width <= 767 && e.stopPropagation(),
      onWheel: e => width <= 767 && e.stopPropagation(),
      onTouchStart: e => width <= 767 && e.preventDefault(),
      onTouchMove: e => width <= 767 && e.stopPropagation(),
    };

    return (
      <article className="bg_about">
        <Header opened={opened} />
        <main className="about_content centering_content">
          <div className="title">
            <div className="wrapper">
              <h1>About Us</h1>
            </div>
          </div>
          <div className="text_content with_bg">
            <div className="wrapper">
              <div
                className={'content ' + bigContent}
                {...eventBinder}
              >
                <p>{convertText(description)}</p>
                <div className={wrapperHidden + ' textWrapper'} onClick={() => setMode(!opened)}>
                  {Array(3).fill(null).map((v, i) => (
                    <span key={i} />
                  ))}
                </div>
              </div>
              <div className={arrowHidden + ' hiddenArrow'} onClick={() => setMode(!opened)}>
                <img src="/images/icons/arrow-left.svg" alt="Expand" />
              </div>
            </div>
          </div>
          <Signature />
        </main>
        <BasicFooter />
        <HiddenFooter />
      </article>
    );
  }
);

const mapToStateProps = ({ common: { width } }) => ({
  width,
});

export default connect(mapToStateProps)(About);
