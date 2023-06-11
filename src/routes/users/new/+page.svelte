<script lang="ts">
	import { userSession, type UserSessionType } from '$lib/user-session.writable';
	import { get } from 'svelte/store';
	import { clone } from '../../../lib/clone';
	import { blankEmail, type EmailType } from '../../../types/email.type';
	import { blankPhone, type PhoneType } from '../../../types/phone.type';
	import { blankUser, type UserType } from '../../../types/user.type';
	import EmailForm from '../email-form.svelte';
	import PhoneForm from '../phone-form.svelte';
	import UserEmailList from '../user-email-list.svelte';
	import UserForm from '../user-form.svelte';
	import UserPhoneList from '../user-phone-list.svelte';
	import UserRoles from '../user-roles.svelte';
	import { ulid } from 'ulid';
	import { apiUrl } from '$lib/api-url';
	import { buildHeaders } from '$lib/build-headers';

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
	let user: UserType = clone(blankUser);

	let session: UserSessionType = get(userSession);

	const showOverlay = () => {
		const overlay = document.getElementById('new-user-overlay');
		if (overlay) overlay.classList.add('open');
	};

	const hideOverlay = () => {
		const overlay = document.getElementById('new-user-overlay');
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

	const addPhone = () => {
		const phone = editor.newPhone;
		phone.UUID = ulid();
		if (user.Phones) {
			user.Phones.push(phone);
			user = clone(user);
			editor.newPhone = clone(blankPhone);
			hideNewPhone();
		}
	};

	const addEmail = () => {
		const email = editor.newEmail;
		email.UUID = ulid();
		if (user.Emails) {
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

	const updatePhone = () => {
		if (!user.Phones) return;
		const { UUID } = editor.editPhone;
		const idx = user.Phones.findIndex((p) => p.UUID == UUID);
		if (idx != -1) {
			user.Phones[idx] = clone(editor.editPhone);
			user = clone(user);
			hideEditPhone();
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

	const updateEmail = () => {
		if (!user.Emails) return;
		const { UUID } = editor.editEmail;
		const idx = user.Emails.findIndex((e) => e.UUID == UUID);
		if (idx != -1) {
			user.Emails[idx] = clone(editor.editEmail);
			user = clone(user);
			hideEditEmail();
		}
	};

	const registerUser = async () => {
		const result = await fetch(`${apiUrl}/register`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: buildHeaders(session)
		});
		if (result.ok) {
			user = clone(blankUser);
		}
	};
</script>

<div class="card">
	<h1>New User</h1>
	<UserForm {user} showPass={true} />
	<UserRoles {user} />
	<!--phones-->
	<div class="flex flex-wrap">
		<h3>Phones</h3>
		<button class="ml-4" on:click={showNewPhone}>New Phone</button>
	</div>
	<UserPhoneList phones={user.Phones || []} on:editPhone={editPhone} />
	<!--emails-->
	<div class="flex flex-wrap">
		<h3>Emails</h3>
		<button class="ml-4" on:click={showNewEmail}>New Email</button>
	</div>
	<UserEmailList emails={user.Emails || []} on:editEmail={editEmail} />
	<button on:click={registerUser}>Save User</button>
</div>

<div class="modal-overlay" id="new-user-overlay">
	<!--new phone dialog-->
	<div class="modal-sm" id="new-phone-dialog">
		<h2>New Phone</h2>
		<div class="dotted-box">
			<PhoneForm phone={editor.newPhone} />
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideNewPhone}>Cancel</button>
			<button on:click={addPhone}>Add Phone</button>
		</div>
	</div>
	<!--edit phone dialog-->
	<div class="modal-sm" id="edit-phone-dialog">
		<h2>Edit Phone</h2>
		<div class="dotted-box">
			<PhoneForm phone={editor.editPhone} />
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideEditPhone}>Cancel</button>
			<button on:click={updatePhone}>Update Phone</button>
		</div>
	</div>
	<!--new email dialog-->
	<div class="modal-sm" id="new-email-dialog">
		<h2>New Email</h2>
		<div class="dotted-box">
			<EmailForm email={editor.newEmail} />
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideNewEmail}>Cancel</button>
			<button on:click={addEmail}>Add Email</button>
		</div>
	</div>
	<!--edit email dialog-->
	<div class="modal-sm" id="edit-email-dialog">
		<h2>Edit Email</h2>
		<div class="dotted-box">
			<EmailForm email={editor.editEmail} />
		</div>
		<div class="flex flex-wrap justify-between">
			<button on:click={hideEditEmail}>Cancel</button>
			<button on:click={updateEmail}>Update Email</button>
		</div>
	</div>
</div>
