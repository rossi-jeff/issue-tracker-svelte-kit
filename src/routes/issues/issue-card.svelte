<script lang="ts">
	import type { IssueType } from '../../types/issue.type';

	export let issue: IssueType;
</script>

<div class="card" id="issue-{issue.UUID}">
	<h2>{issue.Title}</h2>
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
</div>
