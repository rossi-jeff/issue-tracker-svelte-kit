import type { BaseModelType } from './base-model.type';

export type IssueType = BaseModelType & {
	Title?: string;
	Details?: string;
	Type?: string;
	Status?: string;
	Priority?: string;
	Complexity?: string;
	SequenceNumber?: string;
};
