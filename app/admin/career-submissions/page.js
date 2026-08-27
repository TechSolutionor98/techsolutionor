import { getDb } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Career Submissions - Admin',
};

export default async function CareerSubmissionsPage() {
  let applications = [];
  try {
    const db = await getDb();
    const data = await db.collection('applications').find({}).sort({ createdAt: -1 }).toArray();
    applications = JSON.parse(JSON.stringify(data.map(app => ({
      ...app,
      id: app._id.toString()
    })))) || [];
  } catch (err) {
    console.error('Error fetching applications directly from db', err);
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Career Form Submissions</h1>
        {applications && applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Phone</th>
                  <th className="px-4 py-2 border">Position</th>
                  <th className="px-4 py-2 border">Info</th>
                  <th className="px-4 py-2 border">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border align-top">{app.id}</td>
                    <td className="px-4 py-2 border align-top">{app.name}</td>
                    <td className="px-4 py-2 border align-top">{app.email}</td>
                    <td className="px-4 py-2 border align-top">{app.phone}</td>
                    <td className="px-4 py-2 border align-top">{app.position}</td>
                    <td className="px-4 py-2 border align-top"><div className="max-w-xs break-words">{app.info}</div></td>
                    <td className="px-4 py-2 border align-top">{new Date(app.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No submissions found.</p>
        )}
      </div>
    </div>
  );
}
