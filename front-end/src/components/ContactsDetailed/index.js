import React from 'react';

import UglyFooter from '../UglyFooter';
import MobileFooter from '../MobileFooter';
import NewLargeFooter from "../ContactFooter";

import Header from '../Header';
import './styles.scss';

export function ContactsDetailed() {
  return (
    <article className="bg_location">
      <Header />
      <main>
        <iframe
          title="Studio address"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.144355972144!2d44.49725344294835!3d40.15286831179764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdc75d77a487e57c4!2sTANDEM%20ART%20STUDIO!5e1!3m2!1sen!2s!4v1574634087250!5m2!1sen!2s"
          frameBorder="0"
          style={{
            border: 0,
          }}
        />
      </main>
      <UglyFooter />
      <NewLargeFooter address />
      <MobileFooter />
    </article>
  );
}

export default ContactsDetailed;
