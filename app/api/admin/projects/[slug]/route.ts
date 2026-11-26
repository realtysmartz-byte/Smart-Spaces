import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { checkIsAdmin } from '@/lib/auth'
import { getDynamicProject, saveDynamicProject, deleteDynamicProject } from '@/lib/data/dynamic-store'

export async function GET(_req: Request, props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const project = getDynamicProject(slug)
  if (!project) {
    return NextResponse.json({ success: false, message: 'Project not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, project })
}

export async function PUT(req: Request, props: { params: Promise<{ slug: string }> }) {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await props.params
  try {
    const data = await req.json()
    // If slug changed, delete old and save new
    if (data.slug && data.slug !== slug) {
      deleteDynamicProject(slug)
    }
    const saved = saveDynamicProject({ ...data, slug: data.slug || slug })
    try {
      revalidatePath('/projects')
      revalidatePath('/')
      revalidatePath(`/projects/${slug}`)
      if (data.slug) revalidatePath(`/projects/${data.slug}`)
    } catch {
      // Ignore during dev
    }
    return NextResponse.json({ success: true, project: saved })
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 })
  }
}

export async function DELETE(_req: Request, props: { params: Promise<{ slug: string }> }) {
  const isAdmin = await checkIsAdmin()
  if (!isAdmin) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await props.params
  const success = deleteDynamicProject(slug)
  try {
    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath(`/projects/${slug}`)
  } catch {
    // Ignore during dev
  }
  return NextResponse.json({ success })
}
