"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    onPageChange: (page: number) => void
}

export function UIPagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // No mostrar paginación si solo hay una página
    if (totalPages <= 1) return null

    // Función para generar el rango de páginas a mostrar
    const getPageRange = () => {
        const maxPagesToShow = 5

        if (totalPages <= maxPagesToShow) {
            // Si hay pocas páginas, mostrar todas
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        // Siempre incluir la primera y última página
        const firstPage = 1
        const lastPage = totalPages

        // Calcular el rango central
        let startPage = Math.max(currentPage - 1, firstPage)
        let endPage = Math.min(currentPage + 1, lastPage)

        // Ajustar el rango si estamos cerca del inicio o final
        if (currentPage <= 2) {
            endPage = Math.min(maxPagesToShow - 1, lastPage)
        } else if (currentPage >= totalPages - 1) {
            startPage = Math.max(lastPage - maxPagesToShow + 2, firstPage)
        }

        // Construir el array de páginas
        const pages = []

        // Primera página
        pages.push(firstPage)

        // Ellipsis después de la primera página si hay un salto
        if (startPage > firstPage + 1) {
            pages.push("ellipsis-start")
        }

        // Páginas centrales (excluyendo primera y última si ya están incluidas)
        for (let i = startPage; i <= endPage; i++) {
            if (i !== firstPage && i !== lastPage) {
                pages.push(i)
            }
        }

        // Ellipsis antes de la última página si hay un salto
        if (endPage < lastPage - 1) {
            pages.push("ellipsis-end")
        }

        // Última página (si no es la misma que la primera)
        if (lastPage !== firstPage) {
            pages.push(lastPage)
        }

        return pages
    }

    const pageRange = getPageRange()

    return (
        <div className="flex items-center justify-center space-x-2 py-4">
            <Button variant="outline" size="icon" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
            </Button>

            {pageRange.map((page, index) => {
                if (page === "ellipsis-start" || page === "ellipsis-end") {
                    return (
                        <Button key={`ellipsis-${index}`} variant="outline" size="icon" disabled>
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Más páginas</span>
                        </Button>
                    )
                }

                return (
                    <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => onPageChange(page as number)}
                        className="h-8 w-8 p-0"
                    >
                        {page}
                    </Button>
                )
            })}

            <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Página siguiente</span>
            </Button>
        </div>
    )
}

