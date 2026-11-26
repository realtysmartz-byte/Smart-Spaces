import { NextResponse } from 'next/server'
import { checkIsAdmin } from '@/lib/auth'
import { updateDynamicEnquiry, deleteDynamicEnquiry } from '@/lib/data/dynamic-store'

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await props.params
  try {
    const body = await req.json()
    const updated = updateDynamicEnquiry(id, body)
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, enquiry: updated })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 })
  }
}

export async function DELETE(_req: Request, props: { params: Promise<{ id: string }> }) {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await props.params
  const success = deleteDynamicEnquiry(id)
  return NextResponse.json({ success })
}
