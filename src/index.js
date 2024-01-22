import './style.css';

import {
  createRandomGifImgGrid,
  populateImgs,
  randomiseImgInGrid,
} from './gifGrid';

createRandomGifImgGrid(document.body, 3);
populateImgs('cat');
setInterval(() => randomiseImgInGrid('cat'), 1000);
