/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu'
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/sheet'
import {
  CollapsibleTrigger,
  CollapsibleContent,
  Collapsible,
} from '@/components/ui/collapsible'
import { JSX, SVGProps } from 'react'

export default function Navbar() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-gray-900 text-white">
      <Link className="mr-6 flex items-center" href="#">
        <FilmIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Cine Vault</span>
      </Link>
      <div className="hidden md:flex items-center gap-4">
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            <FilmIcon className="h-4 w-4" />
            <span className="text-base font-medium">Filmes</span>
            <ChevronDownIcon className="ml-auto h-5 w-5 transition-all" />
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute bg-gray-900 rounded-md shadow-lg p-4 mt-2 w-48 z-50">
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Ação</span>
            </Link>
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Comédia</span>
            </Link>
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Drama</span>
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            <TvIcon className="h-4 w-4" />
            <span className="text-base font-medium">Séries</span>
            <ChevronDownIcon className="ml-auto h-5 w-5 transition-all" />
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute bg-gray-900 rounded-md shadow-lg p-4 mt-2 w-48 z-50">
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Ficção</span>
            </Link>
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Suspense</span>
            </Link>
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Documentários</span>
            </Link>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
            <UsersIcon className="h-4 w-4" />
            <span className="text-base font-medium">Artistas</span>
            <ChevronDownIcon className="ml-auto h-5 w-5 transition-all" />
          </CollapsibleTrigger>
          <CollapsibleContent className="absolute bg-gray-900 rounded-md shadow-lg p-4 mt-2 w-48 z-50">
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Atores</span>
            </Link>
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Diretores</span>
            </Link>
            <Link
              className="flex items-center gap-2 py-2 hover:bg-gray-800 rounded-md transition-colors"
              href="#"
            >
              <span className="text-base font-medium">Produtores</span>
            </Link>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="relative">
          <Input
            className="h-9 w-40 rounded-md bg-gray-800 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Pesquisar..."
            type="search"
          />
          <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="rounded-full border border-gray-700 w-9 h-9"
              size="icon"
              variant="ghost"
            >
              <img
                alt="Avatar"
                className="rounded-full"
                height="36"
                src="/placeholder.svg"
                style={{
                  aspectRatio: '36/36',
                  objectFit: 'cover',
                }}
                width="36"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="grid gap-4 py-6">
            <Collapsible>
              <div className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center py-2 text-lg font-semibold">
                  <FilmIcon className="h-4 w-4 mr-2" />
                  Filmes
                  <ChevronDownIcon className="ml-auto h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-2">
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Ação
                  </Link>
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Comédia
                  </Link>
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Drama
                  </Link>
                </CollapsibleContent>
              </div>
            </Collapsible>
            <Collapsible>
              <div className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center py-2 text-lg font-semibold">
                  <TvIcon className="h-4 w-4 mr-2" />
                  Séries
                  <ChevronDownIcon className="ml-auto h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-2">
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Ficção
                  </Link>
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Suspense
                  </Link>
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Documentários
                  </Link>
                </CollapsibleContent>
              </div>
            </Collapsible>
            <Collapsible>
              <div className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center py-2 text-lg font-semibold">
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Artistas
                  <ChevronDownIcon className="ml-auto h-5 w-5 transition-all" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-6 space-y-2">
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Atores
                  </Link>
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Diretores
                  </Link>
                  <Link
                    className="flex w-full items-center py-1 text-base font-medium"
                    href="#"
                  >
                    Produtores
                  </Link>
                </CollapsibleContent>
              </div>
            </Collapsible>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}

function ChevronDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function FilmIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>
  )
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function TvIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  )
}

function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
