import { buildHeaders } from '$lib/build-headers.js';
import { blankUserSession } from '$lib/user-session.writable.js';
import { apiUrl } from '../../../lib/api-url.js';
import type { UserType } from '../../../types/user.type.js';

export async function load({ fetch, params }) {
	let user: UserType = {};
	const { uuid } = params;
	const result = await fetch(`${apiUrl}/user/${uuid}`, {
		headers: buildHeaders(blankUserSession)
	});
	if (result.ok) user = await result.json();
	return { user, uuid };
}
