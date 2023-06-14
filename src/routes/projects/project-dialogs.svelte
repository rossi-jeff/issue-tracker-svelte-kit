<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { ProjectType } from '../../types/project.type';
	import ProjectForm from './project-form.svelte';
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte';
	import FaBan from 'svelte-icons/fa/FaBan.svelte';
	import FaSave from 'svelte-icons/fa/FaSave.svelte';

	export let editor: { [key: string]: ProjectType };

	const showOverlay = () => {
		const overlay = document.getElementById('projects-overlay');
		if (overlay) overlay.classList.add('open');
	};

	const hideOverlay = () => {
		const overlay = document.getElementById('projects-overlay');
		if (overlay) overlay.classList.remove('open');
	};

	const showNew = () => {
		hideEdit();
		showOverlay();
		const dialog = document.getElementById('new-project-dialog');
		if (dialog) dialog.classList.add('open');
	};

	export const hideNew = () => {
		const dialog = document.getElementById('new-project-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	export const showEdit = () => {
		hideNew();
		showOverlay();
		const dialog = document.getElementById('edit-project-dialog');
		if (dialog) dialog.classList.add('open');
	};

	export const hideEdit = () => {
		const dialog = document.getElementById('edit-project-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	const dispatch = createEventDispatcher();

	const createProject = () => {
		dispatch('createProject', { project: editor.new });
	};

	const updateProject = () => {
		dispatch('updateProject', { project: editor.edit });
	};
</script>

<button on:click={showNew} class="new-project">
	New Project
	<span class="icon-sm inline-block">
		<FaPlusCircle />
	</span>
</button>

<div class="modal-overlay" id="projects-overlay">
	<!-- new project -->
	<div class="modal-50" id="new-project-dialog">
		<h2>New Project</h2>
		<ProjectForm project={editor.new} />
		<div class="flex flex-wrap justify-between">
			<button on:click={hideNew}>
				<span class="icon-sm inline-block">
					<FaBan />
				</span>
				Cancel
			</button>
			<button on:click={createProject}>
				Create Project
				<span class="icon-sm inline-block">
					<FaSave />
				</span>
			</button>
		</div>
	</div>
	<!-- edit project -->
	<div class="modal-50" id="edit-project-dialog">
		<h2>Edit Project</h2>
		<ProjectForm project={editor.edit} />
		<div class="flex flex-wrap justify-between">
			<button on:click={hideEdit}>
				<span class="icon-sm inline-block">
					<FaBan />
				</span>
				Cancel
			</button>
			<button on:click={updateProject}>
				Update Project
				<span class="icon-sm inline-block">
					<FaSave />
				</span>
			</button>
		</div>
	</div>
</div>
