import { NowPlaying } from './_components/now-playing'
import { Trending } from './_components/trending'
import { Welcome } from './_components/welcome'
import { Trailers } from './_components/trailers'

export default function Home() {
  return (
    <main>
      <Welcome />
      <Trending />
      <Trailers />
      <NowPlaying />
    </main>
  )
}
