function deleteDoctor(doctorID) {
    $(function (){
        })
        let link = '/deletes/delete-doctor/';
        link += doctorID;
        $.ajax({
          url: link,
          type: 'DELETE',
          success: function(result) {
            window.location.reload(true);
          }
        })
  }