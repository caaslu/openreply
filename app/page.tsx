import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OpenReply — Automação de comentário para DM no Instagram",
  description:
    "Transforme comentários com palavras-chave em mensagens diretas automáticas no Instagram, usando a API oficial da Meta.",
};

const heroStats = [
  { value: "24/7", label: "Monitoramento de comentários" },
  { value: "1", label: "DM por comentário correspondente" },
  { value: "0", label: "Scraping necessário" },
];

const flowSteps = [
  {
    eyebrow: "Conectar",
    title: "Conecte sua conta profissional do Instagram",
    description:
      "Entre com o e-mail e conecte o Instagram uma vez. Sem compartilhar senha, sem automação de navegador.",
  },
  {
    eyebrow: "Criar",
    title: "Escolha a publicação, as palavras-chave e a DM",
    description:
      "Crie uma campanha para um reel ou publicação: a palavra-chave a observar, a resposta pública e a DM a enviar.",
  },
  {
    eyebrow: "Enviar",
    title: "As respostas saem pela API oficial",
    description:
      "Webhooks capturam comentários na hora e uma varredura pega os que o Instagram não envia, para nada passar. Cada envio vai para a fila, com limite de taxa, e fica registrado.",
  },
];

const features = [
  "Entrada por link de acesso no e-mail",
  "Várias contas do Instagram",
  "Tokens armazenados com criptografia",
  "Reconciliação por webhook + polling",
  "Worker de envio com fila",
  "Limite de taxa por conta",
  "Links rastreados com estatísticas de cliques",
  "Registros de DM com status completo",
  "Exigir seguir antes de entregar o link",
];

/* Static, faithful copies of the real Overview and Dashboard screens, built in
   the app's own design tokens so what visitors see is what the app looks like. */

function AppWindow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background shadow-2xl shadow-black/50">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 text-xs text-muted">{label}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-border bg-surface p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

const overviewStats = [
  ["Visualizações", "847.2K"],
  ["Alcance", "612.4K"],
  ["Curtidas", "38.1K"],
  ["Comentários", "4,204"],
  ["Salvos", "9,712"],
  ["Compartilhamentos", "2,340"],
];

const overviewPosts = [
  ["Reel do lançamento", "214.8K", "9.1K", "3 abr"],
  ["Reposição de estoque", "88.4K", "5.2K", "28 mar"],
  ["Bastidores do estúdio", "51.3K", "3.4K", "21 mar"],
];

function OverviewPreview() {
  return (
    <AppWindow label="app / visão geral">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">Visão geral</h3>
          <p className="mt-1 text-xs text-muted">
            Recente — 24 publicações de @studio.store
          </p>
        </div>
        <span className="rounded border border-border px-2 py-1 text-xs text-muted">
          Últimas 50
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {overviewStats.map(([label, value]) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold text-foreground">
            Seguidores ao longo do tempo
          </p>
          <p className="text-xs text-muted">
            48,210 <span className="text-success">+1,240</span> · 30d
          </p>
        </div>
        <svg
          viewBox="0 0 300 64"
          preserveAspectRatio="none"
          className="mt-3 h-16 w-full"
          aria-hidden="true"
        >
          <polyline
            points="0,54 43,49 86,51 129,40 171,36 214,26 257,20 300,9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className="text-accent"
          />
        </svg>
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-foreground">Publicações</p>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted">
              <th className="pb-2 pr-3 font-medium">Publicação</th>
              <th className="pb-2 px-3 text-right font-medium">Visualizações</th>
              <th className="pb-2 px-3 text-right font-medium">Curtidas</th>
              <th className="pb-2 pl-3 text-right font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {overviewPosts.map(([post, views, likes, date]) => (
              <tr key={post} className="border-b border-border last:border-0">
                <td className="py-2 pr-3 text-foreground">{post}</td>
                <td className="py-2 px-3 text-right text-muted">{views}</td>
                <td className="py-2 px-3 text-right text-muted">{likes}</td>
                <td className="py-2 pl-3 text-right text-muted">{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppWindow>
  );
}

function MatchedCommentCard() {
  return (
    <div className="w-64 rounded-lg border border-border bg-surface p-4 shadow-2xl shadow-black/50">
      <p className="text-xs text-muted">Novo comentário</p>
      <p className="mt-1 text-sm font-semibold text-foreground">@maya.co</p>
      <p className="mt-1 text-sm text-muted">LINK por favor</p>
      <div className="mt-3 border-t border-border pt-3">
        <p className="text-xs text-muted">
          Palavra-chave: <span className="text-accent">GUIDE</span>
        </p>
        <p className="mt-1 text-sm font-medium text-success">
          Resposta privada na fila
        </p>
      </div>
    </div>
  );
}

const dashboardStats = [
  ["Campanhas ativas", "8"],
  ["DMs Enviadas", "1,284"],
  ["Ignoradas", "42"],
  ["Falhas", "3"],
  ["Cliques", "356"],
  ["CTR", "27.7%"],
];

const dashboardChart: [string, number][] = [
  ["seg", 42],
  ["ter", 68],
  ["qua", 51],
  ["qui", 94],
  ["sex", 120],
  ["sáb", 86],
  ["dom", 73],
];

const dashboardActivity = [
  ["@maya.co", "Resposta do guia", "Enviada", "text-success"],
  ["@founder.ray", "Pedido de preço", "Enviada", "text-success"],
  ["@shop.ava", "Material de captura", "Na fila", "text-warning"],
];

function DashboardPreview() {
  const maxDM = Math.max(...dashboardChart.map(([, n]) => n));
  return (
    <AppWindow label="app / painel">
      <h3 className="text-base font-semibold text-foreground">Olá, Maya!</h3>
      <p className="mt-1 text-xs text-muted">2 contas conectadas · 340 contatos</p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {dashboardStats.map(([label, value]) => (
          <Stat key={label} label={label} value={value} />
        ))}
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-foreground">DMs — Últimos 7 dias</p>
        <div className="mt-4 flex h-32 items-end gap-2">
          {dashboardChart.map(([day, n]) => (
            <div key={day} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-[10px] text-muted">{n}</span>
              <div
                className="w-full rounded-sm bg-accent"
                style={{ height: `${Math.max((n / maxDM) * 100, 4)}%` }}
              />
              <span className="text-[10px] text-muted">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded border border-border bg-surface p-4">
        <p className="text-sm font-semibold text-foreground">Atividade recente</p>
        <div className="mt-3 space-y-2">
          {dashboardActivity.map(([user, automation, status, color]) => (
            <div
              key={user}
              className="flex items-center justify-between gap-3 border-b border-border py-2 text-sm last:border-0"
            >
              <span className="truncate text-foreground">{user}</span>
              <span className="truncate text-muted">{automation}</span>
              <span className={`text-sm ${color}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Início do OpenReply">
            <Image
              src="/v2_logo.svg"
              alt="Designerz OpenReply"
              width={1301}
              height={182}
              className="h-7 w-auto sm:h-9"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="btn-brand"
            >
              Começar
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:px-6 sm:pt-18 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-border bg-background px-3 py-2 text-sm font-semibold text-muted">
            API oficial da Meta
          </div>

          <h1 className="mt-7 text-balance text-4xl font-black leading-[1.02] text-foreground sm:text-5xl lg:text-6xl">
            Transforme cada comentário na DM certa
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">
            Quando alguém comenta sua palavra-chave em uma publicação ou reel,
            recebe a DM segundos depois. Tudo pela API oficial do Instagram.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="btn-brand"
            >
              Começar
            </Link>
            <a
              href="#how"
              className="btn-secondary"
            >
              Veja como funciona
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="border border-border bg-surface p-4">
                <dt className="text-2xl font-black text-foreground">{stat.value}</dt>
                <dd className="mt-1 text-xs leading-5 text-muted">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <OverviewPreview />
          <div className="absolute -bottom-8 -left-6 hidden lg:block">
            <MatchedCommentCard />
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-accent">Como funciona</p>
            <h2 className="mt-3 text-balance text-3xl font-black leading-tight text-foreground sm:text-4xl">
              Um comentário entra, uma DM sai
            </h2>
            <p className="mt-5 text-pretty text-base leading-8 text-muted">
              Três passos. Conecte uma conta, crie uma campanha e deixe rodar.
              O webhook trata em tempo real e a varredura recupera o que o
              webhook perder.
            </p>
          </div>

          <div className="grid gap-4">
            {flowSteps.map((step) => (
              <article
                key={step.title}
                className="grid gap-4 border border-border bg-surface p-5 sm:grid-cols-[120px_1fr]"
              >
                <p className="text-sm font-bold text-accent">{step.eyebrow}</p>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:items-center">
          <DashboardPreview />

          <div>
            <p className="text-sm font-bold uppercase text-accent">O painel</p>
            <h2 className="mt-3 text-balance text-3xl font-black leading-tight text-foreground sm:text-4xl">
              Veja exatamente o que aconteceu
            </h2>
            <p className="mt-5 text-pretty text-base leading-8 text-muted">
              Cada evento de comentário é rastreável: na fila, correspondente,
              enviada, ignorada, falha ou limite atingido. Sem caixa-preta.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase text-accent">O que está incluído</p>
          <h2 className="mt-3 text-balance text-3xl font-black leading-tight text-foreground sm:text-4xl">
            Ferramentas para cada etapa
          </h2>
          <p className="mt-5 text-pretty text-base leading-8 text-muted">
            Da conexão da conta ao registro de cada DM, o essencial para operar
            campanhas de comentário no Instagram.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="border border-border bg-surface p-4 text-sm font-semibold text-muted"
            >
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6 lg:px-8">
        <div
          className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"
          style={{ backgroundImage: "var(--gradient-brand)" }}
        >
          <div>
            <h2 className="max-w-3xl text-balance text-3xl font-black leading-tight text-white sm:text-4xl">
              Transforme os comentários do seu próximo reel em DMs
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/login"
              className="btn-secondary"
            >
              Começar
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 text-sm text-muted sm:px-6 lg:px-8">
          <Image
            src="/v2_logo.svg"
            alt="Designerz OpenReply"
            width={1301}
            height={182}
            className="h-6 w-auto"
          />
        </div>
      </footer>
    </main>
  );
}
