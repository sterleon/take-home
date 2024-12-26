export interface RawSkill {
	name: string;
	applicant_id: number;
}

export interface RawJob {
	id: number;
	name: string;
}

export interface RawApplicant {
	id: number;
	name: string;
	email: string;
	website: string;
	cover_letter: string;
	job_id: number;
}

export interface RawData {
	jobs: RawJob[];
	applicants: RawApplicant[];
	skills: RawSkill[];
}

export interface Applicant {
	name: string;
	email: string;
	website: string;
	cover_letter: string;
	skills: string[];
}

export interface ApplicantsByJob {
	jobName: string;
	applicants: Applicant[];
}
