import { apiUrl } from '../../lib/api-url';

export async function load({ fetch }) {
	const userReq = fetch(`${apiUrl}/user`);
	const projectReq = fetch(`${apiUrl}/project`);
	const issueReq = fetch(`${apiUrl}/issue`);
	const clockReq = fetch(`${apiUrl}/timeclock`);
	let timeclocks, users, projects, issues;
	const [userRes, projectRes, issueRes, clockRes] = await Promise.all([
		userReq,
		projectReq,
		issueReq,
		clockReq
	]);
	if (userRes.ok) users = await userRes.json();
	if (projectRes.ok) projects = await projectRes.json();
	if (issueRes.ok) issues = await issueRes.json();
	if (clockRes.ok) timeclocks = await clockRes.json();
	return { timeclocks, users, projects, issues };
}
