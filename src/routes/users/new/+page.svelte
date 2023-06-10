<script lang="ts">
	import { clone } from '../../../lib/clone';
	import type { UserType } from '../../../types/user.type';
	import UserForm from '../user-form.svelte';

	const blank: UserType = {
		Credentials: {},
		Name: {}
	};
	let user: UserType = clone(blank);
</script>

<div class="card">
	<h1>New User</h1>
	<UserForm {user} showPass={true} />
	<button>Save User</button>
</div>
