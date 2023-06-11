<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { maskedString } from '../../lib/masked-string';
	import type { EmailType } from '../../types/email.type';

	export let emails: EmailType[];

	const dispatch = createEventDispatcher();

	const editEmail = (UUID: string) => {
		dispatch('editEmail', { UUID });
	};
</script>

<div id="user-email-list">
	{#each emails as email}
		<div class="flex flex-wrap justify-between">
			<div>
				<button on:click={() => editEmail(email.UUID || '')}>Edit</button>
			</div>
			<div>{email.Public ? email.Address : maskedString(email.Address || '', 4)}</div>
			<div>{email.Usage}</div>
			<div>{email.Public}</div>
			<div>
				<button>Delete</button>
			</div>
		</div>
	{/each}
</div>
