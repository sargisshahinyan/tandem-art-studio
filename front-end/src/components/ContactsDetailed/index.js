import  React from 'react';

import UglyFooter from '../UglyFooter';
import HiddenFooter from '../HiddenFooter';
import Header from '../Header';

import './styles.scss';

export function ContactsDetailed() {
  return (
    <article className="bg_location">
      <Header/>
      <main>
        {/*<iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12198.180331513757!2d44.4988673!3d40.152416!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xdc75d77a487e57c4!2sTANDEM%20ART%20STUDIO!5e0!3m2!1sen!2s!4v1571168253264!5m2!1sen!2s"
          frameBorder="0"
          style={{border: 0}}
          allowFullScreen=""
        />*/}
            <iframe
              src="https://maps.google.com/maps?q=tandem&t=k&z=17&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            />
      </main>
      <UglyFooter />
      <HiddenFooter />
    </article>
  );
}

export default ContactsDetailed;
