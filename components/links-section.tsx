"use client"
export function LinksSection() {
  const links = [
    { label: "Guía Lonely Planet", href: "https://www.lonelyplanet.com/morocco" },
    { label: "Cambio de divisa", href: "https://www.xe.com" },
    { label: "Previsión meteorológica", href: "https://weather.com" },
  ]
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Enlaces útiles</h2>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noreferrer" className="text-primary underline">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
