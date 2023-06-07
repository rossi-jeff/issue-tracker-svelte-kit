<script lang="ts">
	import { getFullName } from '../../lib/get-full-name';
	import type { IssueType } from '../../types/issue.type';

	export let issue: IssueType;
</script>

<div class="card" id="issue-{issue.UUID}">
	<h2>{issue.SequenceNumber}</h2>
	<div class="font-bold mb-2">{issue.Title}</div>
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
