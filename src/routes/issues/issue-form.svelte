<script lang="ts">
	import { getFullName } from '../../lib/get-full-name';
	import {
		ComplexityArray,
		IssueTypeArray,
		PriorityArray,
		StatusArray
	} from '../../types/array.types';
	import type { IssueType } from '../../types/issue.type';
	import type { ProjectType } from '../../types/project.type';
	import type { UserType } from '../../types/user.type';

	export let issue: IssueType;
	export let users: UserType[];
	export let projects: ProjectType[];
</script>

<div class="my-2">
	{#if issue.SequenceNumber}
		<h3>{issue.SequenceNumber}</h3>
	{/if}
	<div class="mb-2">
		<label for="project-id" class="font-bold block">Project</label>
		<select name="project-id" class="w-full" bind:value={issue.ProjectId}>
			<option value="">- select -</option>
			{#each projects as p}
				<option value={p.Id}>{p.Sequence ? p.Sequence.Prefix : ''} | {p.Name}</option>
			{/each}
		</select>
	</div>
	<div class="mb-2">
		<label for="title" class="font-bold block">Title</label>
		<input type="text" class="w-full" name="title" bind:value={issue.Title} />
	</div>
	<div class="mb-2">
		<label for="details" class="font-bold block">Details</label>
		<textarea name="details" class="w-full" bind:value={issue.Details} />
	</div>
	<div class="flex flex-wrap justify-between mb-2">
		<div>
			<label for="priority" class="font-bold block">Priority</label>
			<select name="priority" bind:value={issue.Priority}>
				<option value="">- select -</option>
				{#each PriorityArray as p}
					<option value={p}>{p}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="status" class="font-bold block">Status</label>
			<select name="status" bind:value={issue.Status}>
				<option value="">- select -</option>
				{#each StatusArray as s}
					<option value={s}>{s}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="type" class="font-bold block">Type</label>
			<select name="type" bind:value={issue.Type}>
				<option value="">- select -</option>
				{#each IssueTypeArray as t}
					<option value={t}>{t}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="complexity" class="font-bold block">Complexity</label>
			<select name="complexity" bind:value={issue.Complexity}>
				<option value="">- select -</option>
				{#each ComplexityArray as c}
					<option value={c}>{c}</option>
				{/each}
			</select>
		</div>
	</div>
	<div>
		<label for="assigned-to-id" class="font-bold block">Assigned</label>
		<select name="assigned-to-id" bind:value={issue.AssignedToId} class="w-full">
			<option value="">- select -</option>
			{#each users as u}
				<option value={u.Id}
					>{u.Credentials ? u.Credentials.Username : ''} | {getFullName(u)}</option
				>
			{/each}
		</select>
	</div>
</div>
