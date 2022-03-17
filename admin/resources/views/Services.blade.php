@extends('Layout.app')

@section('title','Visitors')

@section('content')
<div class="container " id="mainDiv">
	<div class="row">
		<div class="col-md-12 p-5">
			<table id="serviceDataTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
				<thead>
					<tr>
					<th class="th-sm">Image</th>
					<th class="th-sm">Name</th>
					<th class="th-sm">Description</th>
					<th class="th-sm">Edit</th>
					<th class="th-sm">Delete</th>
					</tr>
				</thead>
				<tbody id="service_table">

				</tbody>
			</table>
		</div>
	</div>
</div>

<div class="container m-5" id="loaderDiv">
	<div class="row">
		<div class="col-md-12 p-5 text-center ">
			<img class="loading-icon" src="{{asset('images/loader.svg')}}"/>
		</div>
	</div>
</div>

<div class="container d-none" id="WrongDiv">
	<div class="row">
		<div class="col-md-12 p-5 text-center ">
			<h3>Something Went Wrong</h3>
		</div>
	</div>
</div>



<!-- Modal For Service Delete -->
<div class="modal" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body p-3 text-center">
        <h5 class="mt-4">Do You Want To Delete?</h5>
        <h5 id="serviceDeleteId" class="mt-4">   </h5>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">No</button>
        <button  id="serviceDeleteConfirmBtn" type="button" class="btn  btn-sm  btn-danger">Yes</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal For Service Edit -->
<div class="modal" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body p-5 text-center">
	  	  <h5 id="serviceEditId" class="mt-4">   </h5>
	  	  <input id="serviceNameID" type="text" id="" class="form-control mb-4" placeholder="Service Name">
          <input id="serviceDesID" type="text" id="" class="form-control mb-4" placeholder="Service Description">
          <input id="serviceImgID" type="text" id="" class="form-control mb-4" placeholder="Service Image Link">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal">Cancel</button>
        <button  id="serviceEditConfirmBtn" type="button" class="btn  btn-sm  btn-danger">Save</button>
      </div>
    </div>
  </div>
</div>




@endsection

@section('script')
	<script type="text/javascript">
		getServicesData();
	</script>
@endsection