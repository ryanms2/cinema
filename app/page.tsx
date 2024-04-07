import { Navbar } from "./_components/navbar";
import { NowPlaying } from "./_components/now-playing";
import { Trending } from "./_components/trending";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Trending />
      <NowPlaying />
    </main>
  );
}
