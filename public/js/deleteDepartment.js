function deletePerson(departmentID) {
    let link = '/delete-department/';
    link += departmentID;
    $.ajax({
      url: link,
      type: 'DELETE',
    //   success: function(result) {
    //     deleteRow(departmentID);
    //   }
    });
  };
  
  function deleteRow(departmentID){
      let table = document.getElementById("people-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == departmentID) {
              table.deleteRow(i);
              break;
         }
      }
  };