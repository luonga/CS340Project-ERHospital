function deleteDepartment(departmentID){
  $.ajax({
      url: '/delete-department/' + departmentID,
      type: 'DELETE',
      success: function(result){
          window.location.reload(true);
      }
  })
};