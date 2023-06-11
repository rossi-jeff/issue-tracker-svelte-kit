<script lang="ts">
	import '../app.css';
	import { PaletteNames } from '../lib/palettes';
	import AuthorizationDialogs from './authorization-dialogs.svelte';

	let palette: string = PaletteNames[0];
	let dark = false;

	const toggleDark = () => {
		const main = document.getElementById('main');
		if (!main) return;
		if (dark) {
			main.classList.add('dark');
		} else {
			main.classList.remove('dark');
		}
	};
</script>

<main id="main" data-theme={palette}>
	<AuthorizationDialogs />

	<div class="flex flex-wrap justify-between mx-4 mb-4">
		<a href="/">Home</a>
		<a href="/dashboard">Dashboard</a>
		<a href="/projects">Projects</a>
		<a href="/issues">Issues</a>
		<a href="/users">Users</a>
		<a href="/time_clocks">Time Clocks</a>
	</div>

	<div class="p-4">
		<slot />
	</div>

	<div class="flex flex-wrap">
		<div class="mr-4">
			<label for="palette" class="font-bold mr-2">Palette</label>
			<select name="palette" id="palatte" bind:value={palette}>
				{#each PaletteNames as name}
					<option value={name}>{name}</option>
				{/each}
			</select>
		</div>
		<div>
			<input type="checkbox" name="dark" bind:checked={dark} on:change={toggleDark} />
			<label for="dark" class="font-bold ml-2">Dark</label>
		</div>
	</div>
</main>
