import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function ComponentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Username
            </label>
            <Input type="username" id="username" required />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-zinc-700 dark:text-zinc-300 mb-2"
            >
              Password
            </label>
            <Input type="password" id="password" required />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-zinc-900 dark:text-zinc-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Forgot password?
            </a>
          </div>
          <Button type="submit" className="w-full">
            Login
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
