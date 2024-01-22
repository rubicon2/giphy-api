import { getRangedRandomInt } from './math';

const GIPHY_API_KEY = 'q60528g7xYbZgGDN3R887xY2C0gerKbw';
let grid = null;
let imgArray = [];

function createImgElements(parentElement, rowColCount) {
  const totalImgs = rowColCount * rowColCount;
  const imgElements = [];
  for (let i = 0; i < totalImgs; i += 1) {
    const img = document.createElement('img');
    imgElements.push(img);
    parentElement.appendChild(img);
  }
  return imgElements;
}

function createRandomGifImgGrid(parentElement, rowColCount) {
  grid = document.createElement('div');
  grid.classList.add('gif-grid');
  grid.style.setProperty('--grid-row-col-count', rowColCount);
  imgArray = createImgElements(grid, rowColCount);
  parentElement.appendChild(grid);
}

async function getRandomGifUrlAsync(searchTag) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${searchTag}&rating=g`,
      { mode: 'cors' },
    );
    const json = await response.json();
    return json.data.images.original.url;
  } catch (error) {
    console.error(error);
  }
  // If nothing was returned by the try block
  return null;
}

async function populateImgs(searchTag) {
  for (let i = 0; i < imgArray.length; i += 1) {
    // How to do with async/await?
    const currentImg = imgArray[i];
    getRandomGifUrlAsync(searchTag).then((url) => {
      currentImg.src = url;
    });
  }
}

async function randomiseImgInGrid(searchTag) {
  const img = imgArray[getRangedRandomInt(0, imgArray.length - 1)];
  img.src = await getRandomGifUrlAsync(searchTag);
}

export { createRandomGifImgGrid, populateImgs, randomiseImgInGrid };
