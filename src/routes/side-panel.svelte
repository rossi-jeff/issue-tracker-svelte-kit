<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import FaHome from 'svelte-icons/fa/FaHome.svelte';
	import FaList from 'svelte-icons/fa/FaList.svelte';
	import FaRegClock from 'svelte-icons/fa/FaRegClock.svelte';
	import FaTimesCircle from 'svelte-icons/fa/FaTimesCircle.svelte';
	import FaTools from 'svelte-icons/fa/FaTools.svelte';
	import FaUserFriends from 'svelte-icons/fa/FaUserFriends.svelte';
	import IoMdGrid from 'svelte-icons/io/IoMdGrid.svelte';

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
		<a href="/" on:click={toggleMenu}>
			<span class="inline-block icon-sm mt-2 mr-2">
				<FaHome />
			</span>
			Home
		</a>
		<a href="/dashboard" on:click={toggleMenu}>
			<span class="inline-block icon-sm mt-2 mr-2">
				<IoMdGrid />
			</span>
			Dashboard
		</a>
		<a href="/projects" on:click={toggleMenu}>
			<span class="inline-block icon-sm mt-2 mr-2">
				<FaTools />
			</span>
			Projects
		</a>
		<a href="/issues" on:click={toggleMenu}>
			<span class="inline-block icon-sm mt-2 mr-2">
				<FaList />
			</span>
			Issues
		</a>
		<a href="/users" on:click={toggleMenu}>
			<span class="inline-block icon-sm mt-2 mr-2">
				<FaUserFriends />
			</span>
			Users
		</a>
		<a href="/time_clocks" on:click={toggleMenu}>
			<span class="inline-block icon-sm mt-2 mr-2">
				<FaRegClock />
			</span>
			Time Clocks
		</a>
	</div>
</div>
