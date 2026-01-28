import { FaExternalLinkAlt } from "react-icons/fa";

type SupplierCardProps = {
    title: string;
    img: string;
    link: string;
    alt: string;
}

export const SupplierCard = ({ title, img, link, alt }: SupplierCardProps) => {
    return (

        <a href={link} >
            <div className="bg-background-muted/80 p-4 rounded-4xl flex flex-col gap-2 p-8 glass-effect-input">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 bg-yellow-100 p-2 rounded-full border border-p-white ">
                        <p className="uppercase font-bold text-yellow-950 text-sm">Leverantör</p>
                    </div>
                    <FaExternalLinkAlt className="text-gray-400" />
                </div>

                <div className="rounded-full overflow-hidden w-24 h-24  border-2 border-secondary/20">
                    <img src={img} alt={alt} className="w-24 h-24 object-cover" />
                </div>
                <h4 className="text-primary">{title}</h4>
                <p className="text-sm text-gray-500 uppercase font-bold" aria-label={`Besök ${title} hemsida`}>Besök Hemsida </p>
            </div>
        </a>


    )
}