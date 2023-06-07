<script lang="ts">
	import { onMount } from 'svelte';
	import type { TimeClockType } from '../../types/time-clock.type';
	import TimeClockCard from './time-clock-card.svelte';
	import PaginationControls from '../../components/pagination-controls.svelte';

	export let data;

	let paginated: TimeClockType[] = [];
	let limit = 10;
	let offset = 0;
	let count = 0;
	let showPagination = false;

	const setPaginated = () => {
		paginated = data.timeclocks.slice(offset, offset + limit);
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
		count = data.timeclocks.length;
		setTimeout(() => {
			setPaginated();
		}, 25);
	});
</script>

<h1>Time Clocks</h1>

{#each paginated as timeClock}
	<TimeClockCard {timeClock} />
{:else}
	<div>No Time Clocks</div>
{/each}

{#if showPagination}
	<PaginationControls {count} {offset} {limit} on:setPage={setPage} on:setPerPage={setPerPage} />
{/if}
