<script lang="ts">
	import { getFullName } from '$lib/get-full-name';
	import { getTimeClockHours } from '$lib/get-time-clock-hours';
	import { get } from 'svelte/store';
	import { userSession, type UserSessionType } from '../../lib/user-session.writable';
	import type { TimeClockType } from '../../types/time-clock.type';
	import { createEventDispatcher } from 'svelte';

	export let timeClock: TimeClockType;

	let session: UserSessionType = get(userSession);

	const dispatch = createEventDispatcher();

	const editTimeClock = () => {
		const { UUID } = timeClock;
		dispatch('editTimeClock', { UUID });
	};
</script>

<div class="card" id="time-clock-{timeClock.UUID}">
	<div class="flex flex-wrap">
		{#if session.signedIn}
			<div class="mr-4">
				<button on:click={editTimeClock}>Edit</button>
			</div>
		{/if}
		<div class="flex-grow">
			<!-- 3 col 2 row-->
			<div class="flex flex-wrap justify-between">
				<div>
					<strong class="mr-4">User</strong>
					{#if timeClock.User}
						{getFullName(timeClock.User)}
					{/if}
				</div>
				<div>
					<strong class="mr-4">Project</strong>
					{#if timeClock.Project}
						{timeClock.Project.Name}
					{/if}
				</div>
				<div>
					<strong class="mr-4">Issue</strong>
					{#if timeClock.Issue}
						{timeClock.Issue.SequenceNumber}
					{/if}
				</div>
			</div>
			<div class="flex flex-wrap justify-between">
				<div>
					{#if timeClock.Start}
						<strong class="mr-4">From</strong>
						{timeClock.Start.Date}
						<strong class="mx-4">@</strong>
						{timeClock.Start.Time}
					{/if}
				</div>
				<div>
					{#if timeClock.End}
						<strong class="mr-4">To</strong>
						{timeClock.End.Date}
						<strong class="mx-4">@</strong>
						{timeClock.End.Time}
					{/if}
				</div>
				<div>
					<strong class="mr-4">Hours</strong>
					{getTimeClockHours(timeClock)}
				</div>
			</div>
		</div>
	</div>
</div>
