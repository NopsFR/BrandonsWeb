import { ButtonLink } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="label text-ash-dim">404</p>
      <h1 className="mt-2 text-4xl text-paper sm:text-5xl">Page not found</h1>
      <p className="mx-auto mt-4 max-w-sm text-sm text-ash">
        Whatever you were looking for isn't at this address.
      </p>
      <ButtonLink to="/" className="mt-8" variant="ghost">
        Back home
      </ButtonLink>
    </div>
  );
}
