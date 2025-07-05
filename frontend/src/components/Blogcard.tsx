import { ArrowRight } from 'lucide-react'
import { NextPage } from 'next'

interface Props {
    title: string,
    description: string
}

const Blogcard: NextPage<Props> = ({ title, description }) => {
    return (
        <div className="flex cursor-pointer min-h-35">
            <div className="bg-azul w-1/2 h-full">
            </div>
            <div className="relative mx-2">
                <h2 className="select-none font-semibold">
                    {title}
                </h2>
                <p className="select-none text-gray-400 mt-2">
                    {description}
                </p>
                <button className="absolute right-0 bottom-0 bg-azul px-5 py-1 transition hover:bg-blue-800 cursor-pointer">
                    <ArrowRight className="text-white" />
                </button>
            </div>
        </div>
    )
}

export default Blogcard