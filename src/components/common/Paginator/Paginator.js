import React, {useState} from 'react';
import Pagination from "react-js-pagination";
import s from './Paginator.module.scss';


const Paginator = props => {

    const [activePage, setActivePage] = useState(1);

    let handlePageChange = pageNumber => {
        setActivePage(pageNumber);
        props.onChange(pageNumber)
    }

    let classesForPagination = {
        innerClass: s.innerClass,
        activeClass: s.activeClass,
        activeLinkClass: s.activeLinkClass,
        itemClass: s.itemClass,
        itemClassFirst: s.itemClassFirst, 
        itemClassPrev: s.itemClassPrev,
        itemClassNext: s.itemClassNext,
        itemClassLast: s.itemClassLast, 
        disabledClass: s.disabledClass,
        linkClass: s.linkClass,
        linkClassFirst: s.linkClassFirst,
        linkClassPrev: s.linkClassPrev,
        linkClassNext: s.linkClassNext,
        linkClassLast: s.linkClassLast
    }


    return (
        <div>
            <Pagination
                {...props}
                activePage={activePage}
                onChange={handlePageChange}
                {...classesForPagination}
            />
        </div> 
    )

};

export default Paginator;