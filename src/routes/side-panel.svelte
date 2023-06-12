<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FaList from 'svelte-icons/fa/FaList.svelte';
	import FaTimesCircle from 'svelte-icons/fa/FaTimesCircle.svelte';

	const dispatch = createEventDispatcher();

	const toggleMenu = () => dispatch('toggleMenu');
</script>

<div id="side-panel">
	<div class="flex flex-wrap justify-between">
		<div class="flex flex-wrap">
			<h1>Issue</h1>
			<div class="icon mx-2 mt-2">
				<FaList />
			</div>
			<h1>Tracker</h1>
		</div>
		<button class="icon mt-2" on:click={toggleMenu}>
			<FaTimesCircle />
		</button>
	</div>

	<div class="flex flex-col" id="side-bar-links">
		<a href="/" on:click={toggleMenu}>Home</a>
		<a href="/dashboard" on:click={toggleMenu}>Dashboard</a>
		<a href="/projects" on:click={toggleMenu}>Projects</a>
		<a href="/issues" on:click={toggleMenu}>Issues</a>
		<a href="/users" on:click={toggleMenu}>Users</a>
		<a href="/time_clocks" on:click={toggleMenu}>Time Clocks</a>
	</div>
</div>
