import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '../composables/useAuth'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth'

// Mock de todo el módulo de Firebase Auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn((auth, callback) => {
    // Simular que arranca sin sesión
    callback(null)
  })
}))

// Mock del achivo de configuración local
vi.mock('../firebase', () => ({
  auth: {},
  db: {}
}))

describe('useAuth Composable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Forzamos que la variable reactiva global usuario regrese a null
    const { usuario } = useAuth()
    usuario.value = null
  })

  it('inicializa con usuario nulo', () => {
    const { usuario } = useAuth()
    expect(usuario.value).toBeNull()
  })

  it('permite iniciar sesión y actualiza el usuario mediante login()', async () => {
    const { usuario, login } = useAuth()
    const mockUser = { email: 'test@correo.com', uid: '12345' }
    
    // Configuramos qué responde la promesa simulada de Firebase
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: mockUser })

    await login('test@correo.com', 'password123')

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1)
    expect(usuario.value).toEqual(mockUser)
  })

  it('permite cerrar sesión y limpia el usuario mediante logout()', async () => {
    const { usuario, logout } = useAuth()
    // Simulamos un usuario conectado
    usuario.value = { email: 'logueado@user.com' }
    
    signOut.mockResolvedValueOnce()

    await logout()

    expect(signOut).toHaveBeenCalledTimes(1)
    expect(usuario.value).toBeNull()
  })
})
