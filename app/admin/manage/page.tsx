import AdminAuth from '@/components/AdminAuth'
import AdminProductManagement from '@/components/AdminProductManagement'

export default function AdminManagePage() {
  return (
    <AdminAuth>
      <AdminProductManagement />
    </AdminAuth>
  )
}