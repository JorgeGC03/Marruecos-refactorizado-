"use client"

import { useState } from "react"
import { Handshake, Plus, Save, Edit, Trash2, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Expense {
  payer: string
  amount: number
  description: string
}

const MAD_TO_EUR_RATE = 0.093

export function SharedPaymentsSection() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [payer, setPayer] = useState("Jorge")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [description, setDescription] = useState("")
  const [editingIndex, setEditingIndex] = useState(-1)

  const addExpense = () => {
    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Por favor, introduce una cantidad válida.")
      return
    }

    const finalAmount = currency === "MAD" ? numAmount * MAD_TO_EUR_RATE : numAmount

    const newExpense: Expense = {
      payer,
      amount: Number.parseFloat(finalAmount.toFixed(2)),
      description,
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
      payer,
      amount: Number.parseFloat(finalAmount.toFixed(2)),
      description,
    }

    setExpenses(updatedExpenses)
    clearForm()
    setEditingIndex(-1)
  }

  const deleteExpense = (index: number) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index)
    setExpenses(updatedExpenses)
    if (editingIndex === index) {
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
    setEditingIndex(index)
  }

  const clearForm = () => {
    setAmount("")
    setDescription("")
    setPayer("Jorge")
    setCurrency("EUR")
  }

  const calculateBalances = () => {
    const jorgeTotal = expenses.filter((e) => e.payer === "Jorge").reduce((sum, e) => sum + e.amount, 0)
    const denisTotal = expenses.filter((e) => e.payer === "Denis").reduce((sum, e) => sum + e.amount, 0)
    const totalSpent = jorgeTotal + denisTotal
    const individualShare = totalSpent / 2
    const jorgeBalance = individualShare - jorgeTotal
    const denisBalance = individualShare - denisTotal

    return { jorgeBalance, denisBalance, totalSpent }
  }

  const { jorgeBalance, denisBalance, totalSpent } = calculateBalances()

  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold mb-6">
        <Handshake className="text-[#9c6644]" />
        Pagos Compartidos
      </h2>

      <div className="space-y-6">
        {/* Form Section */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-[#9c6644]">
            <Plus size={20} />
            {editingIndex === -1 ? "Añadir Gasto" : "Editar Gasto"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payer">Pagador:</Label>
              <Select value={payer} onValueChange={setPayer}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jorge">Jorge</SelectItem>
                  <SelectItem value="Denis">Denis</SelectItem>
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
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="MAD">MAD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Descripción (opcional):</Label>
              <Input
                id="description"
                placeholder="Ej: Cena en Fez"
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
                  Actualizar Gasto
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
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-[#9c6644]">Resumen de Gastos</h3>

          {expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay gastos registrados aún.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#fefae0]">
                    <th className="border border-gray-300 p-3 text-left text-[#9c6644]">Pagador</th>
                    <th className="border border-gray-300 p-3 text-left text-[#9c6644]">Descripción</th>
                    <th className="border border-gray-300 p-3 text-left text-[#9c6644]">Cantidad (EUR)</th>
                    <th className="border border-gray-300 p-3 text-left text-[#9c6644]">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3">{expense.payer}</td>
                      <td className="border border-gray-300 p-3">{expense.description || "-"}</td>
                      <td className="border border-gray-300 p-3">{expense.amount.toFixed(2)} €</td>
                      <td className="border border-gray-300 p-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => editExpense(index)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Edit size={14} />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => deleteExpense(index)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Balance Summary */}
        {expenses.length > 0 && (
          <div className="bg-[#fefae0] rounded-lg p-6 border border-[#d4a373]">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Total gastado: <strong>{totalSpent.toFixed(2)} €</strong>
              </p>
              {Math.abs(jorgeBalance) > 0.01 ? (
                jorgeBalance > 0 ? (
                  <div className="flex items-center justify-center gap-2 text-orange-600">
                    <AlertTriangle size={20} />
                    <span className="font-semibold">
                      Jorge le debe a Denis: <strong>{jorgeBalance.toFixed(2)} €</strong>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-orange-600">
                    <AlertTriangle size={20} />
                    <span className="font-semibold">
                      Denis le debe a Jorge: <strong>{Math.abs(jorgeBalance).toFixed(2)} €</strong>
                    </span>
                  </div>
                )
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle size={20} />
                  <span className="font-semibold">¡Saldos cuadrados! Nadie debe nada.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
