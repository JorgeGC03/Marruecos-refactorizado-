"use client"

import { useState } from "react"
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Medina de Fez",
    title: "Medina de Fez",
    description: "Laberinto de calles estrechas y zocos tradicionales",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Desierto de Merzouga",
    title: "Desierto de Merzouga",
    description: "Dunas doradas del Sahara al atardecer",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Plaza Jemaa el-Fna",
    title: "Plaza Jemaa el-Fna",
    description: "Corazón vibrante de Marrakech",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Jardín Majorelle",
    title: "Jardín Majorelle",
    description: "Oasis de color azul cobalto",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Campamento Bereber",
    title: "Campamento Bereber",
    description: "Noche bajo las estrellas del desierto",
  },
  {
    src: "/placeholder.svg?height=300&width=400",
    alt: "Curtidores de Fez",
    title: "Curtidores de Fez",
    description: "Tradición milenaria del cuero",
  },
]

export function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 text-2xl font-bold mb-6">
        <Camera className="text-[#9c6644]" />
        Galería de Fotos
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera className="text-white" size={24} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <h4 className="text-white font-semibold text-sm">{image.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 p-0"
          >
            <X size={20} />
          </Button>

          <Button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 p-0"
          >
            <ChevronLeft size={20} />
          </Button>

          <Button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 p-0"
          >
            <ChevronRight size={20} />
          </Button>

          <div className="max-w-4xl max-h-full">
            <img
              src={galleryImages[selectedImage].src || "/placeholder.svg"}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-xl font-bold mb-2">{galleryImages[selectedImage].title}</h3>
              <p className="text-gray-300">{galleryImages[selectedImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
