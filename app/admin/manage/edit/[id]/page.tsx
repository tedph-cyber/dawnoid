import AdminAuth from '@/components/AdminAuth'
import AdminProductEdit from '@/components/AdminProductEdit'

interface Props {
  // Next may pass `params` as a Promise in newer Next.js versions; accept either form
  params: { id: string } | Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const resolvedParams = await params;

  return (
    <AdminAuth>
      <AdminProductEdit productId={resolvedParams.id} />
    </AdminAuth>
  )
}
