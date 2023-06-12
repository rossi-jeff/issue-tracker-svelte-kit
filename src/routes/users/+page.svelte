<script lang="ts">
	import { onMount } from 'svelte';
	import type { UserType } from '../../types/user.type';
	import UserCard from './user-card.svelte';
	import PaginationControls from '../../components/pagination-controls.svelte';
	import { userSession, type UserSessionType } from '$lib/user-session.writable';
	import { get } from 'svelte/store';
	import FaUserFriends from 'svelte-icons/fa/FaUserFriends.svelte';
	import FaPlusCircle from 'svelte-icons/fa/FaPlusCircle.svelte';

	export let data;

	let session: UserSessionType = get(userSession);

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
	<div class="icon mr-2 mt-1">
		<FaUserFriends />
	</div>
	<h1>Users</h1>
	{#if session.signedIn}
		<a href="/users/new" class="ml-4">
			New User
			<span class="icon-sm inline-block">
				<FaPlusCircle />
			</span>
		</a>
	{/if}
</div>

{#each paginated as user}
	<UserCard {user} />
{:else}
	<div>No Users</div>
{/each}

{#if showPagination}
	<PaginationControls {count} {offset} {limit} on:setPage={setPage} on:setPerPage={setPerPage} />
{/if}
