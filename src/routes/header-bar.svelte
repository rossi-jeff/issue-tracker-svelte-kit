<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AuthorizationDialogs from './authorization-dialogs.svelte';
	import FaBars from 'svelte-icons/fa/FaBars.svelte';
	import FaList from 'svelte-icons/fa/FaList.svelte';
	import FaHome from 'svelte-icons/fa/FaHome.svelte';
	import FaTools from 'svelte-icons/fa/FaTools.svelte';
	import IoMdGrid from 'svelte-icons/io/IoMdGrid.svelte';
	import FaUserFriends from 'svelte-icons/fa/FaUserFriends.svelte';
	import FaRegClock from 'svelte-icons/fa/FaRegClock.svelte';

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
		<a href="/">
			<span class="inline-block icon-sm mt-2">
				<FaHome />
			</span>
			Home
		</a>
		<a href="/dashboard">
			<span class="inline-block icon-sm mt-2">
				<IoMdGrid />
			</span>
			Dashboard
		</a>
		<a href="/projects">
			<span class="inline-block icon-sm mt-2">
				<FaTools />
			</span>
			Projects
		</a>
		<a href="/issues">
			<span class="inline-block icon-sm mt-2">
				<FaList />
			</span>
			Issues
		</a>
		<a href="/users">
			<span class="inline-block icon-sm mt-2">
				<FaUserFriends />
			</span>
			Users
		</a>
		<a href="/time_clocks">
			<span class="inline-block icon-sm mt-2">
				<FaRegClock />
			</span>
			Time Clocks
		</a>
	</div>
</div>
