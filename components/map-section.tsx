import { MapPin } from "lucide-react"

export function MapSection() {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
        <MapPin className="text-[#9c6644]" />
        Marruecos
      </h2>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444757.0285949707!2d-9.998168!3d31.791702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b265e6402ed703%3A0x240fb2cfb489a64a!2sMarruecos!5e0!3m2!1ses!2ses!4v1704067200000!5m2!1ses!2ses"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
