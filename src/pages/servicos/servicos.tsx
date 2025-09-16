import BeneficiosSeguro from "../../components/cards/cardBeneficios/CardBeneficios";
import CardEscolha from "../../components/cards/cardescolha/CardEscolha";

export default function Servicos() {
  return (
    <main className="flex flex-col w-full min-h-screen  gap-3">

        {/* orcamento */}
        <section className="w-full">
        <div className="bg-violet-500 p-7 h-[350px] flex items-center justify-center flex-col gap-5 text-white text-center">
            <h1 className="text-5xl ">Proteja seus eletronicos com seguranca</h1>

            <p className="text-[19px]">Diversos tipos de cobertura, escolha aquele que entre no seu bolso</p>

            <div className="flex gap-5 text-black mt-9">

                <button className="hover: cursor-pointer border-white p-3 hover:bg-violet-300
                radius-full rounded-2xl w-[130px] bg-white ">Ver planos</button>

                <button className="hover: cursor-pointer border-white p-3 bg-white hover:bg-violet-300
                radius-full rounded-2xl w-[130px]">Fazer Seguro</button>
            </div>
        </div>
        </section>

        {/* seccao produtos */}
        <section className="text-center">
            <h1 className="text-3xl font-semibold">Nossos Produtos</h1>
            <p className="">Escolha o plano ideal para seus dispositivos</p>
        <div>
            <BeneficiosSeguro />
        </div>
        </section>

        {/* por que nos escolher? */}
        <section className="text-center text-3xl">
            <h1 className="font-semibold">Por que escolher a BlinTech?</h1>
            <CardEscolha />
        </section>

    </main>   
  )
}
