import React, { PureComponent, createRef } from 'react';
import { Animated } from 'react-animated-css';
import autoBind from 'react-autobind';

import EmailSvc from '../../services/EmailSvc';

import Header from '../Header';
import LargeFooter from '../LargeFooter';
import HiddenFooter from '../HiddenFooter';
import BasicFooter from '../BasicFooter';
import Signature from '../Signature';
import Modal from '../Modal';

import './styles.scss';

class Contacts extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);

    this.name = createRef();
    this.surname = createRef();
    this.email = createRef();
    this.phone = createRef();
    this.message = createRef();

    this.state = {
      opened: false,
      text: '',
    };
  }

  async sendMessage(e) {
    e.preventDefault();
    e.stopPropagation();

    const text = await EmailSvc.sendEmail({
      name:  this.name.current.value.trim(),
      surname:  this.surname.current.value.trim(),
      email:  this.email.current.value.trim(),
      phone:  this.phone.current.value.trim(),
      message:  this.message.current.value.trim(),
    });

    this.setState({
      text,
      opened: true,
    });

    this.name.current.value = '';
    this.surname.current.value = '';
    this.email.current.value = '';
    this.phone.current.value = '';
    this.message.current.value = '';
  }

  setOpened(state) {
    this.setState({
      opened: state,
    });
  }

  render() {
    const { active, pageNumber } = this.props;
    const { opened, text } = this.state;

    return (
      <article className="bg_contact_us">
        <Header active={active} />
        <main className="contact_us centering_content">
          <div className="title">
            <div className="wrapper">
              <h1>Contact with us</h1>
            </div>
          </div>
          <form className="form_content" onSubmit={this.sendMessage}>
            <div className="wrapper">
              <div className="inputs">
                <Animated
                  animationIn="fadeInLeft"
                  animationInDelay={300}
                  animationOut="fadeOut"
                  isVisible={active}
                >
                  <input
                    placeholder="Name:"
                    type="text"
                    ref={this.name}
                    required
                  />
                  <input
                    placeholder="Surname:"
                    type="text"
                    ref={this.surname}
                    required
                  />
                  <input
                    placeholder="Email:"
                    type="text"
                    ref={this.email}
                    required
                  />
                  <input
                    placeholder="Phone:"
                    type="text"
                    ref={this.phone}
                    required
                  />
                </Animated>
              </div>
              <div className="message">
                <Animated
                  animationIn="fadeInRight"
                  animationInDelay={300}
                  animationOut="fadeOut"
                  isVisible={active}
                >
                  <div className="message_items">
                    <div className="message_content">
                      <textarea placeholder="Message:" required ref={this.message} />
                    </div>
                    <div className="send_button_position">
                      <button type="submit">Send</button>
                    </div>
                  </div>
                </Animated>
              </div>
            </div>
            <Signature />
          </form>
        </main>
        <Animated
          animationIn="fadeIn"
          animationInDelay={300}
          animationOut="fadeOut"
          isVisible={active}
        >
          <LargeFooter noPadding  />
        </Animated>
        <Animated
          animationIn="fadeIn"
          animationInDelay={300}
          animationOut="fadeOut"
          isVisible={active}
        >
          <BasicFooter />
        </Animated>
        <HiddenFooter />
        <Modal
          opened={opened}
          text={text}
          setOpened={this.setOpened}
          pageNumber={pageNumber}
        />
      </article>
    );
  }
}

export default Contacts;
