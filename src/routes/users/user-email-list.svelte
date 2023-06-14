<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { maskedString } from '../../lib/masked-string';
	import type { EmailType } from '../../types/email.type';

	export let emails: EmailType[];
	export let showLinks: boolean;

	const dispatch = createEventDispatcher();

	const editEmail = (UUID: string) => {
		dispatch('editEmail', { UUID });
	};
</script>

<div id="user-email-list" class="mb-2">
	{#if emails.length > 0}
		<div class="list-header">
			{#if showLinks}
				<div class="w-12">&nbsp;</div>
			{/if}

			<div class="w-48">Address</div>
			<div class="w-16 text-center">Usage</div>
			<div class="w-16 text-center">Public</div>

			{#if showLinks}
				<div class="w-12">&nbsp;</div>
			{/if}
		</div>
	{/if}
	{#each emails as email}
		<div class="flex flex-wrap justify-between">
			{#if showLinks}
				<div class="w-12">
					<button on:click={() => editEmail(email.UUID || '')}>Edit</button>
				</div>
			{/if}

			<div class="w-48">{email.Public ? email.Address : maskedString(email.Address || '', 4)}</div>
			<div class="w-16 text-center">{email.Usage}</div>
			<div class="w-16 text-center">{email.Public}</div>

			{#if showLinks}
				<div class="w-12">
					<button>Delete</button>
				</div>
			{/if}
		</div>
	{/each}
</div>
