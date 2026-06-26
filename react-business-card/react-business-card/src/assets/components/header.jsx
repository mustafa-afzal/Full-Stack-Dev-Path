import { Mail, ExternalLink } from "lucide-react"
import headshot from "../Mustafa_Headshot.png"

export default function Header() {
    return (
        <>
            <header>
                <img src={headshot} />
                <h1> Mustafa Afzal </h1>
                <h3> Full-Stack Developer </h3>
                <h5> mafz@umich.edu </h5>
                <div className='btn-wrapper'>
                    <a href='mailto:mafz@umich.edu'>
                        <button className='email'> <Mail /> Email </button>
                    </a>
                    <a href='https://www.linkedin.com/in/mustafa-afzal-umich/' target='_blank'>
                        <button className='linkedin'> <ExternalLink /> LinkedIn </button>
                    </a>
                </div>
            </header>
        </>
    )
}