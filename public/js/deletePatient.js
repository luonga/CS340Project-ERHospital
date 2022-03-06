function deletePatient(patientID) {
    $(function (){
      
    })
        let link = '/deletes/delete-patient/';
        link += patientID;
        $.ajax({
          url: link,
          type: 'DELETE',
          success: function(result) {
            window.location.reload(true);
          }
        })
  }