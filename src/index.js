const {getMovies} = require('./api.js');
const {addMovie} = require('./api.js');
const {editMovie} = require('./api.js');
const {deleteMovie} = require('./api.js');


getMovies().then((movies) => {
    $('#movieList').html("");
    renderMovies(movies)
}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});

//=========Render Movies List===============================
function renderMovies(movies) {
    let html = '';
    movies.forEach(({title, rating, genre, id}) => {
        html += `<ul>
<li><span id="title">${title}</span>  
<br><span id="rating">Rating: ${rating}</span>  
<br><span id="genre">Genre: ${genre}</span>  
<br><span style ="display: none;" id='id'>${id}</span></li><hr><hr>
    </ul>`;
    });
    $('#movieList').html(html);
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//===========Add Movie===========================================
function newMovieObject() {
    let title = capitalizeFirstLetter($('.title').val());
    return {
        'title': title,
        'rating': $('#movieRating').val(),
        'genre': $('#movieGenre').val()
    };
}

$('#addMovieBtn').click(function (e) {
    e.preventDefault();
    addMovie(newMovieObject());
    getMovies().then((movies) => {
        (renderMovies(movies));
    });
    $('#myForm')[0].reset();
});

//==========Edit Movie================================================
let movieArr;

$("#movieList").on('click', 'ul', function (e) {
    e.preventDefault();
    let target = e.target;
    $(target).toggleClass('highlight');
    let targetText = ($(target).text());
    movieArr = targetText.split('  ');
    $('#renderTitle').val(movieArr[0]);
    $('#renderRating').val(movieArr[1].split(' ')[1]);
    $('#renderGenre').val(movieArr[2].split(' ')[1]);
});

function movieObject() {
    let title = capitalizeFirstLetter($('#renderTitle').val());
    return {
        'title': title,
        'rating': $('#renderRating').val(),
        'genre': $('#renderGenre').val(),
        'id': movieArr[3]
    }
}

$('#editMovieBtn').click(function (e) {
    e.preventDefault();
    editMovie(movieObject());
    getMovies().then((movies) => {
        (renderMovies(movies));
    });
    $('#myEditForm')[0].reset();
});

//=======BTN Click Delete======================================
$('#deleteMovieBtn').click(function (e) {
    e.preventDefault();
    deleteMovie(movieObject());
    getMovies().then((movies) => {
        (renderMovies(movies));
    });
    $('#myEditForm')[0].reset();
});

//======Main BTN Click============================================
$('.editForm').addClass('hide');
$('.addForm').addClass('hide');
$('.row').addClass('center');


//===Main Add Btn Click
$('#mainAddBtn').click(function () {
    $('.addForm').removeClass('hide');
    $('#addForm').addClass('border-left');
    $('.editForm').addClass('hide');
    $('#mainAddBtn').addClass('colorBtn');
    $('#mainEditBtn').removeClass('colorBtn');
    $("#movieListTitle").addClass('left');
    $("#scrollParagraph").addClass('left');
    $('.hideRow').removeClass('hide');
});

//===Main Edit Btn Click
$('#mainEditBtn').click(function () {
    $('.editForm').removeClass('hide');
    $('#editForm').addClass('border-left');
    $('.addForm').addClass('hide');
    $('#mainEditBtn').addClass('colorBtn');
    $('#mainAddBtn').removeClass('colorBtn');
    $("#movieListTitle").addClass('left');
    $("#scrollParagraph").addClass('left');
    $('.hideRow').removeClass('hide');
});












// function doubleSpace() {
//     if ($('#myForm').includes('  ') === true) {
//         $('.title').addClass('error');
//         $('#addMovieBtn').prop('disabled', true);
//     } else {
//         $('.title').removeClass('error');
//         $('#addMovieBtn').prop('disabled', false);
//     }
// }


//======Sort=========================================
// $('#sortBtn').click(function (e) {
//     e.preventDefault();
//     let sortValue = $('#sort').val();
//     console.log(sortValue);
//     // $(movies).forEach(function() {
//         if (sortValue === 'title') {
//             $('#title').removeClass('hide');
//             $('#rating').addClass('hide');
//             $('#genre').addClass('hide');
//         } else if (sortValue === 'rating') {
//             $('#rating').removeClass('hide');
//             $('#title').addClass('hide');
//             $('#genre').addClass('hide');
//         } else if (sortValue === 'genre') {
//             $('#genre').removeClass('hide');
//             $('#title').addClass('hide');
//             $('#rating').addClass('hide');
//         } else if (sortValue === 'show all') {
//             $('#title').removeClass('hide');
//             $('#rating').removeClass('hide');
//             $('#genre').removeClass('hide')
//         } else {
//             renderMovies();
//         }
//     });
// });

//==================Import Requires
// const {renderList} = require('./moviesList');
// const {createNewMovie} = require('./post.js');
// const{editExistingMovie} = require('./put.js');
// const{deleteSelectedMovie} = require('./delete.js');
//
// renderList.movieList();
// createNewMovie.createMovie();
// editExistingMovie.clickMovie();
// editExistingMovie.updateMovie();
// deleteSelectedMovie();






