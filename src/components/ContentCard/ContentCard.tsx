interface Content {
    nota: number;
    nome: string;
    lancamento: string;
    genero: string[];
    tempo: string;
    tipo: string;
    cover?: string;
    review?: string;
}

const ContentCard = (content: Content) => {
    const getRatingColor = (rating: number) => {
        if (rating == 10) return "text-green-400";
        if (rating == 9) return "text-lime-400";
        if (rating == 8) return "text-green-500";
        if (rating == 7) return "text-yellow-400";
        return "text-red-400";
    };

    const getTypeBadgeStyle = (type: string) => {
        switch (type.toLowerCase()) {
            case "filme":
                return "bg-amber-950 text-amber-200 border border-amber-900";
            case "anime":
                return "bg-rose-950 text-rose-200 border border-rose-900";
            case "série":
                return "bg-emerald-950 text-emerald-200 border border-emerald-900";
            case "mangá":
                return "bg-blue-950 text-blue-200 border border-blue-900";
            case "manwha":
                return "bg-violet-950 text-violet-200 border border-violet-900";
            default:
                return "bg-gray-950 text-gray-200 border border-gray-900";
        }
    };

    return (
        <a
            href={content.review ? content.review : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-lg border border-neutral-900 bg-neutral-950 p-3 shadow-inner shadow-neutral-800 transition-colors hover:border-neutral-800 ${
                content.review ? "!cursor-pointer" : "cursor-default"
            }`}
        >
            <div className={`relative ${content.review ? "*:!cursor-pointer" : "cursor-default"}`}>
                <img
                    className="w-full aspect-[300/450] object-cover rounded-lg transition-colors"
                    src={content.cover}
                    alt={content.nome}
                />

                {/* Sobreposição */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/70 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-xs text-neutral-300">lançou em</span>
                    <span className="text-md font-medium">{content.lancamento}</span>
                    <br />
                    <span className="text-sm text-neutral-300">{content.tempo}</span>
                </div>

                {/* Tipo do conteúdo */}
                <span
                    className={`absolute top-2 left-2 rounded-md px-2.5 py-1 text-xs font-medium ${getTypeBadgeStyle(
                        content.tipo
                    )}`}
                >
                    {content.tipo}
                </span>

                {/* Nota do conteúdo */}
                <span
                    className={`absolute right-1 top-1 w-6 h-6 flex items-center justify-center rounded-lg bg-black text-sm font-bold ${getRatingColor(
                        content.nota
                    )}`}
                >
                    {content.nota}
                </span>
            </div>

            <div className="mt-2 flex flex-col gap-1">
                <h3 className="truncate text-sm font-medium text-white" title={content.nome}>
                    {content.nome}
                </h3>

                {/* Gênero */}
                <span className="w-fit text-xs text-neutral-300">{content.genero[0]}</span>
            </div>
        </a>
    );
};

export default ContentCard;
