import { useEffect, useState } from "react"

export default function CardEquipe() {

    const ListEquipe = [
         {
            foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACUCAMAAABfnM59AAAAA1BMVEUAAACnej3aAAAAOElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAMhiAAAXG8vLUAAAAASUVORK5CYII=',
            nome: 'Agata',
            funcao: 'Desenvolvedora',
            frase: 'frase bonita da agata bla bla',
            pitch: 'pitch da pessoa 1'
         },
          {
            foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACUCAMAAABfnM59AAAAA1BMVEUAAACnej3aAAAAOElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAMhiAAAXG8vLUAAAAASUVORK5CYII=',
            nome: 'Alex',
            funcao: 'Desenvolvedor',
            frase: 'frase bonita do alex bla bla',
            pitch: 'pitch da pessoa 2'
         },
          {
            foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACUCAMAAABfnM59AAAAA1BMVEUAAACnej3aAAAAOElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAMhiAAAXG8vLUAAAAASUVORK5CYII=',
            nome: 'GRAZI',
            funcao: 'Desenvolvedora',
            frase: 'frase bonita da grazi bla bla',
            pitch: 'pitch da pessoa 3'
         },
          {
            foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACUCAMAAABfnM59AAAAA1BMVEUAAACnej3aAAAAOElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAMhiAAAXG8vLUAAAAASUVORK5CYII=',
            nome: 'Leticia',
            funcao: 'Desenvolvedora',
            frase: 'frase bonita le bla bla',
            pitch: 'pitch da pessoa 4'
         },
          {
            foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACUCAMAAABfnM59AAAAA1BMVEUAAACnej3aAAAAOElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAMhiAAAXG8vLUAAAAASUVORK5CYII=',
            nome: 'Lucas',
            funcao: 'Po',
            frase: 'frase bonita lucas bla bla',
            pitch: 'pitch da pessoa 5'
         },
          {
            foto: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACUCAMAAABfnM59AAAAA1BMVEUAAACnej3aAAAAOElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAMhiAAAXG8vLUAAAAASUVORK5CYII=',
            nome: 'Pedro',
            funcao: 'Tester',
            frase: 'frase bonita do pedro bla bla',
            pitch: 'pitch da pessoa 6'
         },
        ]
    const [selecionado, setSelecionado] = useState(Object)
    const [teste, setTeste] = useState(false);

    


function testeClick(equipe: Object) {
    console.log('click')
    setSelecionado(equipe)
    setTeste(true)
}
    

  return (
    <div className="flex flex-col w-[70%] items-center gap-6 ">
                <h1 className="font-bold p-3">Nossa Equipe</h1>
                <div className="h-[300px] max-w-6xl  flex gap-6">
                    {ListEquipe.map((equipe, index) => (
                        <div 
                        key = {index}
                        className="bg-white shadow-md p-4 flex flex-col items-center gap-4 w-[300px] hover:cursor-pointer"
                        onClick={() => testeClick(equipe)}
                        >
                            <img src={equipe.foto} alt="fotos da equipe" className="w-15 h-15 rounded-full" />
                            <h3>{equipe.nome}</h3>
                            <p>{equipe.funcao}</p>
                    </div>
                    ))}
                </div >

                {teste ? (
                    <div className="flex justify-between h-[400px] bg-white items-center w-5xl px-6 py-4 b">
                    <div className="flex flex-col  space-y-1">
                    <p>{selecionado.nome}</p>
                    <p>{selecionado.frase}</p>
                    <p>{selecionado.pitch}</p>
                    </div>
                    {/* formacoes */}
                    <div className="">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOcAAACUCAMAAABfnM59AAAAA1BMVEUAAACnej3aAAAAOElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAMhiAAAXG8vLUAAAAASUVORK5CYII=" alt="" className="w-30 h-30 rounded-full" />
                        <p>formacoes</p>
                    </div>
                </div>
                ) : (
                    <div className="flex justify-between h-[400px] bg-white items-center w-5xl px-6 py-4 b">
                    <p>seleciona um card</p>
                    </div>
                )}

                </div>
  )
}
