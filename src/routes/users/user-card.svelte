<script lang="ts">
	import { userSession, type UserSessionType } from '$lib/user-session.writable';
	import { get } from 'svelte/store';
	import { getFullName } from '../../lib/get-full-name';
	import type { UserType } from '../../types/user.type';

	export let user: UserType;

	let session: UserSessionType = get(userSession);
</script>

<div class="card" id="user-{user.UUID}">
	{#if session.signedIn}
		<a href="/users/{user.UUID}" class="mr-4">Details</a>
	{/if}
	{#if user.Credentials}
		<h2>{user.Credentials.Username}</h2>
	{/if}
	<div>{getFullName(user)}</div>
</div>
