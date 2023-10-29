<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

const domains = ref([]);

const name = ref("");
const pointsTo = ref("");

onMounted(async () => {
	domains.value = await window.api.getDomains();
});

async function handleCreateDomain() {
	window.api.createDomain(name.value, pointsTo.value);
	domains.value = await window.api.getDomains();
}

async function handleDeleteDomain(id) {
	window.api.deleteDomain(id);
	domains.value = await window.api.getDomains();
}

async function handleStartDomain(event, id) {
	event.target.classList.toggle("iconoir-play");
	event.target.classList.toggle("iconoir-square");
	window.api.startDomain(id);
}

function closeApp() {
	window.api.closeApp();
}

function minApp() {
	window.api.minApp();
}
</script>

<template>
	<div class="container-fluid pt-2 drag-area" id="top-bar">
		<div class="row">
			<div class="col-6">
				<p class="m-0 p-0 fw-bold text-primary">HOST.</p>
			</div>
			<div class="col-6 text-end d-flex align-self-center justify-content-end">
				<i class="btn iconoir-circle text-warning fs-6 p-0 me-2" @click="minApp()"></i>
				<i class="btn iconoir-circle text-danger fs-6 p-0" @click="closeApp()"></i>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<hr class="m-0 p-0 mt-2" />
			</div>
		</div>
	</div>
	<div class="container p-4">
		<div class="row">
			<div class="col-6">
				<h1 class="m-0 fw-bold">Domains</h1>
			</div>
			<div class="col-6 d-flex align-self-center justify-content-end">
				<button type="button" class="btn btn-primary text-white" data-bs-toggle="modal" data-bs-target="#addDomainModal">Add Domain</button>
			</div>
		</div>
		<div class="row mt-4">
			<div class="col-12">
				<table class="table table-hover" v-if="domains.length != 0">
					<thead>
						<tr>
							<!-- <th>Status</th> -->
							<th scope="col">Name</th>
							<th>Points To</th>
							<th class="text-end">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="domain in domains" :key="domain.dataValues.id">
							<!-- <td class="align-middle"><span class="status-circle bg-success"></span></td> -->
							<td class="align-middle">{{ domain.dataValues.name }}</td>
							<td class="align-middle">{{ domain.dataValues.pointsTo }}</td>
							<td class="align-middle text-end">
								<!-- <button class="btn btn-warning me-2">
									<i class="iconoir-edit-pencil"></i>
								</button> -->
								<i class="btn iconoir-play fs-5 p-0 me-2" @click="handleStartDomain($event, domain.dataValues.id)"></i>
								<i class="btn iconoir-bin fs-5 p-0 me-2" @click="handleDeleteDomain(domain.dataValues.id)"></i>
							</td>
						</tr>
					</tbody>
				</table>
				<div v-else-if="domains.length == 0" class="text-center">
					<h2 class="pt-5">No Domains Found!</h2>
					<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addDomainModal">Add Domain</button>
				</div>
				<div v-else class="d-flex justify-content-center align-items-center">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
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
						<button type="button" class="btn btn-primary" @click="handleCreateDomain()" data-bs-dismiss="modal">Add</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
