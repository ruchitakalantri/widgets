import React, { useState, useEffect , useRef } from 'react';

const Dropdown = ({label , options , selected , onSelectedChange}) => {

    const [open , setOpen] = useState(false);
    const ref = useRef();

// EVENT Listener : 1
    useEffect(() => {

        const onBodyClick = (event) => {
            if (ref.current && ref.current.contains(event.target)) return;

            setOpen(false);
        };

        document.body.addEventListener('click' , onBodyClick);

        // CLEAN UP FUNCTION
        return () => {
            document.body.removeEventListener('click' , onBodyClick);
        };
    } , []);

    const renderedOptions = options.map((option) => {

    if (option.value === selected.value) {
            return null;
    }

    //// EVENT Listener : 2
    return (
         <div 
            key = {option.value} 
            className="item"
            onClick = {() => {
                console.log('ITEM CLICK !!!');
                onSelectedChange(option);
            }}
        > 
            {option.label}
         </div>
     )  ; 
    });

    console.log(ref.current);

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">
                {label}
                </label>

                {/* // EVENT Listener : 3 */}
                <div 
                    onClick={() => {
                        console.log('DROPDOWN CLICK !!!!');
                        setOpen(!open);
                    }} 
                    className={`ui selection dropdown ${open ? 'visible active' : ''}`}>
                    <i className="dropdown icon">
                    </i>
                    <div className="text">
                        {selected.label}
                    </div>
                    <div className={`menu ${open ? 'visible transition' : '' } `} >
                    {renderedOptions}
                    </div>
                </div>

                {/* <label className="label"  style={{ color: selected.value }}>
                    {selected.value}
                </label> */}

            </div> 

        </div>
    );
};

export default Dropdown;