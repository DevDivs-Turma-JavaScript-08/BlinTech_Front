
export default function Perfil() {
  return (
    <main className='relative h-screen w-full flex flex-col items-center'>

        <div className='bg-violet-700 w-[100%] h-[300px]'>
            <button className='p-2 w-[100px] text-white m-4 rounded-2xl hover:cursor-pointer hover:underline '>&larr; Voltar</button>
        </div>
        
        <section className='absolute items-center top-1/6 shadow-2xl'>
            <div className='flex gap-8 p-5 bg-white w-[750px] h-[300px] '>
                <div className="bg-black rounded-full h-35 w-35"></div>
                <div className="flex flex-col gap-2 w-[300px]">
                    <h3 className="font-semibold text-2xl">Fulano de Ciclano</h3>
                    <p>CPF: 123456789</p>
                    <p>Email: root@root.com</p>
                    <p>Telefone: 40028922</p>

                    <button className="mt-10 bg-violet-400 p-3 rounded-2xl w-[150px] hover:cursor-pointer hover:bg-violet-500">Editar Perfil</button>
                </div>
            </div>
        </section>
        
        <section className="relative top-1/5 ">
        <h1>seguros efetuados do fulano ciclano</h1>
        <div>cardsSeguros</div>
        </section>

    </main>
  )
}
