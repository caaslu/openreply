import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground">OpenReply</h1>
        </div>

        <div className="panel rounded p-8 text-center">
          <h2 className="text-lg font-semibold mb-2">Página não encontrada</h2>
          <p className="text-sm text-muted">
            O link pode ter expirado ou não existe mais.
          </p>
          <p className="mt-6 text-sm">
            <Link href="/" className="text-accent hover:underline">
              Voltar ao início
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
