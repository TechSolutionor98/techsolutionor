import { getApiBase } from '@/lib/api-helper';
import AppointmentsClient from './AppointmentsClient';

export const metadata = {
  title: 'Appointment Links - Admin',
};
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AppointmentsPage() {
  const apiBase = getApiBase();
  let links = [];

  try {
    const res = await fetch(`${apiBase}/api/appointments`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      links = data.links || [];
    }
  } catch (err) {
    console.error('Error fetching appointment links:', err);
  }

  return (
    <div>
      <h1 className="text-[30px] font-bold">APPOINTMENT LINKS</h1>
      <p className="text-sm text-gray-600">
        Add Google Calendar / Appointment Schedule links here. Clients will see and click these links to book appointments.
      </p>
      <div className="bg-white p-6 rounded shadow mt-5">
        <AppointmentsClient initialLinks={links} apiBase={apiBase} />
      </div>
    </div>
  );
}
