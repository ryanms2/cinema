/* eslint-disable @next/next/no-img-element */
export function MainCast() {
  return (
    <div className="bg-white dark:bg-zinc-800 p-4">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
        Elenco Principal
      </h2>
      <div className="flex overflow-x-auto gap-4">
        <div className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2">
          <img
            className="w-full h-32 object-cover rounded-lg"
            src="https://placehold.co/150x150"
            alt="Rebecca Hall"
          />
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Rebecca Hall
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              Dr. Ilene Andrews
            </p>
          </div>
        </div>
        <div className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2">
          <img
            className="w-full h-32 object-cover rounded-lg"
            src="https://placehold.co/150x150"
            alt="Brian Tyree Henry"
          />
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Brian Tyree Henry
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              Bernie Hayes
            </p>
          </div>
        </div>
        <div className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2">
          <img
            className="w-full h-32 object-cover rounded-lg"
            src="https://placehold.co/150x150"
            alt="Dan Stevens"
          />
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Dan Stevens
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">Trapper</p>
          </div>
        </div>
        <div className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2">
          <img
            className="w-full h-32 object-cover rounded-lg"
            src="https://placehold.co/150x150"
            alt="Kaylee Hottle"
          />
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Kaylee Hottle
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">Jia</p>
          </div>
        </div>
        <div className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2">
          <img
            className="w-full h-32 object-cover rounded-lg"
            src="https://placehold.co/150x150"
            alt="Alex Ferns"
          />
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Alex Ferns
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">Mikael</p>
          </div>
        </div>
        <div className="flex-none w-48 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2">
          <img
            className="w-full h-32 object-cover rounded-lg"
            src="https://placehold.co/150x150"
            alt="Fala Chen"
          />
          <div className="mt-2 text-center">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Fala Chen
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-300">
              Iwi Queen
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
