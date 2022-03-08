function updateMedPatient(medID, patientID) {
    $(function (){
      
      let link = '/updates/update-medPatient/';
      link += medID
      link += '/' + patientID;
      $.ajax({
        url: link,
        type: 'PUT',
        data: $('#medPatientForm').serialize(),
        success: function(result) {
          window.location.replace('/reads/medpatients')
        }
      })
    })
          
  }