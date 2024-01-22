import { populateImgs } from './gifGrid';

let lastSearchString = '';

export default function createSearchBar() {
  const searchBar = document.createElement('div');
  searchBar.classList.add('searchbar');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.name = 'search_input';
  searchBar.appendChild(searchInput);

  const submitSearchButton = document.createElement('button');
  submitSearchButton.type = 'button';
  submitSearchButton.innerText = 'GIF me!';
  submitSearchButton.addEventListener('click', () => {
    if (searchInput.value) {
      lastSearchString = searchInput.value;
      populateImgs(searchInput.value);
    }
  });
  searchBar.appendChild(submitSearchButton);

  return searchBar;
}

export function getLastSearch() {
  return lastSearchString;
}
