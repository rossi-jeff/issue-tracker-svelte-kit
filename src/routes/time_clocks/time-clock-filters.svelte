<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { IssueType } from '../../types/issue.type';
	import type { ProjectType } from '../../types/project.type';
	import type { UserType } from '../../types/user.type';
	import { getFullName } from '../../lib/get-full-name';
	import { apiUrl } from '../../lib/api-url';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable';
	import { get } from 'svelte/store';
	import type { TimeClockType } from '../../types/time-clock.type';
	import TimeClockForm from './time-clock-form.svelte';
	import NewTimeClockForm from './new-time-clock-form.svelte';

	export let users: UserType[];
	export let issues: IssueType[];
	export let projects: ProjectType[];
	export let editor: { [key: string]: TimeClockType };

	let filteredIssues: IssueType[] = [];

	let filters: { [key: string]: string } = {};

	const dispatch = createEventDispatcher();

	let session: UserSessionType = get(userSession);

	const toggleContent = () => {
		const el = document.getElementById('time-clock-filter-content');
		if (el) el.classList.toggle('open');
	};

	const filterIssues = () => {
		const { ProjectId, IssueId } = filters;
		if (ProjectId) {
			let found = false;
			let newFilters = [];
			for (const issue of issues) {
				if (issue.ProjectId == ProjectId) newFilters.push(issue);
				if (issue.Id && issue.Id == parseInt(IssueId)) found = true;
			}
			filteredIssues = newFilters;
			if (!found) filters.IssueId = '';
		} else filteredIssues = issues;
		filterChanged();
	};

	const setProjectId = () => {
		const { IssueId } = filters;
		if (IssueId) {
			const issue = issues.find((i) => i.Id && i.Id == parseInt(IssueId));
			if (issue && issue.ProjectId) filters.ProjectId = issue.ProjectId;
		}
		filterChanged();
	};

	const clearFilters = () => {
		for (const key in filters) filters[key] = '';
		filterChanged();
	};

	const filterChanged = () => {
		const url = new URL('/timeclock', apiUrl);
		for (const key in filters) {
			if (filters[key] != '') url.searchParams.append(key, filters[key]);
		}
		dispatch('filterTimeClocks', url.href);
	};

	const showOverlay = () => {
		const overlay = document.getElementById('time-clocks-overlay');
		if (overlay) overlay.classList.add('open');
	};

	const hideOverlay = () => {
		const overlay = document.getElementById('time-clocks-overlay');
		if (overlay) overlay.classList.remove('open');
	};

	const showNew = () => {
		hideEdit();
		showOverlay();
		const dialog = document.getElementById('new-time-clock-dialog');
		if (dialog) dialog.classList.add('open');
	};

	export const hideNew = () => {
		const dialog = document.getElementById('new-time-clock-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	export const showEdit = () => {
		hideNew();
		showOverlay();
		const dialog = document.getElementById('edit-time-clock-dialog');
		if (dialog) dialog.classList.add('open');
	};

	export const hideEdit = () => {
		const dialog = document.getElementById('edit-time-clock-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	const createTimeClock = () => {
		const timeClock = editor.new;
		dispatch('createTimeClock', { timeClock });
	};

	const updateTimeClock = () => {
		const timeClock = editor.edit;
		dispatch('updateTimeClock', { timeClock });
	};

	onMount(() => {
		filteredIssues = issues;
	});
</script>

<div class="card" id="time-clock-filters">
	<div class="flex flex-wrap">
		<button on:click={toggleContent} class="mr-4">Filter</button>
		{#if session.signedIn}
			<button on:click={showNew}>New Time Clock</button>
		{/if}
	</div>
	<div class="filter-content" id="time-clock-filter-content">
		<div class="flex flex-wrap justify-between mb-2">
			<div>
				<label for="user-id" class="font-bold block">Users</label>
				<select name="user-id" bind:value={filters.UserId} on:change={filterChanged}>
					<option value="">- select -</option>
					{#each users as u}
						<option value={u.Id}>{getFullName(u)}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="project-id" class="font-bold block">Projects</label>
				<select name="project-id" bind:value={filters.ProjectId} on:change={filterIssues}>
					<option value="">- select -</option>
					{#each projects as p}
						<option value={p.Id}>{p.Sequence ? p.Sequence.Prefix : ''} | {p.Name}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="issue-id" class="font-bold block">Issues</label>
				<select name="issue-id" bind:value={filters.IssueId} on:change={setProjectId}>
					<option value="">- select -</option>
					{#each filteredIssues as i}
						<option value={i.Id}>{i.SequenceNumber} | {i.Title}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="flex flex-wrap justify-between">
			<div>
				<label for="start-date" class="font-bold block">Start Date</label>
				<input
					type="date"
					name="start-date"
					bind:value={filters.StartDate}
					on:change={filterChanged}
				/>
			</div>
			<div>
				<label for="end-date" class="font-bold block">End Date</label>
				<input type="date" name="end-date" bind:value={filters.EndDate} on:change={filterChanged} />
			</div>
			<div>
				<button on:click={clearFilters}>Clear Filters</button>
			</div>
		</div>
	</div>
</div>

<div class="modal-overlay" id="time-clocks-overlay">
	<!-- new time clock -->
	<div class="modal-50" id="new-time-clock-dialog">
		<h2>New Time Clock</h2>
		<NewTimeClockForm timeClock={editor.new} {users} {projects} {issues} />
		<div class="flex flex-wrap justify-between">
			<button on:click={hideNew}>Cancel</button>
			<button on:click={createTimeClock}>Create Time Clock</button>
		</div>
	</div>
	<!-- edit time clock-->
	<div class="modal-50" id="edit-time-clock-dialog">
		<h2>Edit Time Clock</h2>
		<TimeClockForm timeClock={editor.edit} {users} {projects} {issues} />
		<div class="flex flex-wrap justify-between">
			<button on:click={hideEdit}>Cancel</button>
			<button on:click={updateTimeClock}>Update Time Clock</button>
		</div>
	</div>
</div>
