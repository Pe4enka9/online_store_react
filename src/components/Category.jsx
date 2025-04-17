export default function Category({name, onClick}) {
    return (
        <div className="category" onClick={onClick}>
            <h3>{name}</h3>
        </div>
    )
}