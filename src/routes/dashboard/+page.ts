import { apiUrl } from '../../lib/api-url';

export async function load({ fetch }) {
	const results = await fetch(`${apiUrl}/issue`);
	const issues = results.ok ? await results.json() : null;
	return { issues };
}
