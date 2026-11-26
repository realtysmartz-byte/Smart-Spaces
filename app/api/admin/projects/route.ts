import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { checkIsAdmin } from '@/lib/auth'
import { getDynamicProjects, saveDynamicProject } from '@/lib/data/dynamic-store'

export async function GET() {
  const projects = getDynamicProjects()
  return NextResponse.json({ success: true, projects })
}

export async function POST(req: Request) {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    if (!data.name || !data.slug || !data.sector || !data.locationSlug) {
      return NextResponse.json(
        { success: false, message: 'Name, slug, sector, and locationSlug are required' },
        { status: 400 },
      )
    }

    const saved = saveDynamicProject(data)
    try {
      revalidatePath('/projects')
      revalidatePath('/')
      revalidatePath(`/projects/${saved.slug}`)
    } catch {
      // Ignore during dev
    }
    return NextResponse.json({ success: true, project: saved })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 })
  }
}
