(function(){
  var PORT = 3300;
  

  var todoVue = new Vue({
    el: '#todoVue',
    data : {
      id : null,
      title : null,
      description : null,
      notes : []
    },
    created: function(){
      this.fOnload();
    },
    methods : {
      fOnload : function(){
        axios.get(`../notes`)
        .then((response) => {
            this.notes = response.data;
        }).catch((err) => {
            console.log(err);
            this.notes = [];
        });
      },
      clearData : function(){
        //$('#description').summernote('code', '');
        this.description = '';
        this.title = '';
        this.id = '';
      },
      onSubmit : function(){
        var payload = {
          title : this.title,
          description : this.description
        }

        if(this.id != '' && this.id != null){
          axios.put(`../notes/` + this.id, payload)
          .then((res) => {
            this.fOnload();
            this.clearData();
          }).catch((err) => {
              console.log(err);
          });
        }else{
          axios.post(`../notes`, payload)
          .then((res) => {
            this.fOnload();
            this.clearData();
          }).catch((err) => {
              console.log(err);
          });
        }
      },
      getDetails : function(id){
        axios.get('../notes/' + id)
        .then((response) => {
          this.title = response.data.title;
          this.description = response.data.description;
          this.id = response.data.id;
          //$('#title').val(response.data.title);
          //$('#description').summernote('code', response.data.description);
          //$('#id').val(response.data.id);
        }).catch((err) => {
          console.log(err);
        });
        
      },
      deleteTask(id) { // eslint-disable-line
        axios.delete(`../notes/` + id)
        .then((response) => {
          this.fOnload();
        }).catch((err) => {
            console.log(err);
            self.notes = [];
        });
      }
    }
  });

  // $('#description').summernote({
  //     height: 300,
  //     placeholder: 'Enter Description'
  // });
})();