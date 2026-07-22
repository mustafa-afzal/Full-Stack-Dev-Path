export default function Testimonial({ src, alt, name, occupation, children }){
    return (
        <div className='testimonial-wrapper'>
            <div className='testimonial'>
                <div className='testimonial-left'>
                    <img src={src} alt={alt} />
                </div>
                <div className='testimonial-right'>
                    <img src='/Icon.png' />
                    <p id='description'> {children} </p>
                    <p id='name'> {name} </p>
                    <p id='occupation'> {occupation} </p>
                </div>
            </div>
        </div>
    )
}