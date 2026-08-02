import { Outlet } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { MobileNav } from '@/components/MobileNav'
import { Footer } from '@/components/Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <Header />
      <div className="flex flex-1 max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 pb-20 lg:pb-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
      <Footer />
      <MobileNav />
    </div>
  )
}
