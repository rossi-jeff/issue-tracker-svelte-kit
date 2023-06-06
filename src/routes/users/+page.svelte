<script>
	import UserCard from './user-card.svelte';

	export let data;
</script>

<h1>Users</h1>

{#each data.users as user}
	<UserCard {user} />
{:else}
	<div>No Users</div>
{/each}
