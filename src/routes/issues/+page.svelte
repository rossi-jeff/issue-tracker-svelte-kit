<script>
	import IssueCard from './issue-card.svelte';

	export let data;
</script>

<h1>Issues</h1>

{#each data.issues as issue}
	<IssueCard {issue} />
{:else}
	<div>No Issues</div>
{/each}
