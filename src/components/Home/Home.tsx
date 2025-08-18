import { useState, useMemo, useEffect } from "react";
import ContentCard from "../ContentCard/ContentCard";

interface Data {
    nota: number;
    nome: string;
    lancamento: string;
    genero: string[];
    tempo: string;
    tipo: string;
    cover?: string;
}

interface HomeProps {
    data: Data[];
}

interface FilterState {
    genero: string;
    nota: string;
    tipo: string;
    tempo: string;
    sortBy: string;
}

const Home = ({ data }: HomeProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(24);
    const [filters, setFilters] = useState<FilterState>({
        genero: "",
        nota: "",
        tipo: "",
        tempo: "",
        sortBy: "nota",
    });

    const parseDate = (yearString: string): Date => {
        return new Date(parseInt(yearString), 0, 1);
    };

    const uniqueGenres = useMemo(() => {
        const genres = new Set<string>();
        data.forEach((d) => {
            d.genero.forEach((genre) => genres.add(genre));
        });
        return Array.from(genres).sort();
    }, [data]);

    const uniqueTypes = useMemo(() => {
        const types = new Set(data.map((d) => d.tipo));
        return Array.from(types).sort();
    }, [data]);

    const uniqueTempos = useMemo(() => {
        const tempos = new Set(data.map((d) => d.tempo));
        return Array.from(tempos).sort();
    }, [data]);

    const uniqueRatings = useMemo(() => {
        const ratings = new Set(data.map((d) => d.nota));
        return Array.from(ratings).sort((a, b) => b - a);
    }, [data]);

    // Filter and sort content
    const filteredAndSortedContent = useMemo(() => {
        const filtered = data.filter((d) => {
            const matchesGenre = !filters.genero || d.genero.includes(filters.genero);
            const matchesRating = !filters.nota || d.nota.toString() === filters.nota;
            const matchesType = !filters.tipo || d.tipo === filters.tipo;
            const matchesTempo = !filters.tempo || d.tempo === filters.tempo;

            return matchesGenre && matchesRating && matchesType && matchesTempo;
        });

        // Sort content
        filtered.sort((a, b) => {
            switch (filters.sortBy) {
                case "lancamento":
                    return parseDate(b.lancamento).getTime() - parseDate(a.lancamento).getTime();
                case "nome":
                    return a.nome.localeCompare(b.nome);
                case "nota":
                    return b.nota - a.nota;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [data, filters]);

    // Pagination calculations
    const totalItems = filteredAndSortedContent.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredAndSortedContent.slice(startIndex, endIndex);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    const clearFilters = () => {
        setFilters({
            genero: "",
            nota: "",
            tipo: "",
            tempo: "",
            sortBy: "nota",
        });
        setCurrentPage(1); // Reset to first page when clearing filters
    };

    const activeFiltersCount = Object.values(filters).filter((value) => value && value !== "nota").length;

    return (
        <>
            {/* Floating Filter Button */}
            <div className="fixed top-4 right-4 z-50 ">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-800 transition-all duration-300 hover:bg-neutral-800"
                >
                    <div className="relative h-5 w-5">
                        <div
                            className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${
                                isFilterOpen ? "rotate-45 translate-y-2" : "translate-y-0"
                            }`}
                        ></div>
                        <div
                            className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${
                                isFilterOpen ? "opacity-0" : "translate-y-2"
                            }`}
                        ></div>
                        <div
                            className={`absolute h-0.5 w-5 bg-white transition-all duration-300 ${
                                isFilterOpen ? "-rotate-45 translate-y-2" : "translate-y-4"
                            }`}
                        ></div>
                    </div>

                    {/* Active filters badge */}
                    {activeFiltersCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>

                {/* Filter Panel */}
                <div
                    className={`absolute right-0 top-14 w-80 rounded-lg border border-neutral-800 bg-neutral-950 p-4 shadow-xl transition-all duration-300 ${
                        isFilterOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
                    }`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-medium text-white">Filtros</h3>
                        {activeFiltersCount > 0 && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Limpar
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {/* Genre Filter */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Gênero</label>
                            <select
                                value={filters.genero}
                                onChange={(e) => handleFilterChange("genero", e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="">Todos os gêneros</option>
                                {uniqueGenres.map((genre) => (
                                    <option key={genre} value={genre}>
                                        {genre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Nota</label>
                            <select
                                value={filters.nota}
                                onChange={(e) => handleFilterChange("nota", e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="">Todas as notas</option>
                                {uniqueRatings.map((rating) => (
                                    <option key={rating} value={rating.toString()}>
                                        {rating}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Tipo</label>
                            <select
                                value={filters.tipo}
                                onChange={(e) => handleFilterChange("tipo", e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="">Todos os tipos</option>
                                {uniqueTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Time Filter */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Status</label>
                            <select
                                value={filters.tempo}
                                onChange={(e) => handleFilterChange("tempo", e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="">Todos os status</option>
                                {uniqueTempos.map((tempo) => (
                                    <option key={tempo} value={tempo}>
                                        {tempo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Ordenar por</label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="lancamento">Ordem de Lançamento</option>
                                <option value="nome">Nome (A-Z)</option>
                                <option value="nota">Nota (maior-menor)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-800">
                        <div className="text-sm text-neutral-400">
                            Mostrando {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems} títulos
                            {totalItems !== data.length && ` (filtrado de ${data.length})`}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-neutral-200 text-xl text-center mb-6 hover:text-neutral-400 transition-colors">
                <a href="https://coelhomarcus.com" target="_blank" rel="noopener noreferrer">
                    {filters.tipo ? `${filters.tipo}s` : "Marcus"}
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {currentPageData.map((item, index) => (
                    <ContentCard key={`${item.nome}-${startIndex + index}`} {...item} />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 mb-6 space-x-2">
                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-400"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Page Numbers */}
                    {(() => {
                        const pageNumbers = [];
                        const maxVisiblePages = 3;
                        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                        // Adjust start page if we're near the end
                        if (endPage - startPage < maxVisiblePages - 1) {
                            startPage = Math.max(1, endPage - maxVisiblePages + 1);
                        }

                        // Show first page and ellipsis if needed
                        if (startPage > 1) {
                            pageNumbers.push(
                                <button
                                    key={1}
                                    onClick={() => setCurrentPage(1)}
                                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all duration-200"
                                >
                                    1
                                </button>
                            );
                            if (startPage > 2) {
                                pageNumbers.push(
                                    <span key="ellipsis1" className="text-neutral-600 px-2">
                                        ...
                                    </span>
                                );
                            }
                        }

                        // Show visible page numbers
                        for (let i = startPage; i <= endPage; i++) {
                            pageNumbers.push(
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-200 ${
                                        i === currentPage
                                            ? "border-neutral-400 bg-neutral-800 text-white"
                                            : "border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                    }`}
                                >
                                    {i}
                                </button>
                            );
                        }

                        // Show ellipsis and last page if needed
                        if (endPage < totalPages) {
                            if (endPage < totalPages - 1) {
                                pageNumbers.push(
                                    <span key="ellipsis2" className="text-neutral-600 px-2">
                                        ...
                                    </span>
                                );
                            }
                            pageNumbers.push(
                                <button
                                    key={totalPages}
                                    onClick={() => setCurrentPage(totalPages)}
                                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all duration-200"
                                >
                                    {totalPages}
                                </button>
                            );
                        }

                        return pageNumbers;
                    })()}

                    {/* Next Button */}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center w-10 h-10 rounded-lg border border-neutral-800 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-neutral-400"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
                <div className="text-center text-sm text-neutral-500 mb-4">
                    Página {currentPage} de {totalPages}
                </div>
            )}
        </>
    );
};

export default Home;
