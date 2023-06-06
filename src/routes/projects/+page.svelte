<script>
	import ProjectCard from './project-card.svelte';

	export let data;
</script>

<h1>Projects</h1>

{#each data.projects as project}
	<ProjectCard {project} />
{:else}
	<div>No Projects</div>
{/each}
