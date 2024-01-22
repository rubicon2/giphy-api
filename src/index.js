import './style.css';

import { createRandomGifImgGrid, populateImgs } from './gifGrid';

import createSearchBar from './searchbar';

const { body } = document;

body.appendChild(createRandomGifImgGrid(3));
body.appendChild(createSearchBar());
populateImgs('cat');
