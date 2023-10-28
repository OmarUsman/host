<script setup>
import { ref } from "vue";
import { onMounted } from "vue";

const domains = ref([]);

const name = ref("");
const pointsTo = ref("");

onMounted(async () => {
	domains.value = await window.api.getDomains();
	console.log(domains);
});

async function handleCreateDomain() {
	window.api.createDomain(name.value, pointsTo.value);

	domains.value = await window.api.getDomains();
	console.log(domains);
}

async function handleDeleteDomain(id) {
	window.api.deleteDomain(id);

	domains.value = await window.api.getDomains();
	console.log(domains);
}

async function handleStartDomain(id) {
	window.api.startDomain(id);
}
</script>

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
									<i class="bi bi-pen"></i>
								</button> -->
								<button class="btn btn-danger me-2" type="button" @click="handleDeleteDomain(domain.dataValues.id)">
									<i class="bi bi-trash"></i>
								</button>
								<button class="btn btn-success" type="button" @click="handleStartDomain(domain.dataValues.id)">
									<i class="bi bi-play-circle"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				<div v-else-if="domains.length == 0" class="text-center">
					<h1 class="pt-5">No Domains Found!</h1>
					<button type="button" class="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#addDomainModal">Add Domain</button>
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
