import './style.css';

const GIPHY_API_KEY = 'q60528g7xYbZgGDN3R887xY2C0gerKbw';
let imgArray = [];

async function createRandomGifImgGrid(parentElement, imgCount, searchTag) {
  document.body.style.setProperty('--grid-row-col-count', Math.sqrt(imgCount));
  for (let i = 0; i < imgCount; i++) {
    const img = await createRandomGifImg(searchTag);
    imgArray.push(img);
    parentElement.appendChild(img);
  }
}

async function createRandomGifImg(searchTag) {
  const img = document.createElement('img');
  img.src = await getRandomGifUrlAsync(searchTag);
  return img;
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
}

function getRangedRandomInt(min, max) {
  const range = max - min;
  return Math.round(min + range * Math.random());
}

createRandomGifImgGrid(document.body, 9, 'cat');

setInterval(async () => {
  const img = imgArray[getRangedRandomInt(0, imgArray.length - 1)];
  const url = await getRandomGifUrlAsync('cat');
  img.src = url;
}, 1000);
