import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type UserSessionType = {
	UUID: string | null;
	Name: string | null;
	Token: string | null;
	UserName: string | null;
	SessionId: string | null;
	signedIn: boolean;
};

export const blankUserSession: UserSessionType = {
	UUID: null,
	Name: null,
	Token: null,
	UserName: null,
	SessionId: null,
	signedIn: false
};

export const UserSessionKey = 'svelte-issue-tracker-session';

const stored = browser ? localStorage.getItem(UserSessionKey) : null;

const initial = stored ? JSON.parse(stored) : blankUserSession;

export const userSession = writable<UserSessionType>(initial);
