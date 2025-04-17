export default function Category({name, onClick, isActive}) {
    return (
        <div className={`category ${isActive ? 'active' : ''}`} onClick={onClick}>
            <h3>{name}</h3>
        </div>
    )
}