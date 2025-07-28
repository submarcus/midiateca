interface Data {
    nota: number;
    nome: string;
    lancamento: string;
    genero: string[];
    tempo: string;
    tipo: string;
    cover?: string;
}

interface HeaderProps {
    data: Data[];
}

const Header = ({ data }: HeaderProps) => {
    const totalContent = data.length;

    // Contar mangás especificamente
    const mangas = data.filter((item) => item.tipo === "Mangá").length;

    return (
        <div className="bg-neutral-950 rounded-lg mb-10 cursor-default">
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="invisible sm:visible flex flex-col items-center justify-center border border-neutral-800 bg-neutral-950 shadow-inner shadow-neutral-800 rounded-lg p-3">
                        <div className="text-white font-bold text-lg">{totalContent}</div>
                        <div className="text-neutral-400 text-sm">Total</div>
                    </div>
                    <a href="https://steamcommunity.com/id/maahlune" target="_blank">
                        <img
                            src="https://i.pinimg.com/1200x/5e/d0/b9/5ed0b982860e9fffd3ee73299d9b9165.jpg"
                            className="border border-neutral-800 bg-neutral-950 shadow-inner shadow-neutral-800 rounded-lg size-20 object-cover"
                        />
                    </a>
                    <div className="invisible sm:visible flex flex-col items-center justify-center border border-neutral-800 bg-neutral-950 shadow-inner shadow-neutral-800 rounded-lg p-3">
                        <div className="text-white font-bold text-lg">{mangas}</div>
                        <div className="text-neutral-400 text-sm">Mangás</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
