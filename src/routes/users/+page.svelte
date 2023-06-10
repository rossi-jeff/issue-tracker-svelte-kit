<script lang="ts">
	import { onMount } from 'svelte';
	import type { UserType } from '../../types/user.type';
	import UserCard from './user-card.svelte';
	import PaginationControls from '../../components/pagination-controls.svelte';

	export let data;

	let paginated: UserType[] = [];
	let limit = 10;
	let offset = 0;
	let count = 0;
	let showPagination = false;

	const setPaginated = () => {
		paginated = data.users.slice(offset, offset + limit);
		showPagination = true;
	};

	const setPage = (ev: any) => {
		offset = (ev.detail - 1) * limit;
		showPagination = false;
		setTimeout(() => {
			setPaginated();
		}, 25);
	};

	const setPerPage = (ev: any) => {
		limit = ev.detail;
		offset = 0;
		showPagination = false;
		setTimeout(() => {
			setPaginated();
		}, 25);
	};

	onMount(() => {
		count = data.users.length;
		setTimeout(() => {
			setPaginated();
		}, 25);
	});
</script>

<div class="flex flex-wrap">
	<h1>Users</h1>
	<a href="/users/new" class="ml-4">New User</a>
</div>

{#each paginated as user}
	<UserCard {user} />
{:else}
	<div>No Users</div>
{/each}

{#if showPagination}
	<PaginationControls {count} {offset} {limit} on:setPage={setPage} on:setPerPage={setPerPage} />
{/if}
