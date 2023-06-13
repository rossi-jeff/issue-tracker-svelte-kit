<script lang="ts">
	import { get } from 'svelte/store';
	import { apiUrl } from '../lib/api-url';
	import {
		UserSessionKey,
		userSession,
		type UserSessionType,
		blankUserSession
	} from '../lib/user-session.writable';
	import type { CredentialsType } from '../types/credentials.type';
	import { browser } from '$app/environment';
	import FaUser from 'svelte-icons/fa/FaUser.svelte';
	import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte';
	import FaSignInAlt from 'svelte-icons/fa/FaSignInAlt.svelte';
	import FaBan from 'svelte-icons/fa/FaBan.svelte';

	let credentials: CredentialsType = {};
	let session: UserSessionType = get(userSession);

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

	const signIn = async () => {
		const { Username, Password } = credentials;
		if (!Username || !Password) return;
		const result = await fetch(`${apiUrl}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ Username, Password }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (result.ok) {
			const { Name, SessionId, Token, UUID, UserName } = await result.json();
			const newSession: UserSessionType = {
				Name,
				SessionId,
				Token,
				UUID,
				UserName,
				signedIn: true
			};
			if (browser) localStorage.setItem(UserSessionKey, JSON.stringify(newSession));
			userSession.set(newSession);
			session = get(userSession);
			hideSignIn();
		} else console.log(result);
	};

	const signOut = () => {
		userSession.set(blankUserSession);
		localStorage.removeItem(UserSessionKey);
		session = get(userSession);
	};
</script>

<div class="flex flex-wrap justify-end">
	{#if session.signedIn}
		<a href="/users/{session.UUID}" class="mt-2">
			<span class="icon-sm inline-block">
				<FaUser />
			</span>
			{session.UserName}
		</a>
		<button on:click={signOut} class="ml-4">
			Sign Out
			<span class="icon-sm inline-block">
				<FaSignOutAlt />
			</span>
		</button>
	{:else}
		<button class="ml-4" on:click={showSignIn}>
			<span class="icon-sm inline-block">
				<FaSignInAlt />
			</span>
			Sign In
		</button>
	{/if}
</div>

<div class="modal-overlay" id="authorization-overlay">
	<!-- sign in dialog -->
	<div class="modal-40" id="sign-in-dialog">
		<h2>Sign In</h2>
		<div class="my-2">
			<div class="mb-2">
				<label for="user-name" class="font-bold block">User Name</label>
				<input type="text" name="user-name" bind:value={credentials.Username} class="w-full" />
			</div>
			<div class="mb-2">
				<label for="pass-word" class="font-bold block">Password</label>
				<input type="password" name="pass-word" bind:value={credentials.Password} class="w-full" />
			</div>
			<div class="mt-2 text-black bg-yellow-200 border border-black rounded py-1 px-2">
				Randomly generated users share the password <span class="my-1 px-2 py-1 bg-white rounded"
					>S3cr3t!!</span
				>
			</div>
		</div>
		<div class="flex flex-wrap justify-between">
			<div>
				<button on:click={hideSignIn}>
					<span class="icon-sm inline-block">
						<FaBan />
					</span>
					Cancel
				</button>
			</div>
			<div>
				<button on:click={signIn}>
					Sign In
					<span class="icon-sm inline-block">
						<FaSignInAlt />
					</span>
				</button>
			</div>
		</div>
	</div>
</div>
