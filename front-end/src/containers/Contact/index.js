import React, { memo } from 'react';

import PageScrollerWrapper from '../../components/PageScrollerWrapper';

import { PAGES } from '../../data/contact';

export const Contact = memo(() => <PageScrollerWrapper pages={PAGES} />);

export default Contact;
