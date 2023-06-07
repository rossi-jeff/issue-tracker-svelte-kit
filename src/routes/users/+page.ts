import { apiUrl } from '../../lib/api-url';

export async function load({ fetch }) {
	const results = await fetch(`${apiUrl}/user`);
	const users = results.ok ? await results.json() : null;
	return { users };
}
