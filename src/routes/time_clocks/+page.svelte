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
	import { RemoveBlanks } from '$lib/remove-blanks';
	import { apiUrl } from '$lib/api-url';
	import { buildHeaders } from '$lib/build-headers';
	import FaRegClock from 'svelte-icons/fa/FaRegClock.svelte';

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

	const createTimeClock = async (ev: any) => {
		const timeClock: TimeClockType = ev.detail.timeClock;
		const { Start, End, ...rest } = timeClock;
		const sanitized = RemoveBlanks(rest, true);
		const payload = { ...sanitized };
		if (Start.Date && Start.Time) payload.Start = Start;
		if (End.Date && End.Time) payload.End = End;
		const result = await fetch(`${apiUrl}/timeclock`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			await result.json();
			hideNew();
		} else hideNew();
	};

	const updateTimeClock = async (ev: any) => {
		const timeClock: TimeClockType = ev.detail.timeClock;
		const { Start, End, UUID, ...rest } = timeClock;
		const sanitized = RemoveBlanks(rest, true);
		const payload: any = { ...sanitized };
		if (Start.Date && Start.Time) payload.Start = Start;
		if (End.Date && End.Time) payload.End = End;
		const result = await fetch(`${apiUrl}/timeclock/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			await result.json();
			hideEdit();
		}
		hideEdit();
	};

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

<div class="flex flex-wrap">
	<div class="icon mr-2 mt-1">
		<FaRegClock />
	</div>
	<h1>Time Clocks</h1>
</div>

<TimeClockFilters
	{users}
	{issues}
	{projects}
	{editor}
	on:filterTimeClocks={filterTimeClocks}
	on:createTimeClock={createTimeClock}
	on:updateTimeClock={updateTimeClock}
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
