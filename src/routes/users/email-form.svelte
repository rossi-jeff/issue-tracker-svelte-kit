<script lang="ts">
	import { UsageArray } from '../../types/array.types';
	import type { EmailType } from '../../types/email.type';

	export let email: EmailType;
</script>

<div id="email-form" class="my-2">
	<div class="mb-2">
		<label for="address" class="font-bold block">Address</label>
		<input type="email" name="address" bind:value={email.Address} />
	</div>
	<div class="mb-2">
		<label for="usage" class="font-bold mr-2">Usage</label>
		<select name="usage" bind:value={email.Usage}>
			{#each UsageArray as u}
				<option value={u}>{u}</option>
			{/each}
		</select>
	</div>
	<div>
		<input type="checkbox" name="public" bind:checked={email.Public} />
		<label for="public" class="font-bold ml-2">Public</label>
	</div>
</div>
