const api_key = '0719a19c85730ad10b9202b19346d174';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=0719a19c85730ad10b9202b19346d174';
const image_url = 'https://image.tmdb.org/t/p/w500';

function getUrl(path)
{
   const url=`https://api.themoviedb.org/3${path}?api_key=0719a19c85730ad10b9202b19346d174`;
    return url;
}


function requestMovies(url,onComplete,onError)
{
    fetch(url)
        .then((response) => response.json())
        .then(onComplete)
        .catch(onError);
}

function searchmovie(value)
{
    const path='/search/movie';
    const url = getUrl(path) + '&query=' + value;
    requestMovies(url,rendarSearch,handlError);
}
function getUpcomingMovies()
{
    const path='/movie/upcoming';
    const url = getUrl(path);
    const render=rendarMovies.bind({title: 'Latest Movies'});
    requestMovies(url,render,handlError);
}
function getTopratedMovies()
{
    const path='/movie/top_rated';
    const url = getUrl(path);
    const render=rendarMovies.bind({title: 'TopRated Movies'});
    requestMovies(url,render,handlError);
}
function getPopulerMovies()
{
    const path='/movie/top_rated';
    const url = getUrl(path);
    const render=rendarMovies.bind({title: 'Most Popular Movies'});
    requestMovies(url,render,handlError);
}