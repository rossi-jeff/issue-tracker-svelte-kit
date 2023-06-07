<script lang="ts">
	import { onMount } from 'svelte';
	import type { IssueType } from '../../types/issue.type.js';
	import DashboardIssueCard from './dashboard-issue-card.svelte';

	export let data;

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

	onMount(() => {
		sortIssues();
	});
</script>

<h1>Dashboard</h1>

<div class="flex flex-wrap justify-between">
	<div class="w-[23%]">
		<h2>New</h2>
		<div class="dashboard-column">
			{#each sorted['new'] as issue}
				<DashboardIssueCard {issue} />
			{/each}
		</div>
	</div>
	<div class="w-[23%]">
		<h2>Assigned</h2>
		<div class="dashboard-column">
			{#each sorted['assigned'] as issue}
				<DashboardIssueCard {issue} />
			{/each}
		</div>
	</div>
	<div class="w-[23%]">
		<h2>Accepted</h2>
		<div class="dashboard-column">
			{#each sorted['accepted'] as issue}
				<DashboardIssueCard {issue} />
			{/each}
		</div>
	</div>
	<div class="w-[23%]">
		<h2>Fixed</h2>
		<div class="dashboard-column">
			{#each sorted['fixed'] as issue}
				<DashboardIssueCard {issue} />
			{/each}
		</div>
	</div>
</div>
<div class="min-w-fit">
	<h2>Other</h2>
	<div class="max-h-96 overflow-y-auto p-2">
		{#each sorted['other'] as issue}
			<DashboardIssueCard {issue} />
		{/each}
	</div>
</div>
