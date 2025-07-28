## � Meus Filmes, Séries e Animes

Uma aplicação para catalogar e exibir todos os filmes, séries e animes que já assisti.

## 🎯 Sobre o Projeto

Este é meu catálogo pessoal de conteúdo audiovisual assistido, onde registro todos os filmes, séries e animes que terminei ao longo do tempo. A aplicação permite visualizar informações detalhadas como nota, tempo de duração, gênero, tipo e muito mais.

## 🛠️ Tecnologias Utilizadas

-   **React**
-   **TypeScript**
-   **Vite**
-   **Tailwind CSS**
-   **React Icons**
-   **React Router**

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ContentCard/  # Componente do card de conteúdo
│   ├── Header/       # Cabeçalho com estatísticas
│   └── Home/         # Página principal com filtros
├── assets/
│   └── data.tsx      # Base de dados do conteúdo
├── App.tsx          # Componente principal
└── main.tsx         # Ponto de entrada
```

## � Estrutura dos Dados

Cada item possui as seguintes informações:

```typescript
interface Content {
    nota: number; // Nota de 1-10
    nome: string; // Nome do filme/série/anime
    lancamento: string; // Data que assisti
    genero: string[]; // Gêneros do conteúdo
    tempo: string; // Duração ou número de episódios
    tipo: string; // Filme, Série, etc.
    cover?: string; // URL da capa
    review?: string; // Link para review
}
```

## 🌟 Funcionalidades

-   [ ] Sistema de busca por nome
-   [ ] Sistema de tags personalizadas
-   [ ] Gráficos e estatísticas avançadas
-   [ ] Export/import de dados
-   [ ] Modo de lista compacta

## 🤝 Contribuição

Este é um projeto pessoal, mas sugestões e melhorias são sempre bem-vindas!

## 📞 Contato

-   Steam: [maahlune](https://steamcommunity.com/id/maahlune)
-   GitHub: [@maahlune](https://github.com/maahlune)
