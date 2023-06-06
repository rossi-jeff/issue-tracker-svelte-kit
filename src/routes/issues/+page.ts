import { apiUrl } from '../../lib/api-url';

export async function load({ fetch }) {
	const issueReq = fetch(`${apiUrl}/issue`);
	const userReq = fetch(`${apiUrl}/user`);
	const [issuesRes, usersRes] = await Promise.all([issueReq, userReq]);
	let issues, users;
	if (issuesRes.ok) issues = await issuesRes.json();
	if (usersRes.ok) users = await usersRes.json();
	return {
		issues,
		users
	};
}
