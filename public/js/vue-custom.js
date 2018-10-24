(function(){

    var todoVue = new Vue({ // eslint-disable-line
        el: '#todoVue',
        data: {
            id: null,
            title: null,
            description: null,
            buttonLbl: 'Add Note',
            notes: []
        },
        created: function(){
            this.fOnload();
        },
        methods: {
            notification: function(type, message){
                $.notify(message, type);
            },
            fOnload: function(){
                axios.get('../notes')
                    .then((response) => {
                        this.notes = response.data;
                    }).catch((err) => {
                        this.notes = [];
                        this.notification('error', 'Error while requesting for data.');
                    });
            },
            clearData: function(){
                this.description = '';
                this.title = '';
                this.id = '';
                this.buttonLbl = 'Add Note';
            },
            onSubmit: function(){
                var payload = {
                    title: this.title,
                    description: this.description
                };

                if(String(this.id) !== '' && String(this.id) !== String(null)){
                    axios.put('../notes/' + this.id, payload)
                        .then((res) => {
                            this.fOnload();
                            this.clearData();
                            this.notification('success', 'Note has been successfully updated.');
                        }).catch((err) => {
                            this.notification('error', 'Error while saving.');
                        });
                } else {
                    axios.post('../notes', payload)
                        .then((res) => {
                            this.fOnload();
                            this.clearData();
                            this.notification('success', 'Note has been successfully added.');
                        }).catch((err) => {
                            this.notification('error', 'Error while saving.');
                        });
                }
            },
            getDetails: function(id){
                axios.get('../notes/' + id)
                    .then((response) => {
                        this.title = response.data.title;
                        this.description = response.data.description;
                        this.id = response.data.id;
                        this.buttonLbl = 'Update Note';
                        $('#title').focus();
                    }).catch((err) => {
                        this.notification('error', 'Error while requesting for data.');
                    });

            },
            deleteTask(id) {
                axios.delete('../notes/' + id)
                    .then((response) => {
                        this.fOnload();
                        this.notification('success', 'Note has been successfully deleted.');
                    }).catch((err) => {
                        this.notification('error', 'Error while saving.');
                    });
            }
        }
    });

    // $('#description').summernote({
    //     height: 300,
    //     placeholder: 'Enter Description'
    // });
})();