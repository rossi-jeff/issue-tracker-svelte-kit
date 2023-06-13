<script lang="ts">
	import { onMount } from 'svelte';
	import type { ProjectType } from '../../types/project.type';
	import ProjectCard from './project-card.svelte';
	import PaginationControls from '../../components/pagination-controls.svelte';
	import ProjectDialogs from './project-dialogs.svelte';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable';
	import { get } from 'svelte/store';
	import { apiUrl } from '../../lib/api-url';
	import { buildHeaders } from '../../lib/build-headers';
	import FaTools from 'svelte-icons/fa/FaTools.svelte';

	export let data;

	let paginated: ProjectType[] = [];
	let limit = 10;
	let offset = 0;
	let count = 0;
	let showPagination = false;

	const editor: { [key: string]: ProjectType } = {
		new: {},
		edit: {}
	};

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

	const createProject = async (ev: any) => {
		const {
			project: { Name, Details }
		} = ev.detail;
		const result = await fetch(`${apiUrl}/project`, {
			method: 'POST',
			body: JSON.stringify({ Name, Details }),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			const project = await result.json();
			console.log({ project });
			hideNew();
		} else hideNew();
	};

	const updateProject = async (ev: any) => {
		const {
			project: { Name, Details, UUID }
		} = ev.detail;
		const result = await fetch(`${apiUrl}/project/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify({ Name, Details }),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			const project = await result.json();
			console.log({ project });
			hideEdit();
		} else hideEdit();
	};

	const editProject = (ev: any) => {
		const { UUID } = ev.detail;
		editor.edit = data.projects.find((p: ProjectType) => p.UUID == UUID);
		showEdit();
	};

	let showEdit = () => {};

	let hideEdit = () => {};

	let hideNew = () => {};

	let session: UserSessionType = get(userSession);

	onMount(() => {
		count = data.projects.length;
		setTimeout(() => {
			setPaginated();
		}, 25);
	});
</script>

<svelte:head>
	<title>Issue Tracker | Projects</title>
</svelte:head>

<div class="flex flex-wrap">
	<div class="icon mr-2 mt-1">
		<FaTools />
	</div>
	<h1 class="mr-4">Projects</h1>
	{#if session.signedIn}
		<ProjectDialogs
			{editor}
			on:createProject={createProject}
			on:updateProject={updateProject}
			bind:showEdit
			bind:hideEdit
			bind:hideNew
		/>
	{/if}
</div>

{#each paginated as project}
	<ProjectCard {project} on:editProject={editProject} />
{:else}
	<div>No Projects</div>
{/each}

{#if showPagination}
	<PaginationControls {count} {offset} {limit} on:setPage={setPage} on:setPerPage={setPerPage} />
{/if}
