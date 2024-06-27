/* eslint-disable @next/next/no-img-element */

export function Footer() {
  return (
    <footer className="bg-primary text-secondary py-3">
      <div className="text-secundary">
        <div className="flex items-center justify-center space-x-2">
          <span>desenvolvido com muito ❤️</span>
          <a href="https://github.com/ryanms2/cinema" target="_blank">
            <img
              aria-hidden="true"
              alt="github"
              src="https://img.icons8.com/?size=100&id=118553&format=png&color=000000"
              width={24}
              height={24}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
