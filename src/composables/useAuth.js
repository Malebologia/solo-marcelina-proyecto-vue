import { ref, computed } from 'vue'

const usuario = ref(JSON.parse(localStorage.getItem('usuarioActivo')) || null)

const usuarios = ref(JSON.parse(localStorage.getItem('usuarios')) || [])

export function useAuth() {

    const registrar = (email, password) => {
        const existe = usuarios.value.find(u => u.email === email)
        if (existe) {
            throw new Error('El usuario ya existe')
        }

        const nuevoUsuario = {
            id: Date.now(),
            email,
            password
        }

        usuarios.value.push(nuevoUsuario)
        localStorage.setItem('usuarios', JSON.stringify(usuarios.value))
    }

    const login = (email, password) => {
        const encontrado = usuarios.value.find(
            u => u.email === email && u.password === password
        )

        if (!encontrado) {
            throw new Error('Credenciales incorrectas')
        }

        usuario.value = encontrado
        localStorage.setItem('usuarioActivo', JSON.stringify(encontrado))
    }

    const logout = () => {
        usuario.value = null
        localStorage.removeItem('usuarioActivo')
    }

    const autenticado = computed(() => !!usuario.value)

    return {
        usuario,
        autenticado,
        registrar,
        login,
        logout
    }
}