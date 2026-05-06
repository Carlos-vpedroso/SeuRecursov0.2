import { NextPage } from 'next'
import { clsx } from 'clsx'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { Multa } from '@/types';
import { useRouter } from 'next/navigation';

interface Props {
    multa: Multa;
    setStateSelectedMulta: React.Dispatch<React.SetStateAction<Multa | null>>;
}

const Cardmultas: NextPage<Props> = ({ multa,
    setStateSelectedMulta }) => {
    const router = useRouter()

    const tipoMultaMap = {
        LEVE: {
            label: "Leve",
            color: "text-green-500",
        },
        MEDIA: {
            label: "Média",
            color: "text-yellow-500",
        },
        GRAVE: {
            label: "Grave",
            color: "text-orange-500",
        },
        GRAVISSIMA: {
            label: "Gravíssima",
            color: "text-red-500",
        },
    };

    const tipo = tipoMultaMap[multa.tipo_multa];

    const valorMulta = formatCurrency(multa.valor_multa)

    const handleClick = () => {
        try {
            setStateSelectedMulta(multa);
            router.push(`/multa/${multa.id}`)
        } catch (error) {

        }
    }


    return (
        <div
            className='relative min-h-35 md:min-h-50 shadow-md border border-solid border-gray-200 rounded-md cursor-pointer hover:border-gray-500 hover:shadow-xl transition duration-300'
            onClick={handleClick}
        >
            <div className='flex justify-between mx-4 my-2'>
                <p className='text-gray-400'>{multa.artigo_multa}</p>
                <p className='text-gray-400'>{multa.codigo_multa}</p>
            </div>
            <h3 className='mx-2 text-sm'>{multa.descricao}</h3>
            <div
                className={clsx(
                    "absolute bottom-0 justify-between w-full",
                    tipo?.color
                )}
            >
                <div className='flex w-full justify-between px-4 pb-1'>
                    <p>{tipo?.label}</p>
                    <p>{valorMulta}</p>
                </div>
            </div>
        </div>
    )
}

export default Cardmultas