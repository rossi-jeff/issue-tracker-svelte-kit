<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AuthorizationDialogs from './authorization-dialogs.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';
	import FaList from 'svelte-icons/fa/FaList.svelte';

	const dispatch = createEventDispatcher();

	const toggleMenu = () => dispatch('toggleMenu');
</script>

<div id="header-bar">
	<div class="flex flex-wrap justify-between mx-4 my-2">
		<div>
			<div class="flex flex-wrap">
				<button class="md:hidden icon mr-2 mt-2" title="Toggle Menu" on:click={toggleMenu}>
					<FaBars />
				</button>
				<h1>Issue</h1>
				<div class="icon mx-2 mt-2">
					<FaList />
				</div>
				<h1>Tracker</h1>
			</div>
		</div>
		<AuthorizationDialogs />
	</div>

	<div class="md:flex md:flex-wrap md:justify-between md:mx-4 md:mb-4 hidden">
		<a href="/">Home</a>
		<a href="/dashboard">Dashboard</a>
		<a href="/projects">Projects</a>
		<a href="/issues">Issues</a>
		<a href="/users">Users</a>
		<a href="/time_clocks">Time Clocks</a>
	</div>
</div>
