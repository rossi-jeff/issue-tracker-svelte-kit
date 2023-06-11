<script lang="ts">
	import type { UserType } from '../../types/user.type';

	export let user: UserType;
	export let showPass: boolean;
</script>

<div class="my-2" id="user-form">
	<h3>Credentials</h3>
	<div class="flex flex-wrap justify-between mb-4">
		{#if user.Credentials}
			<div>
				<label for="user-name" class="font-bold block">User Name</label>
				<input type="text" name="user-name" bind:value={user.Credentials.Username} />
			</div>
			{#if showPass}
				<div>
					<label for="pass-word" class="font-bold block">Password</label>
					<input type="password" name="pass-word" bind:value={user.Credentials.Password} />
				</div>
			{/if}
		{/if}
	</div>
	<h3>Name</h3>
	<div class="flex flex-wrap justify-between mb-4">
		{#if user.Name}
			<div>
				<label for="first-name" class="font-bold block">First</label>
				<input type="text" name="first-name" bind:value={user.Name.First} />
			</div>
			<div>
				<label for="middle-name" class="font-bold block">Middle</label>
				<input type="text" name="middle-name" bind:value={user.Name.Middle} />
			</div>
			<div>
				<label for="last-name" class="font-bold block">Last</label>
				<input type="text" name="lasr-name" bind:value={user.Name.Last} />
			</div>
		{/if}
	</div>
</div>
