


const inputElement = document.querySelector('#input-value');
const buttonElement = document.querySelector('.search');
const searchable = document.querySelector('#movie-searchable');
const moviesContainer=document.querySelector('#movie-container');


function movieSection(movies) {
    return movies.map(movie => {
        if (movie.poster_path) {
            return `
            <img src=${image_url + movie.poster_path} data-movie-id=${movie.id}/>
        `
        }

    });
}



function handlError(error)
{
    console.log('error',error);
}

function createIframe(video)
{
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${video.key}`;
    iframe.width=350;
    iframe.height350;
    iframe.allowFullscreen=true;

    return iframe;
}

function createMovieSection(movies,title='') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie')

    const movieTemplete = `
    <h2>${title}</h2>
    <section class="divs">
    ${movieSection(movies)}
    </section>
    <div class="content">
    <p id="content-close">X</p>
    </div>
    `;

    movieElement.innerHTML = movieTemplete;
    return movieElement;
}
function rendarSearch(data)
{
    searchable.innerHTML='';
    const movi = data.results;
    const movieBlock = createMovieSection(movi); 
    searchable.appendChild(movieBlock);
    console.log('Data', data);
}
function rendarMovies(data)
{
   
    const movi = data.results;
    const movieBlock = createMovieSection(movi,this.title); 
    moviesContainer.appendChild(movieBlock);
}

buttonElement.onclick = function (event) {
    event.preventDefault();
    const value = inputElement.value;
    inputElement.innerHTML='';  
    searchmovie(value);
    console.log('You Search For:' ,value);
}

function createvideoTemplate(data,content)
{
    content.innerHTML='<p id="content-close">X</p>';
    const videos=data.results;
    const length=videos.length>4?4:videos.length;
    const iframecontainer=document.createElement('div');
   

    for(let i=0;i<videos.length;i++)
    {
        const video=videos[i];
        const iframe=createIframe(video);
        iframecontainer.appendChild(iframe);
        content.appendChild(iframecontainer);

    }
}

document.onclick=function(e)
{
    const target=e.target;
    if(target.tagName.toLowerCase()==='img')
    {
        const movie_id=target.dataset.movieId;
        console.log('Movie_Id=',movie_id);
        const section_of_image=event.target.parentElement;
        const content= section_of_image.nextElementSibling;

        content.classList.add('content-display');

        const path=`/movie/${movie_id}videos`;
        const url=getUrl(path);
        fetch(url)
        .then((response) => response.json())
        .then((data)=>createvideoTemplate(data,content))
        .catch((error) => console.log('Error:', error));
   
    }

    if(target.id==='content-close')
    {
        const close_button_parent=target.parentElement;
        close_button_parent.classList.remove('content-display')
    }
}

getUpcomingMovies();
getTopratedMovies();  
getPopulerMovies();
