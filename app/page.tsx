import { Suspense } from 'react'
import { NowPlaying } from './_components/now-playing'
import { Trending } from './_components/trending'
import { Welcome } from './_components/welcome'
import { HomePageSkeletonMovie } from './ui/skeletons'
import { Trailers } from './_components/trailers'

export default function Home() {
  return (
    <main>
      <Welcome />
      <Suspense fallback={<HomePageSkeletonMovie />}>
        <Trending />
      </Suspense>
      <Trailers />

      <Suspense fallback={<HomePageSkeletonMovie />}>
        <NowPlaying />
      </Suspense>
    </main>
  )
}
