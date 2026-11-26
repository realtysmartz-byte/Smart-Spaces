import { NextResponse } from 'next/server'
import { destroyAdminSession } from '@/lib/auth'

export async function GET(req: Request) {
  await destroyAdminSession()
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

export async function POST(req: Request) {
  await destroyAdminSession()
  return NextResponse.redirect(new URL('/admin/login', req.url))
}

