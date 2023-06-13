<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ProjectType } from '../../types/project.type';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable';
	import { get } from 'svelte/store';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';

	export let project: ProjectType;

	let session: UserSessionType = get(userSession);

	const dispatch = createEventDispatcher();

	const editProject = () => {
		const { UUID } = project;
		dispatch('editProject', { UUID });
	};
</script>

<div class="card" id="project-{project.UUID}">
	<div class="flex flex-wrap">
		{#if session.signedIn}
			<button class="mr-2" on:click={editProject} title="Edit {project.Name}">
				<span class="icon inline-block">
					<FaEdit />
				</span>
			</button>
		{/if}
		<h2>{project.Name}</h2>
	</div>
	<div>{project.Details}</div>
</div>
