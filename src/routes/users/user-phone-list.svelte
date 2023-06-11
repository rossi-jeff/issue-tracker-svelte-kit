<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { maskedString } from '../../lib/masked-string';
	import type { PhoneType } from '../../types/phone.type';

	export let phones: PhoneType[];

	const dispatch = createEventDispatcher();

	const editPhone = (UUID: string) => {
		dispatch('editPhone', { UUID });
	};
</script>

<div id="user-phone-list">
	{#each phones as phone}
		<div class="flex flex-wrap justify-between">
			<div>
				<button on:click={() => editPhone(phone.UUID || '')}>Edit</button>
			</div>
			<div>{phone.Public ? phone.Number : maskedString(phone.Number || '', 0, 4)}</div>
			<div>{phone.Type}</div>
			<div>{phone.Usage}</div>
			<div>{phone.Public}</div>
			<div>
				<button>Delete</button>
			</div>
		</div>
	{/each}
</div>
