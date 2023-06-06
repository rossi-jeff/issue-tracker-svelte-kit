<script lang="ts">
	import type { ProjectType } from '../../types/project.type';

	export let project: ProjectType;
</script>

<div class="card" id="project-{project.UUID}">
	<h2>{project.Name}</h2>
	<div>{project.Details}</div>
</div>
