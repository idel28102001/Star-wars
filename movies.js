import { CreatePage, movie,cssBoot} from './index.js';

export function render(data,cont=null) {
  const container = document.createElement('div');
  container.classList.add('d-flex', 'flex-column');
  let i = 1;
  data.results.forEach(e=>{
    const link = document.createElement('a');
    link.href = `?filmId=${e.episode_id}`;
    link.textContent = `${i++} ${e.title}`;
    link.addEventListener('click',event=>{
      event.preventDefault();
      history.pushState(null,'', `?filmId=${e.episode_id}`);
      CreatePage([movie,`https://swapi.dev/api/films/${e.episode_id}`,cssBoot],cont);
    });

    container.append(link);
  });
  return container;
}
