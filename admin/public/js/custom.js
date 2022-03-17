// Visitor Page Table
$(document).ready(function() {
    $('#VisitorDt').DataTable();
    $('.dataTables_length').addClass('bs-select');
});

//For Services Table 
function getServicesData() {
    axios.get('/getServicesData')
        .then(function(response) {
            if (response.status == 200) {
                $('#mainDiv').removeClass('d-none');
                $('#loaderDiv').addClass('d-none');
               
                $('#serviceDataTable').DataTable().destroy();
                $('#service_table').empty();
                
                var jsonData = response.data;
                $.each(jsonData, function(i, item) {
                    $('<tr>').html(
                        "<td><img class='table-img' src=" + jsonData[i].service_img + "></td>" +
                        "<td>" + jsonData[i].service_name + "</td>" +
                        "<td>" + jsonData[i].service_des + "</td>" +
                        "<td><a  class='serviceEditBtn' data-id=" + jsonData[i].id + "><i class='fas fa-edit'></i></a></td>" +
                        "<td><a  class='serviceDeleteBtn'  data-id=" + jsonData[i].id +" ><i class='fas fa-trash-alt'></i></a></td>"
                    ).appendTo('#service_table');
                });
                 // Services Table Delete Icon Click
                $('.serviceDeleteBtn').click(function() {
                    var id = $(this).data('id');
                    $('#serviceDeleteId').html(id);
                    $('#deleteModal').modal('show');
                })
                // Services Table Edit Icon Click
                $('.serviceEditBtn').click(function() {
                    var id = $(this).data('id');
                    $('#serviceEditId').html(id);
                    ServiceUpdateDetails(id);
                    $('#editModal').modal('show');
                })

               
            } else {
                $('#loaderDiv').addClass('d-none');
                $('#WrongDiv').removeClass('d-none');
            }
        })
        .catch(function(error) {
            $('#loaderDiv').addClass('d-none');
            $('#WrongDiv').removeClass('d-none');
        });
}
// Services Delete Modal Yes Btn
$('#serviceDeleteConfirmBtn').click(function() {
    var id = $('#serviceDeleteId').html();
        ServiceDelete(id);
})
 // Services Delete
function ServiceDelete(deleteID) {
 
  $('#serviceDeleteConfirmBtn').html("<div class='spinner-border spinner-border-sm' role='status'></div>") //Animation....
    axios.post('/ServiceDelete', {
            id: deleteID
        })
        .then(function(response) {
            $('#serviceDeleteConfirmBtn').html("Yes");
            if(response.status==200){
            if (response.data == 1) {
                $('#deleteModal').modal('hide');
                toastr.success('Delete Success');
                getServicesData();
            } else {
                $('#deleteModal').modal('hide');
                toastr.error('Delete Fail');
                getServicesData();
            }
            }
            else{
             $('#deleteModal').modal('hide');
             toastr.error('Something Went Wrong !');
            }
        })
        .catch(function(error) {
             $('#deleteModal').modal('hide');
             toastr.error('Something Went Wrong !');
        });
}

// Each Services Update Details
function ServiceUpdateDetails(detailsID) {
  
      axios.post('/ServiceDetails', {
              id: detailsID
          })
          .then(function(response) {
            if(response.status==200){
                $('#serviceEditForm').removeClass('d-none');
                $('#serviceEditLoader').addClass('d-none');
                var jsonData = response.data;
                $('#serviceNameID').val(jsonData[0].service_name);
                $('#serviceDesID').val(jsonData[0].service_des);
                $('#serviceImgID').val(jsonData[0].service_img);
            }
            else{
                $('#serviceEditWrong').removeClass('d-none');
                $('#serviceEditLoader').addClass('d-none');
            }
          })
          .catch(function(error) {
                            $('#serviceEditWrong').removeClass('d-none');
                $('#serviceEditLoader').addClass('d-none');
          });
  }
