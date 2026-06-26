import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa"

export default function Footer() {
    return (
        <footer>
            <a href='#'> <FaTwitter color="#918E9B" size={25} /></a>
            <a href='#'> <FaFacebook color="#918E9B" size={25}/></a>
            <a href='#'> <FaInstagram color="#918E9B" size={25} /></a>
            <a href='#'> <FaGithub color="#918E9B" size={25}/></a>
        </footer>
    )
}