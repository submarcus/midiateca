import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import { data } from "./assets/data";
// import { Routes, Route } from "react-router";

// interface Game {
//     nota: number;
//     nome: string;
//     data: string;
//     genero: string[];
//     tempo: string;
//     versao: string;
//     cover?: string;
// }

const App = () => {
    return (
        <div className="min-h-screen bg-neutral-950 text-white p-4">
            <div className="max-w-6xl mx-auto">
                <Header data={data} />
                <Home data={data} />
            </div>
            {/* <Routes>
                <Route path="/" element={<Home />} />
            </Routes> */}
        </div>
    );
};

export default App;
