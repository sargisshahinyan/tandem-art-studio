import React from 'react';

import UglyFooter from '../UglyFooter';
import HiddenFooter from '../HiddenFooter';
import Header from '../Header';
import LargeFooter from '../LargeFooter';

import './styles.scss';

export function ContactsDetailed() {
  return (
    <article className="bg_location">
      <Header />
      <main>
        <iframe
          src="https://maps.google.com/maps?q=tandem&t=k&z=17&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        />
      </main>
      <UglyFooter />
      <LargeFooter address />
      <HiddenFooter />
    </article>
  );
}

export default ContactsDetailed;
