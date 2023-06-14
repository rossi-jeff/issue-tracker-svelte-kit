<script lang="ts">
	import '../app.css';
	import { PaletteNames } from '../lib/palettes';
	import FooterBar from './footer-bar.svelte';
	import HeaderBar from './header-bar.svelte';
	import SidePanel from './side-panel.svelte';

	let palette: string = PaletteNames[0];

	const changePalette = (ev: any) => {
		palette = ev.detail;
	};

	const togglePanel = () => {
		const panel = document.getElementById('side-panel');
		if (panel) panel.classList.toggle('open');
	};
</script>

<main id="main" data-theme={palette}>
	<SidePanel on:toggleMenu={togglePanel} />
	<div class="flex flex-col h-screen">
		<HeaderBar on:toggleMenu={togglePanel} />

		<div class="p-4 flex-grow overflow-y-auto">
			<slot />
		</div>

		<FooterBar {palette} on:changePalette={changePalette} />
	</div>
</main>
