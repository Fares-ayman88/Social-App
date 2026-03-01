export default function Footer() {
  return (
    <footer className="app-main mt-10 mb-4">
      <div className="surface-card px-5 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#4d665d]">
          Social App
          <span className="mx-2 text-[#a4b9b2]">|</span>
          Build connections, share moments.
        </p>
        <p className="text-xs text-[#6b847a]">© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  );
}
