import { connect } from 'react-redux';

import About from '../../components/About';
import Contacts from '../../components/Contacts';
import ContactsDetailed from '../../components/ContactsDetailed';

export const PAGES = [
  {
    id: 2,
    component: About,
    name: 'About',
  },
  {
    id: 8,
    component: ContactsDetailed,
    name: 'ContactsDetailed',
  },
  {
    id: 7,
    component: Contacts,
    name: 'Contacts',
  }
];

function mapToStateProps({ pages }, { pageNumber }) {
  return {
    active: pages.activePage === pageNumber,
  };
}

PAGES.forEach(page => page.component = connect(mapToStateProps)(page.component));
