export function fetchArticles(searchQuery, page) {
  const API_KEY = '29336410-bf8336e60ac171a1237415fd3';
  const OPTIONS =
    'image_type=photo&orientation=horizontal&safesearch=true&lang=en&lang=uk&per_page=12';
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&${OPTIONS}&page=${page}`;

  return fetch(url)
    .then(r => {
      return r.json();
    })
    .then(r => {
      if (r.totalHits === 0) {
        return Promise.reject(new Error());
      }
      return r;
    });
}
