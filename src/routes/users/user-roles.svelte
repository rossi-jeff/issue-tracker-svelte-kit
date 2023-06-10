<script lang="ts">
	import { UserRoleArray } from '../../types/array.types';
	import type { RoleType } from '../../types/user.type';
	export let roles: RoleType[];
</script>

<div class="my-2">
	<h3>Roles</h3>
	<div class="flex flex-wrap justify-between">
		{#each UserRoleArray as r}
			<div>
				<input type="checkbox" name="user-role" id="user-role-{r}" bind:group={roles} value={r} />
				<label for="user-role-{r}">{r}</label>
			</div>
		{/each}
	</div>
</div>
