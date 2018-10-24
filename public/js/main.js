// IIFE - immediately invoked function express
(function() {
    var movieTitle = document.getElementById('movieTitle');
    movieTitle.textContent = 'Activity for Unionbank Blockchain - Javascript and Node.js';

    $('#description').summernote({
        height: 300,
        placeholder: 'Enter Description'
    });

    var clearBtn = document.getElementById('clearBtn');
    clearBtn.addEventListener('click', function(e){
        var inputs = document.getElementsByClassName('form-control');
        for(var i = 0; i < inputs.length; i++){
            var elem = inputs[i];
            elem.value = '';
        }
        
        $('#description').summernote('code', '');
        $('#myForm').attr('action', '/notes_add');
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
        error: function(data) {}
    });
}


function deleteTask(id) { // eslint-disable-line
    $('#myForm').attr('action', '/notes_delete/' + id);
    $('#submit').trigger('click');
}