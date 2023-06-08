<script lang="ts">
	import { onMount } from 'svelte';
	import type { TimeClockType } from '../../types/time-clock.type';
	import TimeClockCard from './time-clock-card.svelte';
	import PaginationControls from '../../components/pagination-controls.svelte';
	import type { UserType } from '../../types/user.type';
	import type { IssueType } from '../../types/issue.type';
	import type { ProjectType } from '../../types/project.type';
	import TimeClockFilters from './time-clock-filters.svelte';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable';
	import { get } from 'svelte/store';

	export let data;

	let paginated: TimeClockType[] = [];
	let limit = 10;
	let offset = 0;
	let count = 0;
	let showPagination = false;

	let users: UserType[] = [];
	let issues: IssueType[] = [];
	let projects: ProjectType[] = [];

	let session: UserSessionType = get(userSession);

	const editor: { [key: string]: TimeClockType } = {
		new: {
			Start: {},
			End: {}
		},
		edit: {
			Start: {},
			End: {}
		}
	};

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

	const filterTimeClocks = async (ev: any) => {
		const result = await fetch(ev.detail);
		if (result.ok) {
			data.timeclocks = await result.json();
			offset = 0;
			count = data.timeclocks.length;
			showPagination = false;
			setTimeout(() => {
				setPaginated();
			}, 25);
		}
	};

	const editTimeClock = (ev: any) => {
		const { UUID } = ev.detail;
		console.log('editTimeClock', UUID);
		editor.edit = data.timeclocks.find((t: TimeClockType) => t.UUID == UUID);
		showEdit();
	};

	let hideNew = () => {};

	let showEdit = () => {};

	let hideEdit = () => {};

	onMount(() => {
		count = data.timeclocks.length;
		users = data.users;
		issues = data.issues;
		projects = data.projects;
		setTimeout(() => {
			setPaginated();
		}, 25);
	});
</script>

<h1>Time Clocks</h1>

<TimeClockFilters
	{users}
	{issues}
	{projects}
	{editor}
	on:filterTimeClocks={filterTimeClocks}
	bind:showEdit
	bind:hideEdit
	bind:hideNew
/>

{#each paginated as timeClock}
	<TimeClockCard {timeClock} on:editTimeClock={editTimeClock} />
{:else}
	<div>No Time Clocks</div>
{/each}

{#if showPagination}
	<PaginationControls {count} {offset} {limit} on:setPage={setPage} on:setPerPage={setPerPage} />
{/if}
