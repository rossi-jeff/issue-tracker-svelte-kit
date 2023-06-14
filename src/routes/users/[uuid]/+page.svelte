<script lang="ts">
	import { clone } from '$lib/clone';
	import { userSession, type UserSessionType } from '$lib/user-session.writable';
	import { get } from 'svelte/store';
	import { getFullName } from '../../../lib/get-full-name';
	import { blankEmail, type EmailType } from '../../../types/email.type';
	import { blankPhone, type PhoneType } from '../../../types/phone.type';
	import type { UserType } from '../../../types/user.type';
	import EmailForm from '../email-form.svelte';
	import PhoneForm from '../phone-form.svelte';
	import UserEmailList from '../user-email-list.svelte';
	import UserForm from '../user-form.svelte';
	import UserPhoneList from '../user-phone-list.svelte';
	import UserRoles from '../user-roles.svelte';
	import { apiUrl } from '$lib/api-url';
	import { buildHeaders } from '$lib/build-headers';
	import FaBan from 'svelte-icons/fa/FaBan.svelte';
	import FaSave from 'svelte-icons/fa/FaSave.svelte';
	import FaEdit from 'svelte-icons/fa/FaEdit.svelte';
	import SignInAlert from '../../../components/sign-in-alert.svelte';

	export let data;
	let user: UserType = data.user;
	let uuid: string = data.uuid;

	let editing = false;

	type EditorType = {
		newPhone: PhoneType;
		editPhone: PhoneType;
		newEmail: EmailType;
		editEmail: EmailType;
	};
	const editor: EditorType = {
		newPhone: clone(blankPhone),
		editPhone: {},
		newEmail: clone(blankEmail),
		editEmail: {}
	};

	let session: UserSessionType = get(userSession);

	const showOverlay = () => {
		const overlay = document.getElementById('edit-user-overlay');
		if (overlay) overlay.classList.add('open');
	};

	const hideOverlay = () => {
		const overlay = document.getElementById('edit-user-overlay');
		if (overlay) overlay.classList.remove('open');
	};

	const showNewPhone = () => {
		showOverlay();
		const dialog = document.getElementById('new-phone-dialog');
		if (dialog) dialog.classList.add('open');
	};

	const hideNewPhone = () => {
		const dialog = document.getElementById('new-phone-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	const showEditPhone = () => {
		showOverlay();
		const dialog = document.getElementById('edit-phone-dialog');
		if (dialog) dialog.classList.add('open');
	};

	const hideEditPhone = () => {
		const dialog = document.getElementById('edit-phone-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	const showNewEmail = () => {
		showOverlay();
		const dialog = document.getElementById('new-email-dialog');
		if (dialog) dialog.classList.add('open');
	};

	const hideNewEmail = () => {
		const dialog = document.getElementById('new-email-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	const showEditEmail = () => {
		showOverlay();
		const dialog = document.getElementById('edit-email-dialog');
		if (dialog) dialog.classList.add('open');
	};

	const hideEditEmail = () => {
		const dialog = document.getElementById('edit-email-dialog');
		if (dialog) dialog.classList.remove('open');
		hideOverlay();
	};

	const addPhone = async () => {
		if (!user.Phones) return;
		const payload = editor.newPhone;
		const result = await fetch(`${apiUrl}/user/${uuid}/phone`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			const phone = await result.json();
			user.Phones.push(phone);
			user = clone(user);
			editor.newPhone = clone(blankPhone);
			hideNewPhone();
		}
	};

	const addEmail = async () => {
		if (!user.Emails) return;
		const payload = editor.newEmail;
		const result = await fetch(`${apiUrl}/user/${uuid}/email`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			const email = await result.json();
			user.Emails.push(email);
			user = clone(user);
			editor.newEmail = clone(blankEmail);
			hideNewEmail();
		}
	};

	const editPhone = (ev: any) => {
		if (!user.Phones) return;
		const { UUID } = ev.detail;
		const phone = user.Phones.find((p) => p.UUID == UUID);
		if (phone) {
			editor.editPhone = phone;
			showEditPhone();
		}
	};

	const updatePhone = async () => {
		if (!user.Phones) return;
		const payload = editor.editPhone;
		const { UUID } = payload;
		const result = await fetch(`${apiUrl}/phone/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			const phone = await result.json();
			const idx = user.Phones.findIndex((p) => p.UUID == UUID);
			if (idx != -1) {
				user.Phones[idx] = phone;
				user = clone(user);
				hideEditPhone();
			}
		}
	};

	const editEmail = (ev: any) => {
		if (!user.Emails) return;
		const { UUID } = ev.detail;
		const email = user.Emails.find((e) => e.UUID == UUID);
		if (email) {
			editor.editEmail = email;
			showEditEmail();
		}
	};

	const updateEmail = async () => {
		if (!user.Emails) return;
		const payload = editor.editPhone;
		const { UUID } = payload;
		const result = await fetch(`${apiUrl}/email/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			const email = await result.json();
			const idx = user.Emails.findIndex((e) => e.UUID == UUID);
			if (idx != -1) {
				user.Emails[idx] = email;
				user = clone(user);
				hideEditEmail();
			}
		}
	};

	const updateUser = async () => {
		const payload = user;
		delete payload.Phones;
		delete payload.Emails;
		const { UUID } = payload;
		console.log({ payload });
		const result = await fetch(`${apiUrl}/user/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			user = await result.json();
		}
	};
</script>

<svelte:head>
	<title>Issue Tracker | User Details</title>
</svelte:head>

{#if session.signedIn}
	<button on:click={() => (editing = !editing)}>
		<span class="icon-sm inline-block">
			<FaEdit />
		</span>
		Edit
	</button>
{/if}

{#if editing}
	<div class="card">
		<h1>Edit User</h1>
		<UserForm {user} showPass={false} />
		<UserRoles {user} />
		<!--phones-->
		<div class="flex flex-wrap">
			<h3>Phones</h3>
			<button class="ml-4" on:click={showNewPhone}>New Phone</button>
		</div>
		<UserPhoneList phones={user.Phones || []} on:editPhone={editPhone} showLinks={true} />
		<!--emails-->
		<div class="flex flex-wrap">
			<h3>Emails</h3>
			<button class="ml-4" on:click={showNewEmail}>New Email</button>
		</div>
		<UserEmailList emails={user.Emails || []} on:editEmail={editEmail} showLinks={true} />
		<div class="text-right">
			<button on:click={updateUser}>
				Update User
				<span class="icon-sm inline-block">
					<FaSave />
				</span>
			</button>
		</div>
	</div>
{:else}
	<div class="card">
		<div class="mb-2">
			<strong class="inline-block w-24">User Name</strong>
			{user.Credentials ? user.Credentials.Username : 'N/A'}
		</div>
		<div class="mb-2">
			<strong class="inline-block w-24">Name</strong>
			{getFullName(user)}
		</div>
		<div class="mb-2">
			<strong class="inline-block w-24">Roles</strong>
			{user.Roles && user.Roles.length > 0 ? user.Roles.join(', ') : 'N/A'}
		</div>
		{#if user.Phones && user.Phones.length > 0}
			<h3>Phones</h3>
		{/if}
		<UserPhoneList phones={user.Phones || []} showLinks={false} />
		{#if user.Emails && user.Emails.length > 0}
			<h3>Emails</h3>
		{/if}
		<UserEmailList emails={user.Emails || []} showLinks={false} />
	</div>
{/if}

{#if !session.signedIn}
	<SignInAlert />
{/if}

<div class="modal-overlay" id="edit-user-overlay">
	<!--new phone dialog-->
	<div class="modal-sm" id="new-phone-dialog">
		<h2>New Phone</h2>
		<div class="dotted-box mb-2">
			<PhoneForm phone={editor.newPhone} />
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideNewPhone}>
				<span class="icon-sm inline-block">
					<FaBan />
				</span>
				Cancel
			</button>
			<button on:click={addPhone}>
				Add Phone
				<span class="icon-sm inline-block">
					<FaSave />
				</span>
			</button>
		</div>
	</div>
	<!--edit phone dialog-->
	<div class="modal-sm" id="edit-phone-dialog">
		<h2>Edit Phone</h2>
		<div class="dotted-box mb-2">
			<PhoneForm phone={editor.editPhone} />
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideEditPhone}>
				<span class="icon-sm inline-block">
					<FaBan />
				</span>
				Cancel
			</button>
			<button on:click={updatePhone}>
				Update Phone
				<span class="icon-sm inline-block">
					<FaSave />
				</span>
			</button>
		</div>
	</div>
	<!--new email dialog-->
	<div class="modal-sm" id="new-email-dialog">
		<h2>New Email</h2>
		<div class="dotted-box mb-2">
			<EmailForm email={editor.newEmail} />
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideNewEmail}>
				<span class="icon-sm inline-block">
					<FaBan />
				</span>
				Cancel
			</button>
			<button on:click={addEmail}>
				Add Email
				<span class="icon-sm inline-block">
					<FaSave />
				</span>
			</button>
		</div>
	</div>
	<!--edit email dialog-->
	<div class="modal-sm" id="edit-email-dialog">
		<h2>Edit Email</h2>
		<div class="dotted-box mb-2">
			<EmailForm email={editor.editEmail} />
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideEditEmail}>
				<span class="icon-sm inline-block">
					<FaBan />
				</span>
				Cancel
			</button>
			<button on:click={updateEmail}>
				Update Email
				<span class="icon-sm inline-block">
					<FaSave />
				</span>
			</button>
		</div>
	</div>
</div>
