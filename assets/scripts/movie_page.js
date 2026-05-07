$(function () {
    const wrapperCardNode = $('.js-movie-card-wrapper');
    const param = new URLSearchParams(location.search);
    const id = param.get('imdbID');
    
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=80890c32&i=${id}`,
        success: function ( res, textStatus, jqXHR ) {
            if ( res.Response != 'True' ) { alert(`Error: ${res.Error}`); return; }
            wrapperCardNode.empty();

            let cardTemplate = `
                <div class="movie__card">
                    <picture>
                        <img src="${res.Poster}" alt="${res.Title}" onerror="this.src='./assets/images/hqdefault.jpg';">
                    </picture>
                    <div class="movie__card_items">
                        <h1 class="main-title">${res.Title}</h1>
                        <p>Год:<span class="blue-text">${res.Year}</span></p>
                        <p>Рейтинг:<span class="blue-text">${res.Rated}</span></p>
                        <p>Дата выхода: <span class="blue-text">${res.Released}</span></p>
                        <p>Продолжительность:<span class="blue-text">${res.Runtime}</span></p>
                        <p>Жанр:<span class="blue-text">${res.Genre}</span></p>
                        <p>Режиссер:<span class="blue-text">${res.Director}</span></p>
                        <p>Сценарий:<span class="blue-text">${res.Writer}</span></p>
                        <p>Актеры:<span class="blue-text">${res.Actors}</span></p>
                    </div>
                </div>
                <p class="description">
                    ${res.Plot}
                </p>
            `
            wrapperCardNode.append(cardTemplate);
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
})