import AdminAuthProvider from '@/components/AdminAuthProvider'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminDashboard />
    </AdminAuthProvider>
  )
}