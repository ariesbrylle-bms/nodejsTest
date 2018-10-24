(function() {
    var movieTitle = document.getElementById('movieTitle');
    movieTitle.textContent = 'Activity for Unionbank Blockchain - Javascript and Node.js';

    $('#description').summernote({
        height: 300,
        placeholder: 'Enter Description'
    });
})();


function getDetails(id) { // eslint-disable-line
    $('#myForm').attr('action', '/notes_update/' + id);
    $.ajax({
        url: './notes/' + id,
        dataType: 'json',
        method: 'GET',
        success: function(data) {
            $('#title').val(data.title);
            $('#description').summernote('code', data.description);
            $('#id').val(data.id);
        },
        error: function(data) {

        }
    });
}


function deleteTask(id) { // eslint-disable-line
    $('#myForm').attr('action', '/notes_delete/' + id);
    $('#submit').trigger('click');
}