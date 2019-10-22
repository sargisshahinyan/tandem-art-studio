import React, { memo, useState } from 'react';
import { connect } from "react-redux";

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
    return (
      <article className='bg_about'>
        <Header opened={opened}/>
        <main className='about_content centering_content'>
          <div className='title'>
            <div className='wrapper'>
              <h1>About Us</h1>
            </div>
          </div>
          <div className='text_content with_bg'>
            <div className='wrapper'>
              <div className={'content ' + bigContent}
                   onScroll={e => {e.stopPropagation()}}
                   onWheel={e => {e.stopPropagation()}}
                   onTouchStart={e => {e.preventDefault()}}
                   onTouchMove={e => {e.stopPropagation()}}
              >
                <p>{convertText(description)}</p>
                <div className={wrapperHidden + ' textWrapper'} onClick={() => setMode(!opened)}>
                  <span/>
                  <span/>
                  <span/>
                </div>
              </div>
              <div className={arrowHidden + ' hiddenArrow'} onClick={() => setMode(!opened)}>
                <img src="/images/icons/arrow-left.svg" alt=""/>
              </div>
            </div>
          </div>
          <Signature/>
        </main>
        <BasicFooter opened={opened}/>
        <HiddenFooter/>
      </article>
    );
  }
);

const mapToStateProps = ({ common: {width} }) => ({
  width
});

export default connect(mapToStateProps)(About);
