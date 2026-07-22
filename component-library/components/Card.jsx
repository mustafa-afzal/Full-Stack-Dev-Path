export default function Card({ icon, iconColor = '#4F6EF7', title, children }) {
    return (
        <div className="card-wrapper">
            <div 
                className="card-icon"
                style={{ backgroundColor: iconColor }}
            >
                {icon}
            </div>
            <div className="card">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{children}</p>
            </div>
        </div>
    )
}