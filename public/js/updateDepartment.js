function updateDepartment(departmentID) {
  $(function (){
    
    let link = '/updates/update-department/';
    link += departmentID;
    $.ajax({
      url: link,
      type: 'PUT',
      data: $('#departmentForm').serialize(),
      success: function(result) {
        window.location.replace('/reads/departments')
      }
    })
  })
        
}