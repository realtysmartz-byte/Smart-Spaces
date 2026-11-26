import { NextResponse } from 'next/server'
import { destroyAdminSession } from '@/lib/auth'

export async function POST() {
  await destroyAdminSession()
  return NextResponse.json({ success: true, message: 'Logged out successfully' })
}

export async function GET(req: Request) {
  await destroyAdminSession()
  return NextResponse.redirect(new URL('/admin/login', req.url))
}
