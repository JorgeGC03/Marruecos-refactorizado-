"use client"

import { useState } from "react"
import {
  Handshake,
  Plus,
  Save,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Calculator,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Expense {
  id: string
  payer: string
  amount: number
  description: string
  category: string
  date: string
}

const MAD_TO_EUR_RATE = 0.093

const categories = [
  { value: "transport", label: "🚌 Transporte", color: "bg-blue-100 text-blue-800" },
  { value: "accommodation", label: "🏨 Alojamiento", color: "bg-purple-100 text-purple-800" },
  { value: "food", label: "🍽️ Comida", color: "bg-green-100 text-green-800" },
  { value: "activities", label: "🎯 Actividades", color: "bg-orange-100 text-orange-800" },
  { value: "shopping", label: "🛍️ Compras", color: "bg-pink-100 text-pink-800" },
  { value: "other", label: "📦 Otros", color: "bg-gray-100 text-gray-800" },
]

export function SharedPaymentsSection() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [payer, setPayer] = useState("Jorge")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("food")
  const [editingIndex, setEditingIndex] = useState(-1)

  const addExpense = () => {
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Por favor, introduce una cantidad válida.")
      return
    }

    const finalAmount = currency === "MAD" ? numAmount * MAD_TO_EUR_RATE : numAmount

    const newExpense: Expense = {
      id: Date.now().toString(),
      payer,
      amount: Number.parseFloat(finalAmount.toFixed(2)),
      description,
      category,
      date: new Date().toISOString().split("T")[0],
    }

    setExpenses([...expenses, newExpense])
    clearForm()
  }

  const updateExpense = () => {
    if (editingIndex === -1) return

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Por favor, introduce una cantidad válida.")
      return
    }

    const finalAmount = currency === "MAD" ? numAmount * MAD_TO_EUR_RATE : numAmount

    const updatedExpenses = [...expenses]
    updatedExpenses[editingIndex] = {
      ...updatedExpenses[editingIndex],
      payer,
      amount: Number.parseFloat(finalAmount.toFixed(2)),
      description,
      category,
    }

    setExpenses(updatedExpenses)
    clearForm()
    setEditingIndex(-1)
  }

  const deleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
    if (editingIndex !== -1) {
      clearForm()
      setEditingIndex(-1)
    }
  }

  const editExpense = (index: number) => {
    const expense = expenses[index]
    setPayer(expense.payer)
    setAmount(expense.amount.toString())
    setCurrency("EUR")
    setDescription(expense.description)
    setCategory(expense.category)
    setEditingIndex(index)
  }

  const clearForm = () => {
    setAmount("")
    setDescription("")
    setPayer("Jorge")
    setCurrency("EUR")
    setCategory("food")
  }

  const calculateBalances = () => {
    const jorgeTotal = expenses.filter((e) => e.payer === "Jorge").reduce((sum, e) => sum + e.amount, 0)
    const denisTotal = expenses.filter((e) => e.payer === "Denis").reduce((sum, e) => sum + e.amount, 0)
    const totalSpent = jorgeTotal + denisTotal
    const individualShare = totalSpent / 2
    const jorgeBalance = individualShare - jorgeTotal
    const denisBalance = individualShare - denisTotal

    return { jorgeBalance, denisBalance, totalSpent, jorgeTotal, denisTotal, individualShare }
  }

  const getCategoryStats = () => {
    const categoryTotals = categories
      .map((cat) => ({
        ...cat,
        total: expenses.filter((e) => e.category === cat.value).reduce((sum, e) => sum + e.amount, 0),
      }))
      .filter((cat) => cat.total > 0)

    return categoryTotals.sort((a, b) => b.total - a.total)
  }

  const { jorgeBalance, denisBalance, totalSpent, jorgeTotal, denisTotal, individualShare } = calculateBalances()
  const categoryStats = getCategoryStats()

  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
        <Handshake className="text-[#9c6644]" />
        Pagos Compartidos
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Summary Cards */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign size={16} />
              Total Gastado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#9c6644]">{totalSpent.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">Entre ambos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users size={16} />
              Por Persona
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{individualShare.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">Parte equitativa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp size={16} />
              Estado
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Math.abs(jorgeBalance) > 0.01 ? (
              <div className="text-sm">
                {jorgeBalance > 0 ? (
                  <div className="text-orange-600 font-semibold">Jorge debe {jorgeBalance.toFixed(2)} €</div>
                ) : (
                  <div className="text-orange-600 font-semibold">Denis debe {Math.abs(jorgeBalance).toFixed(2)} €</div>
                )}
              </div>
            ) : (
              <div className="text-green-600 font-semibold text-sm">¡Saldos equilibrados!</div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      {categoryStats.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">📊 Gastos por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categoryStats.map((cat) => (
                <div key={cat.value} className="text-center">
                  <Badge className={cat.color}>{cat.label}</Badge>
                  <div className="font-semibold mt-1">{cat.total.toFixed(2)} €</div>
                  <div className="text-xs text-gray-500">{((cat.total / totalSpent) * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Individual Contributions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-[#9c6644]">👤 Jorge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{jorgeTotal.toFixed(2)} €</div>
            <div className="text-sm text-gray-600">{expenses.filter((e) => e.payer === "Jorge").length} gastos</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-[#9c6644] h-2 rounded-full"
                style={{ width: `${totalSpent > 0 ? (jorgeTotal / totalSpent) * 100 : 0}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-[#9c6644]">👤 Denis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{denisTotal.toFixed(2)} €</div>
            <div className="text-sm text-gray-600">{expenses.filter((e) => e.payer === "Denis").length} gastos</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-[#d4a373] h-2 rounded-full"
                style={{ width: `${totalSpent > 0 ? (denisTotal / totalSpent) * 100 : 0}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#9c6644]">
            <Plus size={20} />
            {editingIndex === -1 ? "Añadir Gasto" : "Editar Gasto"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="payer">Pagador:</Label>
              <Select value={payer} onValueChange={setPayer}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jorge">👤 Jorge</SelectItem>
                  <SelectItem value="Denis">👤 Denis</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="amount">Cantidad:</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Ej: 15.50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="currency">Moneda:</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">💶 EUR</SelectItem>
                  <SelectItem value="MAD">🇲🇦 MAD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Categoría:</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="description">Descripción:</Label>
              <Input
                id="description"
                placeholder="Ej: Cena en restaurante local"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {editingIndex === -1 ? (
              <Button onClick={addExpense} className="bg-[#9c6644] hover:bg-[#8b5a3c]">
                <Plus size={16} className="mr-2" />
                Añadir Gasto
              </Button>
            ) : (
              <>
                <Button onClick={updateExpense} className="bg-blue-600 hover:bg-blue-700">
                  <Save size={16} className="mr-2" />
                  Actualizar
                </Button>
                <Button
                  onClick={() => {
                    clearForm()
                    setEditingIndex(-1)
                  }}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-[#9c6644]">📋 Lista de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calculator size={48} className="mx-auto mb-4 opacity-50" />
              <p>No hay gastos registrados aún.</p>
              <p className="text-sm">¡Añade tu primer gasto arriba!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense, index) => {
                const categoryInfo = categories.find((c) => c.value === expense.category)
                return (
                  <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={categoryInfo?.color || "bg-gray-100 text-gray-800"}>
                          {categoryInfo?.label || "📦 Otros"}
                        </Badge>
                        <span className="font-medium text-sm">
                          {expense.payer === "Jorge" ? "👤" : "👤"} {expense.payer}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{expense.description || "Sin descripción"}</div>
                      <div className="text-xs text-gray-500">{expense.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{expense.amount.toFixed(2)} €</div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          onClick={() => editExpense(index)}
                          className="bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1"
                        >
                          <Edit size={12} />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => deleteExpense(expense.id)}
                          className="bg-red-600 hover:bg-red-700 text-xs px-2 py-1"
                        >
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Balance */}
      {expenses.length > 0 && (
        <Card className="mt-6 border-2 border-[#d4a373]">
          <CardContent className="p-6">
            <div className="text-center">
              {Math.abs(jorgeBalance) > 0.01 ? (
                jorgeBalance > 0 ? (
                  <div className="flex items-center justify-center gap-2 text-orange-600">
                    <AlertTriangle size={24} />
                    <div>
                      <div className="font-bold text-xl">Jorge debe a Denis</div>
                      <div className="text-2xl font-bold">{jorgeBalance.toFixed(2)} €</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-orange-600">
                    <AlertTriangle size={24} />
                    <div>
                      <div className="font-bold text-xl">Denis debe a Jorge</div>
                      <div className="text-2xl font-bold">{Math.abs(jorgeBalance).toFixed(2)} €</div>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle size={24} />
                  <div>
                    <div className="font-bold text-xl">¡Saldos Equilibrados!</div>
                    <div className="text-sm">Nadie debe nada a nadie</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
