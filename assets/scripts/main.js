$(function () {
    const formNode = $('.js-form');
    const moviesNode = $('.js-movies');
    var movieName = null;

    formNode.on('submit', function (e) {
        e.preventDefault();
        movieName = getMovie();
        if ( movieName ) {
            showMovie(movieName);
        }
    })
    
    function getMovie () {
        if ( formNode.length ) {
            let formData = new FormData(formNode[0]);
            var inputMovie = formData.get('inputMovie');

            if ( inputMovie ) {
                return inputMovie;
            }
        }
        return false;
    }

    function showMovie (movieName) {
        $.ajax({
            url: `http://www.omdbapi.com/?apikey=80890c32&s=${movieName}`,
            success: function (res) {
                if ( res.Response != 'True' ) { 
                    $('.movies-not-found').css( {'display': 'block'} );
                    return; 
                }
                moviesNode.empty();
                $('.movies-not-found').css( {'display': 'none'} );

                $.each( res.Search, function (i, el) {
                    let templateMovieCart = `
                        <a href="./movie_page.html" class="movie">
                            <picture class="movie-search-picture">
                                <img src="${el.Poster}" alt="${el.Title}">
                            </picture>
                            <div class="film-search-info">
                                <h2 class="title">${el.Title}</h2>
                                <p class="blue-text">${el.Year}</p>
                                <p>${el.Type}</p>
                            </div>
                        </a>
                    `;
                    moviesNode.append(templateMovieCart);
                } )
            },
            error: function ( jqXHR, exception ) {
            if (jqXHR.status === 0) {
                    alert('Not connect. Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found (404).');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error (500).');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error. ' + jqXHR.responseText);
                }
            }
        })
    }
})