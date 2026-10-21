import { redirect } from 'next/navigation'

export default function LogoutPage() {
  // In production, this would clear the session cookie
  redirect('/admin/login')
}
