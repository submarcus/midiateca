import { useState, useMemo } from "react";
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
    sortBy: string;
}

const Home = ({ data }: HomeProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        genero: "",
        nota: "",
        tipo: "",
        sortBy: "nota",
    });

    const parseDate = (yearString: string): Date => {
        // Se for apenas um ano, cria uma data com o ano fornecido
        return new Date(parseInt(yearString), 0, 1);
    };

    // Get unique values for filter options
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

            return matchesGenre && matchesRating && matchesType;
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

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const clearFilters = () => {
        setFilters({
            genero: "",
            nota: "",
            tipo: "",
            sortBy: "nota",
        });
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

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Ordenar por</label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
                            >
                                <option value="lancamento">Ano (mais recente)</option>
                                <option value="nome">Nome (A-Z)</option>
                                <option value="nota">Nota (maior-menor)</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-800">
                        <div className="text-sm text-neutral-400">
                            Mostrando {filteredAndSortedContent.length} de {data.length} títulos
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-neutral-200 text-xl text-center mb-6 hover:text-neutral-400 transition-colors">
                <a href="https://coelhomarcus.com" target="_blank" rel="noopener noreferrer">
                    Marcus
                </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredAndSortedContent.map((item, index) => (
                    <ContentCard key={`${item.nome}-${index}`} {...item} />
                ))}
            </div>
        </>
    );
};

export default Home;
