function deleteDepartment(departmentID) {
  $(function (){
      })
      let link = '/deletes/delete-department/';
      link += departmentID;
      $.ajax({
        url: link,
        type: 'DELETE',
        success: function(result) {
          window.location.reload(true);
        }
      })
}
