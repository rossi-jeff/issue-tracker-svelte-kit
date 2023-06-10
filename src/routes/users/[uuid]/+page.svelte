<script lang="ts">
	import { getFullName } from '../../../lib/get-full-name';
	import type { UserType } from '../../../types/user.type';
	import UserForm from '../user-form.svelte';

	export let data;
	let user: UserType = data.user;

	let editing = false;
</script>

<button on:click={() => (editing = !editing)}>Edit</button>

{#if editing}
	<div class="card">
		<h1>Edit User</h1>
		<UserForm {user} showPass={false} />
		<button>Update User</button>
	</div>
{:else}
	<div class="card flex flex-wrap">
		<div class="mr-6">
			<strong>User Name</strong>
			{user.Credentials ? user.Credentials.Username : 'N/A'}
		</div>
		<div>
			<strong>Name</strong>
			{getFullName(user)}
		</div>
	</div>
{/if}
