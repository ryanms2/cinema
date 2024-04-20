import { Navbar } from "./_components/navbar";
import { NowPlaying } from "./_components/now-playing";
import { Trending } from "./_components/trending";
import { Welcome } from "./_components/welcome";

export default function Home() {
  return (
    <main>
      <Welcome />
      <Trending />
      <NowPlaying />
    </main>
  );
}
