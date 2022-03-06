function updateDoctor(doctorID) {
    $(function (){
      
      let link = '/updates/update-doctor/';
      link += doctorID;
      $.ajax({
        url: link,
        type: 'PUT',
        data: $('#doctorForm').serialize(),
        success: function(result) {
          window.location.replace('/reads/doctors')
        }
      })
    })
          
  }