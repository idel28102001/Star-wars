import { loadByURL, CreatePage, movies, cssBoot} from './index.js';


function listRace(list, titleName) {
  const currCont = document.createElement('div');

  Promise.all(list.map(e=>loadByURL(e))).then(all=>{
    const currList = document.createElement('ul');
    const title = document.createElement('h2');

    currList.append(title);
    currCont.append(currList);
    title.textContent = titleName;
    all.forEach(e=>{
      const item = document.createElement('li');
      const titleH3 = document.createElement('span');

      titleH3.textContent = e.name;
      item.append(titleH3);
      currList.append(item);
    });
  });
  return currCont;
}

export function render(data,cont=null) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const currLink = document.createElement('a');
  const btnBack = document.createElement('button');
  const descr = document.createElement('p');
  const planetList = listRace(data.planets, 'Plantes');
  const speciesList = listRace(data.species, 'Species');


  title.textContent = data.title;
  btnBack.textContent = 'Back';
  descr.textContent = data.opening_crawl;

  currLink.append(btnBack);
  currLink.href = 'index.html';
  currLink.addEventListener('click',event=>{
    event.preventDefault();
    history.pushState(null,'', `index.html`);
    CreatePage([movies,`https://swapi.dev/api/films/`,cssBoot],cont);
  });
  container.append(
    currLink,
    title,
    descr,
    planetList,
    speciesList,
  );
  return container;

}
