function deleteDepartment(departmentID) {
    console.log('you made it here');
    let link = '/delete-department/';
    link += departmentID;
    $.ajax({
      url: link,
      type: 'DELETE',
      success: function(result) {
        
      }
    });
  };