<script lang="ts">
	import { onMount } from 'svelte';
	import type { IssueType } from '../../types/issue.type.js';

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
	<div>
		<h2>New</h2>
		{#each sorted['new'] as issue}
			<div>{issue.SequenceNumber}</div>
		{/each}
	</div>
	<div>
		<h2>Assigned</h2>
		{#each sorted['assigned'] as issue}
			<div>{issue.SequenceNumber}</div>
		{/each}
	</div>
	<div>
		<h2>Accepted</h2>
		{#each sorted['accepted'] as issue}
			<div>{issue.SequenceNumber}</div>
		{/each}
	</div>
	<div>
		<h2>Fixed</h2>
		{#each sorted['fixed'] as issue}
			<div>{issue.SequenceNumber}</div>
		{/each}
	</div>
</div>
<div>
	<h2>Other</h2>
	{#each sorted['other'] as issue}
		<div>{issue.SequenceNumber}</div>
	{/each}
</div>
