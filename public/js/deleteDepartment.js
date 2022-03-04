'use strict';

function deleteDepartment(departmentID){
  console.log('You made it to ajax');
  $.ajax({
      url: '/handle/' + departmentID,
      method: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }, 
      error: function(result, textStatus) {
        alert(textStatus);
      }
  })
};