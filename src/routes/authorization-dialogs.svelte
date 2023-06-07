<script lang="ts">
	import type { CredentialsType } from '../types/credentials.type';

	const showOverlay = () => {
		const overlay = document.getElementById('authorization-overlay');
		if (overlay) overlay.classList.add('open');
	};

	const hideOverlay = () => {
		const overlay = document.getElementById('authorization-overlay');
		if (overlay) overlay.classList.remove('open');
	};

	const showSignIn = () => {
		showOverlay();
		const dialog = document.getElementById('sign-in-dialog');
		if (dialog) dialog.classList.add('open');
	};

	const hideSignIn = () => {
		const dialog = document.getElementById('sign-in-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	let credentials: CredentialsType = {};
</script>

<div class="flex flex-wrap justify-end mx-4 my-2">
	<button class="ml-4" on:click={showSignIn}>Sign In</button>
</div>

<div class="modal-overlay" id="authorization-overlay">
	<!-- sign in dialog -->
	<div class="modal-40" id="sign-in-dialog">
		<h2>Sign In</h2>
		<div class="my-2">
			<div class="mb-2">
				<label for="user-name" class="font-bold block">User Name</label>
				<input type="text" name="user-name" bind:value={credentials.Username} />
			</div>
			<div class="mb-2">
				<label for="pass-word" class="font-bold block">Password</label>
				<input type="password" name="pass-word" bind:value={credentials.Password} />
			</div>
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideSignIn}>Cancel</button>
			<button>Sign In</button>
		</div>
	</div>
</div>
