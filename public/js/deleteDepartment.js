function deleteDepartment(departmentID) {
  let link = '/delete-department/';
  link += departmentID;
  $.ajax({
    url: link,
    type: 'DELETE',
    success: function(result) {
      // deleteRow(departmentID);
      window.location.reload(true);
    }
  })
}
