import Link from 'next/link'
import { LogOut, Download, Search, Filter } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'Admin Panel | Smartz Spaces',
  robots: { index: false, follow: false },
}

// Mock data - in production, this would come from the database
const mockEnquiries = [
  {
    id: 1,
    name: 'John Doe',
    phone: '9876543210',
    email: 'john@example.com',
    formType: 'project-enquiry',
    relatedProject: 'm3m-broadway',
    budget: '1-2cr',
    preferredLocation: 'golf-course-extension-road',
    message: 'Interested in retail shops',
    status: 'new',
    createdAt: '2026-10-20',
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '9876543211',
    email: 'jane@example.com',
    formType: 'investment-strategy',
    budget: '2-5cr',
    preferredLocation: 'southern-peripheral-road',
    message: 'Looking for pre-leased assets',
    status: 'contacted',
    createdAt: '2026-10-19',
  },
]

const statusColors = {
  new: 'bg-blue-500',
  contacted: 'bg-yellow-500',
  qualified: 'bg-green-500',
  'site-visit': 'bg-purple-500',
  closed: 'bg-gray-500',
  'not-interested': 'bg-red-500',
}

export default function AdminPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Admin', href: '/admin' },
              ]}
            />
            <h1 className="text-3xl font-semibold tracking-tight mt-4">Admin Panel</h1>
          </div>
          <div className="flex gap-2">
            <button className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              <Download className="mr-2 size-4" />
              Export CSV
            </button>
            <Link href="/admin/logout" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              <LogOut className="mr-2 size-4" />
              Logout
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">Total Enquiries</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">New</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-muted-foreground">Contacted</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-muted-foreground">Qualified</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-muted-foreground">Closed</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder="Search enquiries..." className="pl-10" />
            </div>
          </div>
          <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="site-visit">Site Visit</option>
            <option value="closed">Closed</option>
            <option value="not-interested">Not Interested</option>
          </select>
          <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="">All Types</option>
            <option value="project-enquiry">Project Enquiry</option>
            <option value="investment-strategy">Investment Strategy</option>
            <option value="shortlist">Shortlist</option>
          </select>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Phone</th>
                  <th className="text-left p-4 font-medium">Type</th>
                  <th className="text-left p-4 font-medium">Project</th>
                  <th className="text-left p-4 font-medium">Budget</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="border-t border-border">
                    <td className="p-4">
                      <div className="font-medium">{enquiry.name}</div>
                      <div className="text-sm text-muted-foreground">{enquiry.email}</div>
                    </td>
                    <td className="p-4">{enquiry.phone}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{enquiry.formType}</Badge>
                    </td>
                    <td className="p-4">{enquiry.relatedProject || '-'}</td>
                    <td className="p-4">{enquiry.budget || '-'}</td>
                    <td className="p-4">
                      <Badge className={`${statusColors[enquiry.status as keyof typeof statusColors]} text-white`}>
                        {enquiry.status}
                      </Badge>
                    </td>
                    <td className="p-4">{enquiry.createdAt}</td>
                    <td className="p-4">
                      <button className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          * In production, this will connect to the MySQL database. Currently showing mock data.
        </p>
      </div>
    </>
  )
}
