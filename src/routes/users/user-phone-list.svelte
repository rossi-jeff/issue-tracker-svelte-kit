<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { maskedString } from '../../lib/masked-string';
	import type { PhoneType } from '../../types/phone.type';

	export let phones: PhoneType[];
	export let showLinks: boolean;

	const dispatch = createEventDispatcher();

	const editPhone = (UUID: string) => {
		dispatch('editPhone', { UUID });
	};
</script>

<div id="user-phone-list" class="mb-2">
	{#if phones.length > 0}
		<div class="list-header">
			{#if showLinks}
				<div class="w-12">&nbsp;</div>
			{/if}

			<div class="w-32">Number</div>
			<div class="w-16 text-center">Type</div>
			<div class="w-16 text-center">Usage</div>
			<div class="w-16 text-center">Public</div>

			{#if showLinks}
				<div class="w-12">&nbsp;</div>
			{/if}
		</div>
	{/if}
	{#each phones as phone}
		<div class="flex flex-wrap justify-between">
			{#if showLinks}
				<div class="w-12">
					<button on:click={() => editPhone(phone.UUID || '')}>Edit</button>
				</div>
			{/if}

			<div class="w-32">{phone.Public ? phone.Number : maskedString(phone.Number || '', 0, 4)}</div>
			<div class="w-16 text-center">{phone.Type}</div>
			<div class="w-16 text-center">{phone.Usage}</div>
			<div class="w-16 text-center">{phone.Public}</div>

			{#if showLinks}
				<div class="w-12">
					<button>Delete</button>
				</div>
			{/if}
		</div>
	{/each}
</div>
