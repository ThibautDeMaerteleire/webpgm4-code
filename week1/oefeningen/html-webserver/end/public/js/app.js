/**
 * My Client Javascript Folder
 */

/**
 * Fetches the navigation
 */
const getNavigation = async () => {
  const fetchedData = await fetch('/navigation');
  const json = await fetchedData.json();
  return json.data;
}

/**
 * Creates a list item with anchor for navigation purpose
 */
const createLi = ({ text, link }) => {
  // create the list item
  const li = document.createElement('li');

  // create the anchor
  const a = document.createElement('a');
  a.innerHTML = text;
  a.href = link;

  // add the anchor to the list item
  li.appendChild(a);

  // returns the listitem
  return li;
}

/**
 * Inits the application
 */
const init = () => {
  getNavigation()
    .then(data => {
      const listContainer = document.querySelector('nav ul');
      data.forEach(dataItem => listContainer.appendChild(createLi(dataItem)));
    });
}

window.addEventListener('DOMContentLoaded', init);