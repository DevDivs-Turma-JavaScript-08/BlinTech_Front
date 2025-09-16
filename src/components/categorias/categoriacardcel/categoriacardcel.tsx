import React from "react";

type CardData = {
  id: number;
  nome: string;
  carenciaDias: number;
  descricao: string;
  marcas: string[];
  iconUrl?: string;
};

const cardsData: CardData[] = [
  {
    id: 1,
    nome: "Celular",
    carenciaDias: 10,
    descricao: "Proteja seu celular com planos completos: assistência técnica especializada, garantia estendida e cobertura rápida contra acidentes, roubo ou furto qualificado.",
    marcas: ["Samsung", "Apple", "Motorola","Xiaomi","LG","ASUS"],
    iconUrl: "https://i.imgur.com/VwQfXkj.png", 
  }
 
];

const CardSeguro: React.FC<{ card: CardData }> = ({ card }) => {
  return (
    <div className="w-64 p-5 rounded-2xl bg-gray-600 text-white flex flex-col items-start gap-4 shadow-lg">
      <div className="w-full flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-200">Nome</p>
          <h4 className="font-semibold text-lg">{card.nome}</h4>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-300">Carência:</p>
          <span className="font-bold text-sm">{card.carenciaDias} dias</span>
        </div>
      </div>

      {/* Ícone central */}
      <div className="w-full flex justify-center">
        {/* Se quiser usar uma imagem: */}
        {card.iconUrl ? (
          <img src={card.iconUrl} alt={`${card.nome} icon`} className="w-20 h-20 object-contain opacity-90" />
        ) : (
          /* Ou um ícone simples em SVG */
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="opacity-80">
            <rect x="7" y="3" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="18.2" r="0.8" fill="currentColor" />
          </svg>
        )}
      </div>

      <p className="text-sm text-gray-200">{card.descricao}</p>

      {/* Marcas como "pills" */}
      <div className="mt-2 flex flex-wrap gap-2">
        {card.marcas.map((m) => (
          <span
            key={m}
            className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20"
            title={`Marca: ${m}`}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  );
};

const CardsSection: React.FC = () => {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Confira nossas categorias de Seguros</h2>

      <div className="flex gap-6 justify-center">
        {cardsData.map((card) => (
          <CardSeguro key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
