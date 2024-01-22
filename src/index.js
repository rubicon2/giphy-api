import './style.css';

import { createRandomGifImgGrid, populateImgs } from './gifGrid';


const { body } = document;

body.appendChild(createRandomGifImgGrid(3));
populateImgs('cat');
