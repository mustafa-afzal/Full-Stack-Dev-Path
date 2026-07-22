import clsx from 'clsx'

export default function Badge(props) {

    const isPill = props.variant.toLowerCase() === 'pill'

    const styles = {
        red: { backgroundColor: '#FEE2E2', color: '#991B1B' },
        grey: { backgroundColor: '#F3F4F6', color: '#1F2937' },
        yellow: { backgroundColor: '#FEF3C7', color: '#92400E' },
        green: { backgroundColor: '#D1FAE5', color: '#065F46' },
        blue: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
        indigo: { backgroundColor: '#E0E7FF', color: '#3730A3' },
        purple: { backgroundColor: '#EDE9FE', color: '#5B21B6' },
        pink: { backgroundColor: '#FCE7F3', color: '#9D174D' }, 
    }

    return (
        <div className={clsx('badge', isPill && 'pill', !isPill && 'square')}
             style={styles[props.color]}
        >
            {props.children}
        </div>
    )
}