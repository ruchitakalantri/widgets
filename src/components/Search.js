import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Search = () => {

    const [term , setTerm] = useState('programming');
    const [debouncedTerm , setDebouncedTerm] = useState(term);
    const [results , setResults] = useState([]);

    console.log('I run with every render');
    // take search term and call api
    console.log(results);

    // watch  term : state
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        } , 1000);
        // return to cancel timmer
        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    //watch debouncedTerm -- runs whenever we first render our component

    useEffect( () => {

        const search = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                action: 'query' ,
                list:'search' ,
                format: 'json' ,
                origin: '*' ,
                srsearch: debouncedTerm
                },
            }); 
            setResults(data.query.search);
        };

        search();

    } , [debouncedTerm]);


    // useEffect( () => {
    //     console.log('I run after every renderand at initial render');

    //     // Ways : To do request to URL
    //     // https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=proframming
        
    //     // declare helper fun
    //     // Way 1
    //     // const search = async () => {
    //     //     const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
    //     //         params: {
    //     //         action: 'query' ,
    //     //         list:'search' ,
    //     //         format: 'json' ,
    //     //         origin: '*' ,
    //     //         srsearch: term
    //     //         },
    //     //     }); 

    //     //     //update result
    //     //     setResults(data.query.search);
    //     // };

    //     //determine first time useEffect call: render
    //     if (term && !results.length) {
    //         search();
    //     } else {
    //         // if we do not define default search term
    //         const timeoutId = setTimeout ( () => {
    //             if (term) {
    //                 search();
    //             }
    //         } , 1000 );
        
    //         // declare helper fun  and invoke it
    //         // Way 2
    //         // (async () => {
    //         //     await axios.get('agdgg');
    //         // })();

    //         // Way 3
    //         // use of promises
    //         // axios.get('asasas')
    //         //     .then((response) => {
    //         //         console.log(response.data);
    //         //     });

            

    //         return () => {
    //             // CLEANUP function
    //             console.log('CLEANUP');
    //             clearTimeout(timeoutId);

    //         };
    //     }
    // },[term , results.length]);

    const renderResults = results.map((result) => {
        return (
            <div key = {result.pageid} className = "item">
                <div className = "right floated content">
                    <a 
                        className = "ui button"
                        href = {`https://en.wikipedia.org?curid=${result.pageid}`}
                    > GO </a>
                </div>
                <div className = "content">
                    <div className = "header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML = {{ __html: result.snippet}}>
                    </span>
                    
                </div>

            </div>
        );
    });


    return (
        <div>
            <div className = "ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input 
                        value = {term}
                        onChange = {e => setTerm(e.target.value) }
                        className="input"/>
                </div>
            </div>
            <div className = "ui celled list">
                {renderResults}
            </div>
        </div>
    )
};

export default Search;