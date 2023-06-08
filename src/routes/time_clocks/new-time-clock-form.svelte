<script lang="ts">
	import { onMount } from 'svelte';
	import { getFullName } from '../../lib/get-full-name';
	import type { IssueType } from '../../types/issue.type';
	import type { ProjectType } from '../../types/project.type';
	import type { TimeClockType } from '../../types/time-clock.type';
	import type { UserType } from '../../types/user.type';
	import { clone } from '../../lib/clone';

	export let timeClock: TimeClockType;
	export let users: UserType[];
	export let issues: IssueType[];
	export let projects: ProjectType[];

	let filteredIssues: IssueType[] = [];

	const setProjectId = () => {
		const { IssueId } = timeClock;
		if (IssueId) {
			const issue = issues.find((i) => i.Id && i.Id == parseInt(IssueId));
			if (issue && issue.ProjectId) timeClock.ProjectId = issue.ProjectId;
		}
	};

	const getProjectIssues = () => {
		const { ProjectId, IssueId } = timeClock;
		if (ProjectId) {
			const projectIssues: IssueType[] = [];
			let found = false;
			for (const issue of issues) {
				if (issue.ProjectId && issue.ProjectId == ProjectId) projectIssues.push(issue);
				if (issue.Id && IssueId && issue.Id == parseInt(IssueId)) found = true;
			}
			filteredIssues = projectIssues;
			if (!found) timeClock.IssueId = '';
		} else filteredIssues = clone(issues);
	};

	onMount(() => {
		filteredIssues = clone(issues);
	});
</script>

<div>
	<div class="flex flex-wrap justify-between mb-2">
		<div>
			<label for="user-id" class="font-bold block">User</label>
			<select name="user-id" bind:value={timeClock.UserId}>
				<option value="">- select -</option>
				{#each users as u}
					<option value={u.Id}>{getFullName(u)}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="project-id" class="font-bold block">Project</label>
			<select name="project-id" bind:value={timeClock.ProjectId} on:change={getProjectIssues}>
				<option value="">- select -</option>
				{#each projects as p}
					<option value={p.Id}>{p.Sequence ? p.Sequence.Prefix : ''} | {p.Name}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="mb-2">
		<div>
			<label for="issue-id" class="font-bold block">Issue</label>
			<select name="issue-id" bind:value={timeClock.IssueId} on:change={setProjectId}>
				<option value="">- select -</option>
				{#each filteredIssues as i}
					<option value={i.Id}>{i.SequenceNumber} | {i.Title}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="flex flex-wrap justify-between mb-2">
		<div>
			<label for="start-date" class="font-bold block">Start Date</label>
			<input type="date" name="start-date" bind:value={timeClock.Start.Date} />
		</div>
		<div>
			<label for="start-time" class="font-bold block">Start Time</label>
			<input type="time" name="start-time" bind:value={timeClock.Start.Time} />
		</div>
		<div>
			<label for="end-date" class="font-bold block">End Date</label>
			<input type="date" name="end-date" bind:value={timeClock.End.Date} />
		</div>
		<div>
			<label for="end-time" class="font-bold block">End Time</label>
			<input type="time" name="end-time" bind:value={timeClock.End.Time} />
		</div>
	</div>
</div>
