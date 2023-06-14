<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { PaletteNames } from '../lib/palettes';
	import FaList from 'svelte-icons/fa/FaList.svelte';

	export let palette: string;
	let dark = false;
	let localPalette: string;

	const dispatch = createEventDispatcher();

	const toggleDark = () => {
		const main = document.getElementById('main');
		if (!main) return;
		if (dark) {
			main.classList.add('dark');
		} else {
			main.classList.remove('dark');
		}
	};

	const changePalette = () => {
		dispatch('changePalette', localPalette);
	};

	onMount(() => {
		localPalette = palette;
	});
</script>

<div id="footer-bar">
	<div class="flex flex-wrap mx-4 my-2">
		<div>
			<div class="flex flex-wrap">
				<h2>Issue</h2>
				<div class="icon mx-2 mt-1">
					<FaList />
				</div>
				<h2>Tracker</h2>
			</div>
		</div>
		<div class="flex-grow text-center">
			Constructed by <strong>Jeff Rossi</strong> &lt;<a href="mailto:inquiries@jeff-rossi.com"
				>inquiries@jeff-rossi.com</a
			>&gt;
		</div>
		<div class="mx-4">
			<label for="palette" class="font-bold mr-2">Palette</label>
			<select name="palette" id="palatte" bind:value={localPalette} on:change={changePalette}>
				{#each PaletteNames as name}
					<option value={name}>{name}</option>
				{/each}
			</select>
		</div>
		<div>
			<input type="checkbox" name="dark" bind:checked={dark} on:change={toggleDark} />
			<label for="dark" class="font-bold">Dark</label>
		</div>
	</div>
</div>
