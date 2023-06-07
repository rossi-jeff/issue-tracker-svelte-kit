import { apiUrl } from '../../lib/api-url';

export async function load({ fetch }) {
	const results = await fetch(`${apiUrl}/timeclock`);
	const timeclocks = results.ok ? await results.json() : null;
	return { timeclocks };
}
