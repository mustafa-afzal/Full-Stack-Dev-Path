import clsx from 'clsx'
import { BsCheckCircleFill, BsExclamationTriangleFill, BsXCircleFill, BsInfoCircleFill } from 'react-icons/bs'

export default function Banner({ variant, title, children }) {
    const icons = {
        success: <BsCheckCircleFill color="#16A34A" />,
        warning: <BsExclamationTriangleFill color="#D97706" />,
        error: <BsXCircleFill color="#DC2626" />,
        neutral: <BsInfoCircleFill color="#2563EB" />
    }

    const styles = {
        success: { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' },
        warning: { backgroundColor: '#FFFBEB', borderColor: '#FCD34D' },
        error: { backgroundColor: '#FEF2F2', borderColor: '#FCA5A5' },
        neutral: { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }
    }

    const titleColors = {
        success: '#15803D',
        warning: '#92400E',
        error: '#991B1B',
        neutral: '#1E40AF'
    }

    return (
        <div
            className={clsx('banner', children && 'banner-multiline')}
            style={{ ...styles[variant], border: `1px solid ${styles[variant].borderColor}` }}
        >
            <div className="banner-header">
                {icons[variant]}
                <p className="banner-title" style={{ color: titleColors[variant] }}>{title}</p>
            </div>
            {children && <p className="banner-description">{children}</p>}
        </div>
    )
}