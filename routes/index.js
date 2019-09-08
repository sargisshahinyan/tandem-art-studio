import express from 'express';
const router = express.Router();
import { renderReactPage } from '../utils';

import PagesSvc from '../services/PagesSvc';

router.get((req, res) => {
  console.log(123456);
  PagesSvc.getPagesData();
  renderReactPage()
    .then(res.send.bind(res))
    .catch(e => {
      console.error(e);
      res.status(500).send('An error occurred');
    });
});

export default router;
