<script lang="ts">
	import { PhoneTypeArray, UsageArray } from '../../types/array.types';
	import type { PhoneType } from '../../types/phone.type';

	export let phone: PhoneType;
</script>

<div id="phone-form" class="my-2">
	<div class="mb-2">
		<label for="number" class="font-bold block">Number</label>
		<input type="tel" name="number" bind:value={phone.Number} />
	</div>
	<div class="mb-2">
		<label for="usage" class="font-bold mr-2">Usage</label>
		<select name="usage" bind:value={phone.Usage}>
			{#each UsageArray as u}
				<option value={u}>{u}</option>
			{/each}
		</select>
	</div>
	<div class="mb-2">
		<label for="type" class="font-bold mr-2">Type</label>
		<select name="type" bind:value={phone.Type}>
			{#each PhoneTypeArray as t}
				<option value={t}>{t}</option>
			{/each}
		</select>
	</div>
	<div>
		<input type="checkbox" name="public" bind:checked={phone.Public} />
		<label for="public" class="font-bold ml-2">Public</label>
	</div>
</div>
