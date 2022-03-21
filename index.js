export const linksDict = {};
export const [movie, movies,cssBoot] = ['./movie.js', './movies.js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'];
export function loadByURL(src) {
  if (src.endsWith('.css')) {
   if (!linksDict[src]) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = src;
    linksDict[src] = new Promise(res=>{
      link.addEventListener('load',()=>res());
      document.head.append(link);
    });
  }
    return linksDict[src];
  }

  if (src.endsWith('.js')) {
    return import(src);
  }

  return fetch(src).then(res => res.json());
}

const page = document.getElementById('page');

export function CreatePage(currList,page) {
  page.innerHTML = '';
  Promise.all(currList.map(src => loadByURL(src))).then(([pageModule,data])=>{
    page.append(pageModule.render(data,page));
  });
}

const currCurrLink = new URL(location.href).search;
if (!currCurrLink) {
  CreatePage([movies,'https://swapi.dev/api/films/',cssBoot],page);
} else {
  CreatePage([movie,`https://swapi.dev/api/films/${currCurrLink.slice(8)}`,cssBoot],page);
}


