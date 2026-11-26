import { NextResponse } from 'next/server'
import { checkIsAdmin } from '@/lib/auth'
import { getDynamicEnquiries, saveDynamicEnquiry } from '@/lib/data/dynamic-store'

export async function GET() {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const enquiries = getDynamicEnquiries()
  return NextResponse.json({ success: true, enquiries })
}

export async function POST(req: Request) {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const enquiry = saveDynamicEnquiry(data)
    return NextResponse.json({ success: true, enquiry })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 })
  }
}
