<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { getFullName } from '../../lib/get-full-name';
	import {
		ComplexityArray,
		IssueTypeArray,
		PriorityArray,
		StatusArray
	} from '../../types/array.types';
	import type { UserType } from '../../types/user.type';
	import { apiUrl } from '../../lib/api-url';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable';
	import { get } from 'svelte/store';
	import type { IssueType } from '../../types/issue.type';
	import IssueForm from './issue-form.svelte';
	import type { ProjectType } from '../../types/project.type';
	import FaFilter from 'svelte-icons/fa/FaFilter.svelte';
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte';

	export let users: UserType[];
	export let editor: { [key: string]: IssueType };

	let filters: { [key: string]: string } = {};

	let session: UserSessionType = get(userSession);

	const dispatch = createEventDispatcher();

	const clearFilters = () => {
		for (const key in filters) filters[key] = '';
		filterChanged();
	};

	const toggleContent = () => {
		const el = document.getElementById('issue-filter-content');
		if (el) el.classList.toggle('open');
	};

	const filterChanged = () => {
		const url = new URL('/issue', apiUrl);
		for (const key in filters) {
			if (filters[key] != '') url.searchParams.append(key, filters[key]);
		}
		dispatch('filterIssues', url.href);
	};

	const showOverlay = () => {
		const overlay = document.getElementById('issues-overlay');
		if (overlay) overlay.classList.add('open');
	};

	const hideOverlay = () => {
		const overlay = document.getElementById('issues-overlay');
		if (overlay) overlay.classList.remove('open');
	};

	const showNew = () => {
		hideEdit();
		showOverlay();
		const dialog = document.getElementById('new-issue-dialog');
		if (dialog) dialog.classList.add('open');
	};

	export const hideNew = () => {
		const dialog = document.getElementById('new-issue-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	export const showEdit = () => {
		hideNew();
		showOverlay();
		const dialog = document.getElementById('edit-issue-dialog');
		if (dialog) dialog.classList.add('open');
	};

	export const hideEdit = () => {
		const dialog = document.getElementById('edit-issue-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	let projects: ProjectType[] = [];

	const loadProjects = async () => {
		const results = await fetch(`${apiUrl}/project`);
		if (results.ok) {
			projects = await results.json();
		}
	};

	const createIssue = () => {
		const issue = editor.new;
		if (!issue.ProjectId) return;
		dispatch('createIssue', { issue });
	};

	const updateIssue = () => {
		const issue = editor.edit;
		dispatch('updateIssue', { issue });
	};

	onMount(() => {
		loadProjects();
	});
</script>

<div class="card" id="issue-filters">
	<div class="flex flex-wrap">
		<button on:click={toggleContent} class="mr-4">
			<span class="icon-sm inline-block">
				<FaFilter />
			</span>
			Filter
		</button>
		{#if session.signedIn}
			<button on:click={showNew}>
				New Issue
				<span class="icon-sm inline-block">
					<FaPlusCircle />
				</span>
			</button>
		{/if}
	</div>
	<div class="filter-content dotted-box" id="issue-filter-content">
		<div class="flex flex-wrap justify-between">
			<div>
				<label for="priority" class="font-bold block">Priority</label>
				<select name="priority" bind:value={filters.Priority} on:change={filterChanged}>
					<option value="">- select -</option>
					{#each PriorityArray as p}
						<option value={p}>{p}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="status" class="font-bold block">Status</label>
				<select name="status" bind:value={filters.Status} on:change={filterChanged}>
					<option value="">- select -</option>
					{#each StatusArray as s}
						<option value={s}>{s}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="type" class="font-bold block">Type</label>
				<select name="type" bind:value={filters.Type} on:change={filterChanged}>
					<option value="">- select -</option>
					{#each IssueTypeArray as t}
						<option value={t}>{t}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="complexity" class="font-bold block">Complexity</label>
				<select name="complexity" bind:value={filters.Complexity} on:change={filterChanged}>
					<option value="">- select -</option>
					{#each ComplexityArray as c}
						<option value={c}>{c}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="author-id" class="font-bold block">Author</label>
				<select name="author-id" bind:value={filters.AuthorId} on:change={filterChanged}>
					<option value="">- select -</option>
					{#each users as u}
						<option value={u.Id}>{getFullName(u)}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="assigned-to-id" class="font-bold block">Assigned</label>
				<select name="assigned-to-id" bind:value={filters.AssignedToId} on:change={filterChanged}>
					<option value="">- select -</option>
					{#each users as u}
						<option value={u.Id}>{getFullName(u)}</option>
					{/each}
				</select>
			</div>
			<div>
				<label for="clear-btn">&nbsp;</label>
				<button name="clear-btn" on:click={clearFilters}>Clear Filters</button>
			</div>
		</div>
	</div>
</div>

<div class="modal-overlay" id="issues-overlay">
	<!-- new issue -->
	<div class="modal-50" id="new-issue-dialog">
		<h2>New Issue</h2>
		<IssueForm issue={editor.new} {users} {projects} />
		<div class="flex flex-wrap justify-between">
			<button on:click={hideNew}>Cancel</button>
			<button on:click={createIssue}>Create Issue</button>
		</div>
	</div>
	<!-- edit issue -->
	<div class="modal-50" id="edit-issue-dialog">
		<h2>Edit Issue</h2>
		<IssueForm issue={editor.edit} {users} {projects} />
		<div class="flex flex-wrap justify-between">
			<button on:click={hideEdit}>Cancel</button>
			<button on:click={updateIssue}>Update Issue</button>
		</div>
	</div>
</div>
