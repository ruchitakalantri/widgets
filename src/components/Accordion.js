import { render } from '@testing-library/react';
import React, { useState } from 'react';

// CLASS BASED
// class Accordion extends Component {

// state = {activeIndex : 0}
//     onTitleClick() {
//         console.log('title clicked')
//          this.setState({ activeIndex : index });
//     }

//     renderItems() {
            // return this.propsitems.map((itm,index) => {
            //     return (
            //         <React.Fragment key = {item.title}>
            //         <div 
            //             className = "title active"
            //             onClick = {() => this.onTitleClicked(index)}
            //         >
            //             <i className = "dropdown icon"></i>
            //             {item.title}
            //         </div>
            //         <div className = "content active">
            //              <p> {item.content} </p>
            //         </div>
            //     </React.Fragment> 
            //     )
            // })

            // render() {
            //     return (
            //         <div className = "ui styled accordion">
            //             {this.renderedItems()}
            //             <h1> {this.state.activeIndex }</h1>
            //         </div>
            //     );
            // }
//     }
// }


// function component

const Accordion = ({items}) => {

    // useState is premative hook
    // array destructuring 
    // eg const colors = ['red' , 'green']
    // const redColor = colors[0]
    //const greenColor = colors[1]
    // three line of code
    // insted use only single line code 
    // const [firstElement , secondElement] = colors

    // useState : Returns a stateful value, and a function to update it.
    

    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClicked = (index) => {
        console.log('Title clicked',index);
        // when you rerender then default value will be fall away
        //  active index value changes here
        setActiveIndex(index);
    }

    const renderedItems = items.map((item, index) => {

        // active class name
        const active = index === activeIndex ? 'active' : '';
        return (
            <React.Fragment key = {item.title}>
                <div 
                className = {`title ${active}`}
                onClick = {() => onTitleClicked(index)}>
                    <i className = "dropdown icon"></i>
                    {item.title}
                </div>
                <div className ={`content ${active}`}>
                     <p> {item.content} </p>
                </div>
            </React.Fragment>
        );
    });

    return (
        <div className = "ui styled accordion">
            {renderedItems}
            <h1> {activeIndex}</h1>
        </div>
    );
};

export default Accordion ;