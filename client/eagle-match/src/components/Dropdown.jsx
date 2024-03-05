function Dropdown({ label, id, open, trigger, menu}){
    return(
        <div className="dropdown">
            <label htmlFor={id}>{label}</label>
            {trigger}
            {open ? (
                <ul className="menu" id={id}>
                    {menu.map((item, index) => (
                        <li key={index} className="menu-item">{item}</li>
                    ))}
                </ul>
            ):null}
        </div>
    )
}

export default Dropdown;