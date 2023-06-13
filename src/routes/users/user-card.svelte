<script lang="ts">
	import { userSession, type UserSessionType } from '$lib/user-session.writable';
	import { get } from 'svelte/store';
	import { getFullName } from '../../lib/get-full-name';
	import type { UserType } from '../../types/user.type';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';

	export let user: UserType;

	let session: UserSessionType = get(userSession);
</script>

<div class="card" id="user-{user.UUID}">
	<div class="flex flex-wrap">
		{#if session.signedIn}
			<a href="/users/{user.UUID}" class="mr-2">
				<span class="icon inline-block">
					<FaEdit />
				</span>
			</a>
		{/if}
		{#if user.Credentials}
			<h2>{user.Credentials.Username}</h2>
		{/if}
	</div>
	<div>{getFullName(user)}</div>
</div>
