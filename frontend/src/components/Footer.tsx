import { FaFacebook, FaInstagram } from 'react-icons/fa'
import logo from '../../public/LogoSeuRecurso2.jpg'
import Image from "next/image"

const Footer = () => {
    return (
        <footer className="bg-azul grid grid-cols-1 sm:grid-cols-2">
            <div className='my-5 mx-auto'>
                <Image
                    src={logo}
                    width={100}
                    height={100}
                    alt="Logo Seu Recurso"
                    className='h-auto w-auto'
                />
                <div className='text-white font-semibold text-sm'>
                    <p>
                        Monte seu recurso
                    </p>
                    <p>
                        de multa em menos
                    </p>
                    <p>
                        de 3 minutos!
                    </p>
                </div>
            </div>
            <div className='my-5 mx-auto text-white'>
                <h3 className='font-bold'>Nossas Páginas</h3>
                <p className='text-sm underline cursor-pointer'>Termo de uso</p>
                <p className='text-sm underline cursor-pointer'>Política de Privacidade</p>
                <h3 className='text-white font-bold'>Redes Sociais</h3>
                <ul className='flex gap-4'>
                    <li><FaFacebook className='text-white w-8 h-8 mt-2' /></li>
                    <li><FaInstagram className='text-white w-8 h-8 mt-2' /></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer