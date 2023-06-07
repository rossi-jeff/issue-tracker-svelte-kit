<script lang="ts">
	import { onMount } from 'svelte';
	import type { IssueType } from '../../types/issue.type';
	import IssueCard from './issue-card.svelte';
	import PaginationControls from '../../components/pagination-controls.svelte';

	export let data;

	let paginated: IssueType[] = [];
	let limit = 10;
	let offset = 0;
	let count = 0;
	let showPagination = false;

	const setPaginated = () => {
		paginated = data.issues.slice(offset, offset + limit);
		showPagination = true;
	};

	const setPage = (ev: any) => {
		offset = (ev.detail - 1) * limit;
		showPagination = false;
		setTimeout(() => {
			setPaginated();
		}, 25);
	};

	const setPerPage = (ev: any) => {
		limit = ev.detail;
		offset = 0;
		showPagination = false;
		setTimeout(() => {
			setPaginated();
		}, 25);
	};

	onMount(() => {
		count = data.issues.length;
		setTimeout(() => {
			setPaginated();
		}, 25);
	});
</script>

<h1>Issues</h1>

{#each paginated as issue}
	<IssueCard {issue} />
{:else}
	<div>No Issues</div>
{/each}

{#if showPagination}
	<PaginationControls {count} {offset} {limit} on:setPage={setPage} on:setPerPage={setPerPage} />
{/if}
