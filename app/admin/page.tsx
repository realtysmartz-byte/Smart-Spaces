import { redirect } from 'next/navigation'
import { checkIsAdmin } from '@/lib/auth'
import { getDynamicProjects, getDynamicEnquiries, getDynamicSettings } from '@/lib/data/dynamic-store'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

export const metadata = {
  title: 'Admin Control Hub | Smartz Spaces',
  description: 'Manage commercial property inventory, leads, and inquiries in real time.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const isAdmin = await checkIsAdmin()

  if (!isAdmin) {
    redirect('/admin/login')
  }

  const projects = getDynamicProjects()
  const enquiries = getDynamicEnquiries()
  const settings = getDynamicSettings()

  return (
    <AdminDashboard
      initialProjects={projects}
      initialEnquiries={enquiries}
      initialSettings={settings}
    />
  )
}
