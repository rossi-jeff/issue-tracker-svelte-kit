<script lang="ts">
	import { onMount } from 'svelte';
	import type { IssueType } from '../../types/issue.type';
	import IssueCard from './issue-card.svelte';
	import PaginationControls from '../../components/pagination-controls.svelte';
	import IssueFilter from './issue-filter.svelte';
	import { RemoveBlanks } from '../../lib/remove-blanks';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable';
	import { get } from 'svelte/store';
	import { apiUrl } from '../../lib/api-url';
	import { buildHeaders } from '../../lib/build-headers';
	import FaList from 'svelte-icons/fa/FaList.svelte';
	import SignInAlert from '../../components/sign-in-alert.svelte';

	export let data;

	let paginated: IssueType[] = [];
	let limit = 10;
	let offset = 0;
	let count = 0;
	let showPagination = false;

	let session: UserSessionType = get(userSession);

	const editor: { [key: string]: IssueType } = {
		new: {},
		edit: {}
	};

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

	const filterIssues = async (ev: any) => {
		const result = await fetch(ev.detail);
		if (result.ok) {
			data.issues = await result.json();
			offset = 0;
			count = data.issues.length;
			showPagination = false;
			setTimeout(() => {
				setPaginated();
			}, 25);
		}
	};

	const editIssue = (ev: any) => {
		const { UUID } = ev.detail;
		editor.edit = data.issues.find((i: IssueType) => i.UUID == UUID);
		showEdit();
	};

	let showEdit = () => {};

	let hideNew = () => {};

	let hideEdit = () => {};

	const createIssue = async (ev: any) => {
		const { issue } = ev.detail;
		const payload = RemoveBlanks(issue, true);
		if (!payload.Status) payload.Status = 'New';
		const result = await fetch(`${apiUrl}/issue`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			await result.json();
			hideNew();
		} else hideNew();
	};

	const updateIssue = async (ev: any) => {
		const { issue } = ev.detail;
		const { UUID, ...payload } = RemoveBlanks(issue, true);
		if (!UUID) return;
		const result = await fetch(`${apiUrl}/issue/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			await result.json();
			hideEdit();
		} else hideEdit();
	};

	onMount(() => {
		count = data.issues.length;
		setTimeout(() => {
			setPaginated();
		}, 25);
	});
</script>

<svelte:head>
	<title>Issue Tracker | Issues</title>
</svelte:head>

<div class="flex flex-wrap">
	<div class="icon mr-2 mt-1">
		<FaList />
	</div>
	<h1>Issues</h1>
</div>

<IssueFilter
	users={data.users}
	{editor}
	on:filterIssues={filterIssues}
	on:createIssue={createIssue}
	on:updateIssue={updateIssue}
	bind:showEdit
	bind:hideNew
	bind:hideEdit
/>

{#each paginated as issue}
	<IssueCard {issue} on:editIssue={editIssue} />
{:else}
	<div>No Issues</div>
{/each}

{#if showPagination}
	<PaginationControls {count} {offset} {limit} on:setPage={setPage} on:setPerPage={setPerPage} />
{/if}

{#if !session.signedIn}
	<SignInAlert />
{/if}
