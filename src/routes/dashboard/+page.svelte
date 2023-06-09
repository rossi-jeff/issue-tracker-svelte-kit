<script lang="ts">
	import { onMount } from 'svelte';
	import type { IssueType } from '../../types/issue.type.js';
	import DashboardIssueCard from './dashboard-issue-card.svelte';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable.js';
	import { get } from 'svelte/store';
	import { clone } from '$lib/clone.js';

	export let data;

	let session: UserSessionType = get(userSession);

	let sorted: { [key: string]: IssueType[] } = {
		new: [],
		assigned: [],
		accepted: [],
		fixed: [],
		other: []
	};

	const sortIssues = () => {
		for (const key in sorted) sorted[key] = [];
		for (const issue of data.issues) {
			switch (issue.Status) {
				case 'New':
					sorted['new'].push(issue);
					break;
				case 'Assigned':
					sorted['assigned'].push(issue);
					break;
				case 'Accepted':
					sorted['accepted'].push(issue);
					break;
				case 'Fixed':
					sorted['fixed'].push(issue);
					break;
				default:
					sorted['other'].push(issue);
					break;
			}
		}
	};

	const dragStart = (event: any) => {
		event.preventDefault();
		if (event.target) event.dataTransfer.setData('text', event.target.id);
		else if (event.detail) event.detail.dataTransfer.setData('text', event.detail.target.id);
	};

	const dragOver = (event: any) => {
		event.preventDefault();
	};

	const dragEnter = (event: any) => {
		let { target } = event;
		if (target) {
			while (target && !target.classList.contains('dashboard-column')) {
				target = target.parentElement;
			}
			target.classList.add('over');
			setTimeout(() => {
				target.classList.remove('over');
			}, 500);
		}
	};

	const drop = (event: any) => {
		event.preventDefault();
		event.stopPropagation();
		const data = event.dataTransfer.getData('text');
		const [from, uuid] = data.split('_');
		let { target } = event;
		let to = '';
		if (target) {
			while (target && !target.classList.contains('dashboard-column')) {
				target = target.parentElement;
			}
			to = target.id.split('-')[1];
		}
		let issue, idx;
		switch (from) {
			case 'New':
				idx = sorted.new.findIndex((i) => i.UUID == uuid);
				if (idx != -1) {
					issue = sorted.new[idx];
					sorted.new.splice(idx, 1);
				}
				break;
			case 'Assigned':
				idx = sorted.assigned.findIndex((i) => i.UUID == uuid);
				if (idx != -1) {
					issue = sorted.assigned[idx];
					sorted.assigned.splice(idx, 1);
				}
				break;
			case 'Accepted':
				idx = sorted.accepted.findIndex((i) => i.UUID == uuid);
				if (idx != -1) {
					issue = sorted.accepted[idx];
					sorted.accepted.splice(idx, 1);
				}
				break;
			case 'Fixed':
				idx = sorted.fixed.findIndex((i) => i.UUID == uuid);
				if (idx != -1) {
					issue = sorted.fixed[idx];
					sorted.fixed.splice(idx, 1);
				}
				break;
			case 'Other':
				idx = sorted.other.findIndex((i) => i.UUID == uuid);
				if (idx != -1) {
					issue = sorted.other[idx];
					sorted.other.splice(idx, 1);
				}
				break;
		}
		if (issue) {
			switch (to) {
				case 'New':
					sorted.new.push(issue);
					break;
				case 'Assigned':
					sorted.assigned.push(issue);
					break;
				case 'Accepted':
					sorted.accepted.push(issue);
					break;
				case 'Fixed':
					sorted.fixed.push(issue);
					break;
				case 'Other':
					sorted.other.push(issue);
					break;
			}
			sorted = clone(sorted);
		}
	};

	onMount(() => {
		sortIssues();
	});
</script>

<h1>Dashboard</h1>

<div class="flex flex-wrap justify-between">
	<div class="w-[23%]">
		<h2>New</h2>
		<div
			class="dashboard-column"
			id="column-New"
			on:dragover={dragOver}
			on:dragenter={dragEnter}
			on:drop={drop}
		>
			{#each sorted['new'] as issue}
				<DashboardIssueCard
					{issue}
					draggable={session.signedIn}
					from="New"
					on:dragStart={dragStart}
				/>
			{/each}
		</div>
	</div>
	<div class="w-[23%]">
		<h2>Assigned</h2>
		<div
			class="dashboard-column"
			id="column-Assigned"
			on:dragover={dragOver}
			on:dragenter={dragEnter}
			on:drop={drop}
		>
			{#each sorted['assigned'] as issue}
				<DashboardIssueCard
					{issue}
					draggable={session.signedIn}
					from="Assigned"
					on:dragStart={dragStart}
				/>
			{/each}
		</div>
	</div>
	<div class="w-[23%]">
		<h2>Accepted</h2>
		<div
			class="dashboard-column"
			id="column-Accepted"
			on:dragover={dragOver}
			on:dragenter={dragEnter}
			on:drop={drop}
		>
			{#each sorted['accepted'] as issue}
				<DashboardIssueCard
					{issue}
					draggable={session.signedIn}
					from="Accepted"
					on:dragStart={dragStart}
				/>
			{/each}
		</div>
	</div>
	<div class="w-[23%]">
		<h2>Fixed</h2>
		<div
			class="dashboard-column"
			id="column-Fixed"
			on:dragover={dragOver}
			on:dragenter={dragEnter}
			on:drop={drop}
		>
			{#each sorted['fixed'] as issue}
				<DashboardIssueCard
					{issue}
					draggable={session.signedIn}
					from="Fixed"
					on:dragStart={dragStart}
				/>
			{/each}
		</div>
	</div>
</div>
<div class="min-w-fit">
	<h2>Other</h2>
	<div
		class="dashboard-column"
		id="column-Other"
		on:dragover={dragOver}
		on:dragenter={dragEnter}
		on:drop={drop}
	>
		{#each sorted['other'] as issue}
			<DashboardIssueCard
				{issue}
				draggable={session.signedIn}
				from="Other"
				on:dragStart={dragStart}
			/>
		{/each}
	</div>
</div>
