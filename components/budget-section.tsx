import { CreditCard, Calendar, Hotel, Utensils, Car, ShoppingBag, Calculator } from "lucide-react"

const budgetDays = [
  {
    title: "Día 1 - Fez",
    items: [
      { icon: Hotel, text: "Alojamiento: 30-50€" },
      { icon: Utensils, text: "Comida: 15-25€" },
      { icon: Car, text: "Transporte local: 5-10€" },
      { icon: ShoppingBag, text: "Actividades/Compras: 10-20€" },
      { icon: Calculator, text: "Total estimado: 60-105€", isTotal: true },
    ],
  },
  {
    title: "Día 2 - Merzouga (Desierto)",
    items: [
      { icon: Car, text: "Bus (a Merzouga, nocturno): 25-40€" },
      { icon: Hotel, text: "Campamento en el desierto (incluye cena/desayuno): 40-70€" },
      { icon: ShoppingBag, text: "Paseo en camello: Incluido en campamento" },
      { icon: Calculator, text: "Total estimado: 65-110€", isTotal: true },
    ],
  },
  {
    title: "Día 3 - Viaje a Marrakech",
    items: [
      { icon: Car, text: "Bus (a Marrakech, nocturno): 25-40€" },
      { icon: Utensils, text: "Comida (en ruta): 10-15€" },
      { icon: ShoppingBag, text: "Relax en el desierto (actividades opcionales): 0-10€" },
      { icon: Calculator, text: "Total estimado: 35-65€", isTotal: true },
    ],
  },
  {
    title: "Día 4 - Marrakech",
    items: [
      { icon: Hotel, text: "Alojamiento: 30-50€" },
      { icon: Utensils, text: "Comida: 15-25€" },
      { icon: Car, text: "Transporte local: 5-10€" },
      { icon: ShoppingBag, text: "Entradas (Jardín, Palacio): 10-20€" },
      { icon: ShoppingBag, text: "Compras/Souk: 15-30€" },
      { icon: Calculator, text: "Total estimado: 75-135€", isTotal: true },
    ],
  },
  {
    title: "Día 5 - Marrakech y Regreso",
    items: [
      { icon: Utensils, text: "Desayuno/Almuerzo: 10-15€" },
      { icon: Car, text: "Taxi al aeropuerto: 5-10€" },
      { icon: ShoppingBag, text: "Compras de última hora: 0-15€" },
      { icon: Calculator, text: "Total estimado: 15-40€", isTotal: true },
    ],
  },
]

export function BudgetSection() {
  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
        <CreditCard className="text-[#9c6644]" />
        Presupuesto Estimado por Día
      </h2>
      <div className="space-y-6">
        {budgetDays.map((day, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="flex items-center gap-3 text-lg font-semibold mb-4 text-[#9c6644]">
              <Calendar size={20} />
              {day.title}
            </h3>
            <div className="space-y-2">
              {day.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex items-center gap-3 ${item.isTotal ? "font-bold border-t pt-2 mt-3" : ""}`}
                >
                  <item.icon size={16} className="text-[#9c6644]" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
