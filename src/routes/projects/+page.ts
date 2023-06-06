import { apiUrl } from '../../lib/api-url';

export async function load({ fetch }) {
	const results = await fetch(`${apiUrl}/project`);
	const projects = results.ok ? await results.json() : null;
	return { projects };
}
