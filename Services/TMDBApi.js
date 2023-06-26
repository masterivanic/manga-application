const API_KEY = '84c7921cbc94dfc952bb2556c5f7f719'

export const getFilmsByApi = (text, page) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}

export const getImageFromApi = (name) => {
    return 'https://image.tmdb.org/t/p/w300' + name
}