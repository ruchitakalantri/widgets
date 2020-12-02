import React from 'react';

const Link = ({className , href , children}) => {

    const onClick = (event) => {

        // TO OPEN NEW TAB WHEN WE CLICK CMD KEY IN MAC OR CTRL KEY IN WINDOW
        if (event.metaKey || event.ctrlKey) {
            return;
        }

        // PREVENT FULL PAGE RELOAD
        event.preventDefault();

        // CHANGE THE URL : DON'T DO PAGE REFRESH
        window.history.pushState({} , '' , href);

        // CREATE NAVIGATION EVENT
        // TELL COMPONENT THAT URL CHANGED
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return  (
        <a onClick={onClick} href = {href} className =  {className}> 
            {children} 
        </a>
    );

};

export default Link;