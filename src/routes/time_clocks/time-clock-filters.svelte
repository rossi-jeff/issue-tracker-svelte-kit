<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import type { IssueType } from '../../types/issue.type';
	import type { ProjectType } from '../../types/project.type';
	import type { UserType } from '../../types/user.type';
	import { getFullName } from '../../lib/get-full-name';
	import { apiUrl } from '../../lib/api-url';

	export let users: UserType[];
	export let issues: IssueType[];
	export let projects: ProjectType[];

	let filteredIssues: IssueType[] = [];

	let filters: { [key: string]: string } = {};

	const dispatch = createEventDispatcher();

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

	onMount(() => {
		filteredIssues = issues;
	});
</script>

<div class="card" id="time-clock-filters">
	<button on:click={toggleContent}>Filter</button>
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
