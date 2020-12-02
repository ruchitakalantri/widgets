import {useEffect , useState } from 'react';

const Route = ({path , children}) => {

    // UPDATE ROUTE
    const [currentPath , setCurrentPath] = useState(window.location.pathname);


    useEffect( () => {
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        // ADD EVENT LISTENER
        window.addEventListener('popstate', onLocationChange);

        // REMOVE EVENT LISTENER
        return () => {
            window.removeEventListener('popstate', onLocationChange);
        }

    }, []);


    return currentPath === path ? children : null;
};



export default Route;