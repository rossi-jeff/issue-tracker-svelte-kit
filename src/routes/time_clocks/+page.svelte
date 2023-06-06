<script>
	import TimeClockCard from './time-clock-card.svelte';

	export let data;
</script>

<h1>Time Clocks</h1>

{#each data.timeclocks as timeClock}
	<TimeClockCard {timeClock} />
{:else}
	<div>No Time Clocks</div>
{/each}
