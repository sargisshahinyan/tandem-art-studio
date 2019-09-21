import Home from '../../components/Home';
import About from '../../components/About';
import Clients from '../../components/Clients';
import Contacts from '../../components/Contacts';
import Gallery from '../../components/Gallery';
import Services from '../../components/Services';
import Team from '../../components/Team';

export const PAGES = [
  {
    id: 1,
    component: Home,
  },
  {
    id: 2,
    component: About,
  },
  /*{
    id: 3,
    component: Gallery,
  },*/
  {
    id: 4,
    component: Team,
  },
  {
    id: 5,
    component: Services,
  },
  {
    id: 6,
    component: Clients,
  },
  {
    id: 7,
    component: Contacts,
  }
];
