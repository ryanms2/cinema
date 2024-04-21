/* eslint-disable @next/next/no-img-element */

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Test() {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="group relative">
          <img
            alt="Movie Poster"
            className="w-full h-auto rounded-lg shadow-lg"
            height="300"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/300",
              objectFit: "cover",
            }}
            width="200"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            <Badge className="absolute top-4 left-4">75%</Badge>
            <h3 className="text-white font-semibold">Patos!</h3>
            <span className="text-white text-sm">04 de janeiro de 2024</span>
          </div>
        </div>
        <div className="group relative">
          <img
            alt="Movie Poster"
            className="w-full h-auto rounded-lg shadow-lg"
            height="300"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/300",
              objectFit: "cover",
            }}
            width="200"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            <Badge className="absolute top-4 left-4">85%</Badge>
            <h3 className="text-white font-semibold">Filme 2</h3>
            <span className="text-white text-sm">10 de fevereiro de 2024</span>
          </div>
        </div>
        <div className="group relative">
          <img
            alt="Movie Poster"
            className="w-full h-auto rounded-lg shadow-lg"
            height="300"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/300",
              objectFit: "cover",
            }}
            width="200"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            <Badge className="absolute top-4 left-4">92%</Badge>
            <h3 className="text-white font-semibold">Filme 3</h3>
            <span className="text-white text-sm">22 de março de 2024</span>
          </div>
        </div>
        <div className="group relative">
          <img
            alt="Movie Poster"
            className="w-full h-auto rounded-lg shadow-lg"
            height="300"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/300",
              objectFit: "cover",
            }}
            width="200"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            <Badge className="absolute top-4 left-4">68%</Badge>
            <h3 className="text-white font-semibold">Filme 4</h3>
            <span className="text-white text-sm">05 de abril de 2024</span>
          </div>
        </div>
        <div className="group relative">
          <img
            alt="Movie Poster"
            className="w-full h-auto rounded-lg shadow-lg"
            height="300"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/300",
              objectFit: "cover",
            }}
            width="200"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent rounded-b-lg">
            <Badge className="absolute top-4 left-4">79%</Badge>
            <h3 className="text-white font-semibold">Filme 5</h3>
            <span className="text-white text-sm">18 de maio de 2024</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <Button variant="secondary">Ver Mais</Button>
      </div>
    </div>
  )
}