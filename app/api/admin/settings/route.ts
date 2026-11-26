import { NextResponse } from 'next/server'
import { checkIsAdmin } from '@/lib/auth'
import { getDynamicSettings, updateDynamicSettings } from '@/lib/data/dynamic-store'

export async function GET() {
  const settings = getDynamicSettings()
  return NextResponse.json({ success: true, settings })
}

export async function POST(req: Request) {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const updated = updateDynamicSettings(data)
    return NextResponse.json({ success: true, settings: updated })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 })
  }
}
