<script lang="ts">
	import { onMount } from 'svelte';
	import type { ProjectType } from '../../types/project.type';
	import ProjectCard from './project-card.svelte';
	import PaginationControls from '../../components/pagination-controls.svelte';

	export let data;

	let paginated: ProjectType[] = [];
	let limit = 10;
	let offset = 0;
	let count = 0;
	let showPagination = false;

	const setPaginated = () => {
		paginated = data.projects.slice(offset, offset + limit);
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
		count = data.projects.length;
		setTimeout(() => {
			setPaginated();
		}, 25);
	});
</script>

<h1>Projects</h1>

{#each paginated as project}
	<ProjectCard {project} />
{:else}
	<div>No Projects</div>
{/each}

{#if showPagination}
	<PaginationControls {count} {offset} {limit} on:setPage={setPage} on:setPerPage={setPerPage} />
{/if}
