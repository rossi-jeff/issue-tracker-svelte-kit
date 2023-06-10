<script lang="ts">
	import { getFullName } from '../../../lib/get-full-name';
	import type { UserType } from '../../../types/user.type';
	import UserEmailList from '../user-email-list.svelte';
	import UserForm from '../user-form.svelte';
	import UserPhoneList from '../user-phone-list.svelte';
	import UserRoles from '../user-roles.svelte';

	export let data;
	let user: UserType = data.user;

	let editing = false;
</script>

<button on:click={() => (editing = !editing)}>Edit</button>

{#if editing}
	<div class="card">
		<h1>Edit User</h1>
		<UserForm {user} showPass={false} />
		<UserRoles roles={user.Roles || []} />
		<!--phones-->
		<div class="flex flex-wrap">
			<h3>Phones</h3>
			<button class="ml-4">New Phone</button>
		</div>
		<UserPhoneList phones={user.Phones || []} />
		<!--emails-->
		<div class="flex flex-wrap">
			<h3>Emails</h3>
			<button class="ml-4">New Email</button>
		</div>
		<UserEmailList emails={user.Emails || []} />
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
