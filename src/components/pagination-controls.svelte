<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let count: number;
	export let limit: number;
	export let offset: number;

	const perPageOpts = [5, 10, 25];

	let pages: number[] = [];
	let current = {
		perPage: 10,
		page: 1,
		first: 0,
		last: 0
	};

	const buildPages = () => {
		let page = 1;
		let counter = 0;
		pages = [];
		while (counter < count) {
			pages.push(page);
			page++;
			counter += limit;
		}
	};

	const setCurrent = () => {
		const page = Math.floor(offset / limit) + 1;
		current.perPage = limit;
		current.page = page;
		current.first = (page - 1) * limit + 1;
		current.last = Math.min((page - 1) * limit + limit, count);
	};

	const dispatch = createEventDispatcher();

	const firstPage = () => {
		dispatch('setPage', 1);
	};

	const previousPage = () => {
		const { page } = current;
		if (page <= 1) return;
		dispatch('setPage', page - 1);
	};

	const nextPage = () => {
		const { page } = current;
		const last = pages.length ? pages[pages.length - 1] : 1;
		if (page + 1 > last) return;
		dispatch('setPage', page + 1);
	};

	const lastPage = () => {
		const last = pages.length ? pages[pages.length - 1] : 1;
		dispatch('setPage', last);
	};

	const perPageChanged = () => {
		const { perPage } = current;
		dispatch('setPerPage', perPage);
	};

	const pageChanged = () => {
		const { page } = current;
		dispatch('setPage', page);
	};

	onMount(() => {
		buildPages();
		setCurrent();
	});
</script>

<div class="card">
	<div class="flex flex-wrap justify-between">
		<div>
			<button on:click={firstPage}> |&lt; </button>
			<button on:click={previousPage}> &lt; </button>
		</div>
		<div>
			<label for="per-page">Per Page</label>
			<select name="per-page" bind:value={current.perPage} on:change={perPageChanged}>
				{#each perPageOpts as p}
					<option value={p}>{p}</option>
				{/each}
			</select>
		</div>
		<div>
			{current.first} to {current.last} of {count}
		</div>
		<div>
			<label for="page">Page</label>
			<select name="page" bind:value={current.page} on:change={pageChanged}>
				{#each pages as p}
					<option value={p}>{p}</option>
				{/each}
			</select>
		</div>
		<div>
			<button on:click={nextPage}> &gt; </button>
			<button on:click={lastPage}> &gt;| </button>
		</div>
	</div>
</div>
