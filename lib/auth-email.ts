const FONT_FAMILY =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

const MAGIC_LINK_SUBJECT = "Seu link de acesso ao OpenReply";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildMagicLinkEmail(params: { url: string; identifier: string }) {
  const url = params.url;
  const safeUrl = escapeHtml(url);
  const safeEmail = escapeHtml(params.identifier);

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light only" />
  <meta name="supported-color-schemes" content="light" />
  <title>${MAGIC_LINK_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F3F8;color:#1A1523;font-family:${FONT_FAMILY};">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Use este link para entrar no OpenReply.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F3F8;width:100%;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#FFFFFF;border:1px solid #E8E4EE;border-radius:12px;">
          <tr>
            <td style="padding:40px 36px 16px 36px;font-family:${FONT_FAMILY};font-size:13px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#6B6480;">
              Designerz OpenReply
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 16px 36px;font-family:${FONT_FAMILY};font-size:22px;line-height:30px;font-weight:600;color:#1A1523;">
              Seu link de acesso
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px 36px;font-family:${FONT_FAMILY};font-size:15px;line-height:24px;color:#1A1523;">
              Alguém pediu um link de acesso ao OpenReply para ${safeEmail}. Clique no botão abaixo para entrar.
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 36px 28px 36px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="#B47CFD" style="border-radius:30px;background-color:#B47CFD;background-image:linear-gradient(120deg, #B47CFD 20%, #FF7FC2 60%);">
                    <a href="${safeUrl}" target="_blank" style="display:inline-block;padding:14px 28px;font-family:${FONT_FAMILY};font-size:13px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:#FFFFFF;text-decoration:none;border-radius:30px;background-color:#B47CFD;background-image:linear-gradient(120deg, #B47CFD 20%, #FF7FC2 60%);">
                      Entrar no OpenReply
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 8px 36px;font-family:${FONT_FAMILY};font-size:13px;line-height:20px;color:#6B6480;">
              Se o botão não funcionar, copie e cole este endereço no navegador:
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 28px 36px;font-family:${FONT_FAMILY};font-size:13px;line-height:20px;word-break:break-all;">
              <a href="${safeUrl}" style="color:#CC3366;text-decoration:underline;">${safeUrl}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 12px 36px;font-family:${FONT_FAMILY};font-size:13px;line-height:20px;color:#6B6480;">
              Este link expira em breve e só pode ser usado uma vez.
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 36px 36px;font-family:${FONT_FAMILY};font-size:13px;line-height:20px;color:#6B6480;">
              Se você não pediu este acesso, ignore este e-mail.
            </td>
          </tr>
          <tr>
            <td style="padding:0 36px 32px 36px;border-top:1px solid #E8E4EE;font-family:${FONT_FAMILY};font-size:12px;line-height:18px;color:#6B6480;">
              <div style="padding-top:20px;">OpenReply — enviado automaticamente, não responda.</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    "Designerz OpenReply",
    "",
    `Alguém pediu um link de acesso ao OpenReply para ${params.identifier}.`,
    "",
    "Entre no OpenReply:",
    url,
    "",
    "Este link expira em breve e só pode ser usado uma vez.",
    "",
    "Se você não pediu este acesso, ignore este e-mail.",
    "",
    "OpenReply — enviado automaticamente, não responda.",
  ].join("\n");

  return { subject: MAGIC_LINK_SUBJECT, html, text };
}

export async function sendResendVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: { apiKey?: string; from?: string };
}) {
  const { identifier: to, provider, url } = params;
  const { subject, html, text } = buildMagicLinkEmail({ url, identifier: to });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: provider.from,
      to,
      subject,
      html,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error("Resend error: " + JSON.stringify(await res.json()));
  }
}

export async function sendNodemailerVerificationRequest(params: {
  identifier: string;
  url: string;
  provider: { from?: string; server?: unknown };
}) {
  const { identifier, url, provider } = params;
  const { subject, html, text } = buildMagicLinkEmail({ url, identifier });
  const { createTransport } = await import("nodemailer");
  const transport = createTransport(provider.server as string);
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject,
    text,
    html,
  });
  const failed = [...(result.rejected ?? []), ...(result.pending ?? [])].filter(Boolean);
  if (failed.length) {
    throw new Error(`Email (${failed.join(", ")}) could not be sent`);
  }
}
