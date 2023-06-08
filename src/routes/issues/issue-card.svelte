<script lang="ts">
	import { get } from 'svelte/store';
	import { getFullName } from '../../lib/get-full-name';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable';
	import type { IssueType } from '../../types/issue.type';
	import { createEventDispatcher } from 'svelte';

	export let issue: IssueType;

	let session: UserSessionType = get(userSession);

	const dispatch = createEventDispatcher();

	const editIssue = () => {
		const { UUID } = issue;
		dispatch('editIssue', { UUID });
	};
</script>

<div class="card" id="issue-{issue.UUID}">
	<div class="flex flex-wrap">
		{#if session.signedIn}
			<button class="mr-2" on:click={editIssue}>Edit</button>
		{/if}
		<h2>{issue.SequenceNumber}</h2>
	</div>
	<div class="font-bold mb-2">{issue.Title}</div>
	{#if issue.Project && issue.Project.Name}
		<div>
			<strong class="mr-4">Project</strong>
			{issue.Project.Name}
		</div>
	{/if}
	<div class="flex flex-wrap justify-between">
		<div>
			<strong class="mr-4">Priority</strong>
			{issue.Priority}
		</div>
		<div>
			<strong class="mr-4">Status</strong>
			{issue.Status}
		</div>
		<div>
			<strong class="mr-4">Type</strong>
			{issue.Type}
		</div>
		<div>
			<strong class="mr-4">Complexity</strong>
			{issue.Complexity}
		</div>
	</div>
	<div>{issue.Details}</div>
	<div class="flex flex-wrap justify-between">
		<div>
			<strong class="mr-4">Created</strong>
			{issue.Created}
		</div>
		<div>
			<strong class="mr-4">Author</strong>
			{issue.Author ? getFullName(issue.Author) : 'N/A'}
		</div>
		<div>
			<strong class="mr-4">Assigned To</strong>
			{issue.AssignedTo ? getFullName(issue.AssignedTo) : 'N/A'}
		</div>
	</div>
</div>
