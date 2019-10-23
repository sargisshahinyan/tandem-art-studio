import React, {memo, useState} from 'react';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';

import Header from '../Header';
import LargeFooter from '../LargeFooter';
import HiddenFooter from '../HiddenFooter';
import BasicFooter from '../BasicFooter';
import Signature from '../Signature'

import './styles.scss';


export const Contacts = memo(
  function Contacts({ goToPage, scrolling, active, width }) {
    const [opened, setMode] = useState(width <= 767);


    return (
      <article className='bg_contact_us'>
        <Header active={active} />
        <main className='contact_us centering_content'>
          <div className='title'>
            <div className='wrapper'>
              <h1>Contact with us</h1>
            </div>
          </div>
          <div className='form_content'>
            <div className='wrapper'>
                <div className='inputs'>
                  <Animated
                    animationIn='fadeInLeft'
                    animationInDelay={300}
                    animationOut='fadeOut'
                    isVisible={active}
                  >
                    <input placeholder='Name:' type='text' />
                    <input placeholder='Surname:' type='text' />
                    <input placeholder='Email:' type='text' />
                    <input placeholder='Phone:' type='text' />
                  </Animated>
                </div>
                <div className='message'>
                  <Animated
                    animationIn='fadeInRight'
                    animationInDelay={300}
                    animationOut='fadeOut'
                    isVisible={active}
                  >
                    <div className='message_items'>
                      <div className='message_content'>
                        <textarea placeholder='Message:' />
                      </div>
                      <div className='send_button_position'>
                        <button type='submit'>Send</button>
                      </div>
                    </div>
                  </Animated>
                </div>
            </div>
            <Signature />
          </div>

        </main>
        <LargeFooter noPadding={true}/>
        <BasicFooter opened={opened}/>
        <HiddenFooter />
      </article>
    );
  }
);


const mapToStateProps = ({ common: {width} }) => ({
  width
});

export default connect(mapToStateProps)(Contacts);
