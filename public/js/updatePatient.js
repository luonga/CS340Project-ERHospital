function updatePatient(patientID) {
    $(function (){
      
      let link = '/updates/update-patient/';
      link += patientID;
      $.ajax({
        url: link,
        type: 'PUT',
        data: $('#patientForm').serialize(),
        success: function(result) {
          window.location.replace('/reads/patients')
        }
      })
    })
          
  }