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



// 'use strict';

// function deleteDepartment(departmentID){
//   console.log('You made it to ajax');
//   $.ajax({
//       url: '/handle/' + departmentID,
//       method: 'DELETE',
//       success: function(result){
//           window.location.reload(true);
//       }, 
//       error: function(result, textStatus) {
//         alert(textStatus);
//       }
//   })
// };