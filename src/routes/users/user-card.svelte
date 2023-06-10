<script lang="ts">
	import { getFullName } from '../../lib/get-full-name';
	import type { UserType } from '../../types/user.type';

	export let user: UserType;
</script>

<div class="card" id="user-{user.UUID}">
	<a href="/users/{user.UUID}" class="mr-4">Details</a>
	{#if user.Credentials}
		<h2>{user.Credentials.Username}</h2>
	{/if}
	<div>{getFullName(user)}</div>
</div>
