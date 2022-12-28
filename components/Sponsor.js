import Image from 'next/image'

const Sponsor = ({sponsor}) => {
    const websiteElement = sponsor.elements.website.linkedItems
    const website = websiteElement.length > 0 ? websiteElement[0] : null
    const sponsorImage = sponsor.elements.logo

    return ( 
        <div className=" w-full py-8 bg-slate-100 hover:bg-primary hover:text-white cursor-pointer">
            <a href={website.elements.link.value} target='_blank' rel='noreferrer'></a>
            <Image
                className="w-12 h-12 rounded-full"
                src={sponsorImage.value[0].url}
                alt=""
                width="80"
                height="80"
                loading="lazy"
              />
            <a href={website.elements.link.value} target='_blank' rel='noreferrer'>
                {website === null ? <div>{sponsor.elements.name.value}</div> :
                    <div className="font-semibold">
                        {sponsor.elements.name.value}
                    </div>
                }
            </a>
        </div>
     );
}
 
export default Sponsor;