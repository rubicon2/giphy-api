import { getRangedRandomInt } from './math';

const GIPHY_API_KEY = 'q60528g7xYbZgGDN3R887xY2C0gerKbw';
let grid = null;
let errorMessage = null;
let imgArray = [];
let imgRefreshInterval = null;

function createErrorMessage() {
  const div = document.createElement('div');
  div.classList.add('gif-grid-error', 'display-none');
  div.innerText = 'Failure to load images!';
  errorMessage = div;
  return div;
}

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

function createRandomGifImgGrid(rowColCount) {
  grid = document.createElement('div');
  grid.classList.add('gif-grid');
  grid.style.setProperty('--grid-row-col-count', rowColCount);
  imgArray = createImgElements(grid, rowColCount);
  grid.appendChild(createErrorMessage());
  return grid;
}

async function getRandomGifUrl(searchTag) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=${searchTag}&rating=g`,
      { mode: 'cors' },
    );
    const json = await response.json();
    if (json.data.images.length === 0)
      throw new Error(`Giphy found no images for ${searchTag}!`);
    else {
      errorMessage.classList.add('display-none');
      return json.data.images.original.url;
    }
  } catch (error) {
    errorMessage.innerText = error;
    errorMessage.classList.remove('display-none');
    console.error(error);
  }
  // If nothing was returned by the try block
  return null;
}

async function randomiseImgInGrid(searchTag) {
  const img = imgArray[getRangedRandomInt(0, imgArray.length - 1)];
  img.src = await getRandomGifUrl(searchTag);
}

function populateImgs(searchTag) {
  for (let i = 0; i < imgArray.length; i += 1) {
    const currentImg = imgArray[i];
    getRandomGifUrl(searchTag).then((url) => {
      currentImg.src = url;
    });
  }
  clearInterval(imgRefreshInterval);
  imgRefreshInterval = setInterval(() => randomiseImgInGrid(searchTag), 1000);
}

export { createRandomGifImgGrid, populateImgs, randomiseImgInGrid };
