export default function NavBar() {
    return(
        <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto flex h-16 max-w-[1260px] items-center justify-between gap-4 px-4">
          <a href="#" className="text-2xl font-black text-[#e8590c]">
            🍳 Tastebook
          </a>
          <p className="hidden text-sm text-[#6b7280] sm:block">
            Find something delicious
          </p>
        </div>
      </header>

    )
}