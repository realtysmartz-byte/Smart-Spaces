import { NextResponse } from 'next/server'
import { validateAdminCredentials, createAdminSession } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'Username and password required' }, { status: 400 })
    }

    const isValid = await validateAdminCredentials(username, password)
    if (!isValid) {
      return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 })
    }

    await createAdminSession()
    return NextResponse.json({ success: true, message: 'Logged in successfully' })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 })
  }
}
