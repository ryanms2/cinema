/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tNMugjxSqQf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


    <div className="max-w-2xl mx-auto my-6">
      <Select>
        <SelectTrigger id="ordering">
          <SelectValue placeholder="Ordenar" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alphabetical">Alfabética</SelectItem>
          <SelectItem value="popularity">Popularidade</SelectItem>
          <SelectItem value="release-date">Data de lançamento</SelectItem>
        </SelectContent>
      </Select>
      <div className="my-6">
        <h3 className="mb-2 font-bold">Onde Ver</h3>
        <ScrollArea className="border rounded-md h-32">
          <div className="grid grid-cols-3 gap-4 p-4">
            <img
              alt="Streaming Service Logo"
              height="40"
              src="/placeholder.svg"
              style={{
                aspectRatio: "40/40",
                objectFit: "cover",
              }}
              width="40"
            />
          </div>
        </ScrollArea>
      </div>
      <details className="my-6">
        <summary className="mb-2 font-bold cursor-pointer">Filtros</summary>
        <div className="grid gap-6">
          <div>
            <h4 className="mb-2 font-semibold">Título:</h4>
            <Input placeholder="Filme ou série" />
          </div>
          <div className="grid gap-4">
            <h4 className="mb-2 font-semibold">Ano de Lançamento:</h4>
            <div className="flex gap-4">
              <Input className="flex-1" placeholder="De" />
              <Input className="flex-1" placeholder="Até" />
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Gêneros:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Ação</Badge>
              <Badge variant="secondary">Aventura</Badge>
              <Badge variant="secondary">Comédia</Badge>
              <Badge variant="secondary">Drama</Badge>
              <Badge variant="secondary">Fantasia</Badge>
              <Badge variant="secondary">Ficção Científica</Badge>
              <Badge variant="secondary">Romance</Badge>
              <Badge variant="secondary">Terror</Badge>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Classificação Etária:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">L</Badge>
              <Badge variant="secondary">10</Badge>
              <Badge variant="secondary">12</Badge>
              <Badge variant="secondary">14</Badge>
              <Badge variant="secondary">16</Badge>
              <Badge variant="secondary">18</Badge>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Duração:</h4>
            <Select>
              <SelectTrigger id="duration">
                <SelectValue placeholder="Selecione uma opção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Curta (até 1h30min)</SelectItem>
                <SelectItem value="medium">Média (1h30min a 2h30min)</SelectItem>
                <SelectItem value="long">Longa (mais de 2h30min)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Avaliação dos Usuários:</h4>
            <div className="flex items-center gap-4">
              <Input className="flex-1" type="range" />
              <span className="ml-4 text-sm">4/5</span>
            </div>
          </div>
        </div>
      </details>
      <Button className="w-full">Pesquisar</Button>
    </div>