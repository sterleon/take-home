import { ApplicantsByJob, RawData } from '../types';
import Data from '../data.json';
const typedData = Data as RawData;

import { useEffect, useState } from 'react';

const JobReport = () => {
	const [applicantsByJob, setApplicantsByJob] = useState<ApplicantsByJob[]>([]);

	const findJobRowSpan = (jobName: string) => {
		return applicantsByJob
			.find((job) => job.jobName === jobName)
			?.applicants.reduce(
				(count, applicant) => count + applicant.skills.length,
				0
			);
	};

	const findUniqueSkills = () => {
		return new Set(typedData.skills.map((skill) => skill.name)).size;
	};

	useEffect(() => {
		const newState: ApplicantsByJob[] = typedData.jobs.map((job) => ({
			jobName: job.name,
			applicants: typedData.applicants
				.filter((applicant) => applicant.job_id === job.id)
				.map((applicant) => ({
					name: applicant.name,
					email: applicant.email,
					website: applicant.website,
					cover_letter: applicant.cover_letter,
					skills: typedData.skills
						.filter((skill) => skill.applicant_id === applicant.id)
						.map((skill) => skill.name),
				})),
		}));

		setApplicantsByJob(newState);
	}, []);

	return (
		<table className='job-applicants'>
			<thead>
				<tr>
					<th>Job</th>
					<th>Applicant Name</th>
					<th>Email Address</th>
					<th>Website</th>
					<th>Skills</th>
					<th>Cover Letter Paragraph</th>
				</tr>
			</thead>
			<tbody>
				{applicantsByJob.map((job) => (
					<>
						{job.applicants.map((applicant, i) => (
							<>
								<tr>
									{i === 0 && (
										<td
											rowSpan={findJobRowSpan(job.jobName)}
											className='job-name'
										>
											{job.jobName}
										</td>
									)}
									<td
										rowSpan={applicant.skills.length}
										className='applicant-name'
									>
										{applicant.name}
									</td>
									<td rowSpan={applicant.skills.length}>
										<a href={`mailto:${applicant.email}`}>{applicant.email}</a>
									</td>
									<td rowSpan={applicant.skills.length}>
										<a href={applicant.website}>{applicant.website}</a>
									</td>
									<td>{applicant.skills[0]}</td>
									<td rowSpan={applicant.skills.length}>
										{applicant.cover_letter}
									</td>
								</tr>
								{applicant.skills
									.filter((_, i) => i !== 0)
									.map((skill) => (
										<tr>
											<td>{skill}</td>
										</tr>
									))}
							</>
						))}
					</>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan={6}>
						{typedData.applicants.length} Applicants, {findUniqueSkills()}{' '}
						Unique Skills
					</td>
				</tr>
			</tfoot>
		</table>
	);
};

export default JobReport;
