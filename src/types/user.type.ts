import type { BaseModelType } from './base-model.type';
import type { CredentialsType } from './credentials.type';
import type { NameType } from './name.type';

export type UserType = BaseModelType & {
	Credentials?: CredentialsType;
	Name?: NameType;
};
