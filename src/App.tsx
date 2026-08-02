import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/hooks/use-auth'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import ForgotPassword from '@/pages/ForgotPassword'
import ResetPassword from '@/pages/ResetPassword'
import VerifyEmail from '@/pages/VerifyEmail'
import Onboarding from '@/pages/Onboarding'
import Feed from '@/pages/Feed'
import Profile from '@/pages/Profile'
import Desafios from '@/pages/Desafios'
import Mapa from '@/pages/Mapa'
import Biblioteca from '@/pages/Biblioteca'
import MaterialDetail from '@/pages/MaterialDetail'
import Diy from '@/pages/Diy'
import DiyDetail from '@/pages/DiyDetail'
import Ranking from '@/pages/Ranking'
import Scanner from '@/pages/Scanner'
import Notifications from '@/pages/Notifications'
import MunicipioDashboard from '@/pages/MunicipioDashboard'
import EmpresaDashboard from '@/pages/EmpresaDashboard'
import EscolaDashboard from '@/pages/EscolaDashboard'
import NotFound from '@/pages/NotFound'

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/perfil/:id" element={<Profile />} />
            <Route path="/desafios" element={<Desafios />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/biblioteca/:material" element={<MaterialDetail />} />
            <Route path="/diy" element={<Diy />} />
            <Route path="/diy/:id" element={<DiyDetail />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/notificacoes" element={<Notifications />} />
            <Route path="/municipio/dashboard" element={<MunicipioDashboard />} />
            <Route path="/empresa/dashboard" element={<EmpresaDashboard />} />
            <Route path="/escola/dashboard" element={<EscolaDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
