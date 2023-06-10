<script lang="ts">
	import { clone } from '../../../lib/clone';
	import { blankEmail, type EmailType } from '../../../types/email.type';
	import { blankPhone, type PhoneType } from '../../../types/phone.type';
	import { blankUser, type UserType } from '../../../types/user.type';
	import UserEmailList from '../user-email-list.svelte';
	import UserForm from '../user-form.svelte';
	import UserPhoneList from '../user-phone-list.svelte';
	import UserRoles from '../user-roles.svelte';

	type EditorType = {
		newPhone: PhoneType;
		editPhone: PhoneType;
		newEmail: EmailType;
		exitEmail: EmailType;
	};
	const editor: EditorType = {
		newPhone: clone(blankPhone),
		editPhone: {},
		newEmail: clone(blankEmail),
		exitEmail: {}
	};
	let user: UserType = clone(blankUser);
</script>

<div class="card">
	<h1>New User</h1>
	<UserForm {user} showPass={true} />
	<UserRoles roles={user.Roles || []} />
	<!--phones-->
	<div class="flex flex-wrap">
		<h3>Phones</h3>
		<button class="ml-4">New Phone</button>
	</div>
	<UserPhoneList phones={user.Phones || []} />
	<!--emails-->
	<div class="flex flex-wrap">
		<h3>Emails</h3>
		<button class="ml-4">New Email</button>
	</div>
	<UserEmailList emails={user.Emails || []} />
	<button>Save User</button>
</div>

<div class="modal-overlay" id="new-user-overlay">
	<!--new phone dialog-->
	<!--edit phone dialog-->
	<!--new email dialog-->
	<!--edit email dialog-->
</div>
