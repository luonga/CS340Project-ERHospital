function updateMedication(medID) {
    $(function (){
      
      let link = '/updates/update-medication/';
      link += medID;
      $.ajax({
        url: link,
        type: 'PUT',
        data: $('#medicationForm').serialize(),
        success: function(result) {
          window.location.replace('/reads/medications')
        }
      })
    })
          
  }