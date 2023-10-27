<template>
	<div class="container p-5">
		<div class="row">
			<div class="col-6">
				<h1 class="m-0">Domains</h1>
			</div>
			<div class="col-6 d-flex align-self-center justify-content-end">
				<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDomainModal">Add Domain</button>
			</div>
		</div>
		<div class="row mt-4">
			<div class="col-12">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Status</th>
							<th scope="col">Name</th>
							<th>Points To</th>
							<th class="text-end">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="align-middle"><span class="status-circle bg-success"></span></td>
							<td class="align-middle">Omar.local</td>
							<td class="align-middle">localhost:8080</td>
							<td class="align-middle text-end">
								<button class="btn btn-warning me-2">
									<i class="bi bi-pen"></i>
								</button>
								<button class="btn btn-danger">
									<i class="bi bi-trash"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="modal" tabindex="-1" id="addDomainModal">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<form method="post" action="#">
					<div class="modal-header">
						<h5 class="modal-title">Add Domain</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label class="form-label">Domain Name</label>
							<input v-model="name" type="text" class="form-control" name="domainName" placeholder="example.local" />
						</div>
						<div class="mb-3">
							<label class="form-label">Points To</label>
							<input v-model="pointsTo" type="text" class="form-control" name="domainPointsTo" placeholder="localhost:8000" />
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
						<button type="button" class="btn btn-primary" @click="handleCreateDomain()">Add</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

let name = ref("");
let pointsTo = ref("");

function handleCreateDomain() {
	window.api.createDomain(name.value, pointsTo.value);
}
</script>
