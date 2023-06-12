<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getFullName } from '../../lib/get-full-name';
	import type { IssueType } from '../../types/issue.type';

	export let issue: IssueType;
	export let draggable: boolean;
	export let from: string;

	const dispatch = createEventDispatcher();

	const toggleMain = (uuid: string) => {
		const el = document.getElementById(`dashboard-main-content-${uuid}`);
		if (el) el.classList.toggle('open');
	};

	const toggleDescription = (uuid: string) => {
		const el = document.getElementById(`dashboard-description-${uuid}`);
		if (el) el.classList.toggle('open');
	};

	const toggleDetails = (uuid: string) => {
		const el = document.getElementById(`dashboard-details-${uuid}`);
		if (el) el.classList.toggle('open');
	};

	const dragStart = (ev: any) => {
		if (!draggable) return;
		dispatch('dragStart', ev);
	};
</script>

<div class="card" id="{from}_{issue.UUID}" {draggable} on:dragstart={dragStart}>
	<button class="dashboard" on:click={() => toggleMain(issue.UUID || '')}
		>{issue.SequenceNumber}</button
	>
	<div class="dashboard-main-content dotted-box" id="dashboard-main-content-{issue.UUID}">
		<button class="dashboard" on:click={() => toggleDescription(issue.UUID || '')}
			>Description</button
		>
		<div class="dashboard-description" id="dashboard-description-{issue.UUID}">
			{issue.Details}
		</div>
		<button class="dashboard" on:click={() => toggleDetails(issue.UUID || '')}>Details</button>
		<div class="dashboard-details" id="dashboard-details-{issue.UUID}">
			<div>
				<strong class="dashboard">Project</strong>
				{issue.Project ? issue.Project.Name : 'N/A'}
			</div>
			<div>
				<strong class="dashboard">Priority</strong>
				{issue.Priority}
			</div>
			<div>
				<strong class="dashboard">Status</strong>
				{issue.Status}
			</div>
			<div>
				<strong class="dashboard">Type</strong>
				{issue.Type}
			</div>
			<div>
				<strong class="dashboard">Complexity</strong>
				{issue.Complexity}
			</div>
			<div>
				<strong class="dashboard">Created</strong>
				{issue.Created}
			</div>
			<div>
				<strong class="dashboard">Author</strong>
				{issue.Author ? getFullName(issue.Author) : 'N/A'}
			</div>
			<div>
				<strong class="dashboard">Assigned To</strong>
				{issue.AssignedTo ? getFullName(issue.AssignedTo) : 'N/A'}
			</div>
		</div>
	</div>
</div>
