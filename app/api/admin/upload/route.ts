import { NextResponse } from 'next/server'
import { checkIsAdmin } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 })
    }

    const allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    if (file.type && !allowedMime.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file format. Please upload JPG, PNG, WEBP, or SVG.' },
        { status: 400 },
      )
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File size too large. Maximum size is 10MB.' },
        { status: 400 },
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const ext = path.extname(file.name).toLowerCase() || '.jpg'
    const safeBase = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .slice(0, 30)

    const filename = `${safeBase}-${Date.now()}${ext}`
    const filePath = path.join(uploadsDir, filename)

    fs.writeFileSync(filePath, buffer)

    const fileUrl = `/uploads/${filename}`
    return NextResponse.json({ success: true, url: fileUrl, filename })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 })
  }
}
