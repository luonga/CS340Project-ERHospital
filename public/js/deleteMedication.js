function deleteMedication(medID) {
    $(function (){
        })
        let link = '/deletes/delete-medication/';
        link += medID;
        $.ajax({
          url: link,
          type: 'DELETE',
          success: function(result) {
            window.location.reload(true);
          }
        })
  }