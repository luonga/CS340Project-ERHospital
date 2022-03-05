function deleteMedPatient(medID, patientID) {
    $(function (){
        })
        let link = '/deletes/delete-medPatient/';
        link += medID;
        link += '/' + patientID;
        $.ajax({
          url: link,
          type: 'DELETE',
          success: function(result) {
            window.location.reload(true);
          }
        })
  }