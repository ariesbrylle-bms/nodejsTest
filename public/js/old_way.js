// IIFE - immediately invoked function express
(function() {
    var movieTitle = document.getElementById('movieTitle');
    movieTitle.textContent = 'Activity for Unionbank Blockchain - Javascript and Node.js';
    var PORT = 3300;

    axios.get(`http://localhost:${PORT}/notes`)
        .then((response) => {
            notes = response.data; // eslint-disable-line
            renderNotes(notes); // eslint-disable-line
        }).catch((err) => {
            console.log(err);
        });

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

    var addNoteForm = document.getElementById('myForm');
    addNoteForm.addEventListener('submit', function(e){
        e.preventDefault();

        var titleInput = document.getElementById('title');
        var descriptionInput = document.getElementById('description');

        var payload = {
            title: titleInput.value,
            description: descriptionInput.value
        };

        axios.post(`http://localhost:${PORT}/notes`, payload)
            .then(function(res){
                renderNotes(res.data);
                clearBtn.click();
            }).catch((err) => {
                console.log(err);
            });
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

function renderNotes(notes) {
    var notesTable = document.getElementById('myTable');
    notesTable.innerHTML = '';
    var headers = ['Title', 'Description'];
    var thead = document.createElement('tr');
    headers.forEach(function(header) {
        var td = document.createElement('td');
        td.textContent = header;
        thead.append(td);
    });
    notes.forEach(function(note){
        var tr = document.createElement('tr');
        var tdTitle = document.createElement('td');
        var tdDescription = document.createElement('td');
        tdTitle.textContent = note.title;
        tdDescription.innerHTML = note.description;
        tr.append(tdTitle);
        tr.append(tdDescription);
        notesTable.append(tr);
    });
}