import React, { memo } from 'react';

import PageScrollerWrapper from '../../components/PageScrollerWrapper';

import { PAGES } from '../../data/home';

export const Home = memo(() => <PageScrollerWrapper pages={PAGES} />);

export default Home;
