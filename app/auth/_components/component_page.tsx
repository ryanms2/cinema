'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

export function ComponentPage() {
  const form = useForm()
  const handleSubmit = form.handleSubmit(async (data) => {
    const bodyRaw = JSON.stringify({
      username: data.username,
      password: data.password,
    })
    alert(bodyRaw)
    // Enviar bodyRaw para a API aqui
  })
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Username
            </label>
            <Input
              type="username"
              id="username"
              {...form.register('username')}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              {...form.register('password')}
              required
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </a>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Sending...' : 'Login'}
          </Button>
        </form>
        <p className="mt-6 text-center text-zinc-600 dark:text-zinc-400">
          Dont have an account?
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
