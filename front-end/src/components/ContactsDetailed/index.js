import React from 'react';

import UglyFooter from '../UglyFooter';
import Header from '../Header';

import './styles.scss';

export function ContactsDetailed() {
  return (
    <article className="bg_location">
      <Header/>
      <main>
        <iframe
          title="Tandem map"
          src="https://maps.google.com/maps?q=Tandem%20Art%20Studio&t=k&z=17&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          style={{border: 0}}
          allowFullScreen=""
        />
      </main>
      <UglyFooter />
    </article>
  );
}

export default ContactsDetailed;
