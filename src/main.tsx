import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import JobReport from './JobReport.tsx';

createRoot(document.getElementById('page')!).render(
	<StrictMode>
		<JobReport />
	</StrictMode>
);
