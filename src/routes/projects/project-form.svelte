<script lang="ts">
	import type { ProjectType } from '../../types/project.type';

	export let project: ProjectType;
</script>

<div class="my-2">
	<div class="mb-2">
		<label for="project-name" class="font-bold block">Name</label>
		<input type="text" name="project-name" class="w-full" bind:value={project.Name} />
	</div>
	<div>
		<label for="project-details" class="font-bold block">Details</label>
		<textarea name="project-details" class="w-full" bind:value={project.Details} />
	</div>
</div>
