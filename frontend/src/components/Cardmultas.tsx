import { NextPage } from 'next'
import { clsx } from 'clsx'
import Link from 'next/link'

interface Props {
    artigo: string,
    codigo: string,
    descricao: string,
    tipoMulta: string,
    valor: number,
    id: string
}

const Cardmultas: NextPage<Props> = ({ id, artigo, codigo, descricao, tipoMulta, valor }) => {

    let gravissima = false
    let grave = false
    let media = false
    let leve = false

    if (tipoMulta == 'Gravíssima') {
        gravissima = true
    } else if (tipoMulta == 'Grave') {
        grave = true
    } else if (tipoMulta == 'Média') {
        media = true
    } else {
        leve = true
    }

    const valorMulta = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);


    return (
        <Link
            className='relative min-h-35 md:min-h-50 shadow-md border border-solid border-gray-200 rounded-md cursor-pointer hover:border-gray-500 hover:shadow-xl transition duration-300'
            href={`/multa/${id}`}
        >
            <div className='flex justify-between mx-4 my-2'>
                <p className='text-gray-400'>{artigo}</p>
                <p className='text-gray-400'>{codigo}</p>
            </div>
            <h3 className='mx-2 text-sm'>{descricao}</h3>
            <div className={clsx(
                "absolute bottom-0 justify-between w-full",
                gravissima && "text-red-500",
                grave && "text-orange-500",
                media && "text-yellow-500",
                leve && "text-green-500"
            )}>
                <div className='flex w-full justify-between px-4 pb-1'>
                    <p>{tipoMulta}</p>
                    <p>{valorMulta}</p>
                </div>
            </div>
        </Link>
    )
}

export default Cardmultas