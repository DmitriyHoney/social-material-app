import React from "react";
import s from "./SocialBlock.module.scss";

const SocialBlock = props => {
    function getSocialArray(obj) {
        let result = [];
        let i = 0;
        for (let key in obj) {
            if (obj[key] !== null && obj[key] !== "") {
                switch (key) {
                    case 'facebook':
                        result.push(<li key={i++}><a href={`${obj[key]}`}><i className={`fa fa-facebook`}></i></a></li>);
                        break;
                    case 'website':
                        result.push(<li key={i++}><a href={`${obj[key]}`}><i className={`fa fa-desktop`}></i></a></li>);
                        break;
                    case 'vk':
                        result.push(<li key={i++}><a href={`${obj[key]}`}><i className={`fa fa-vk`}></i></a></li>);
                        break;
                    case 'twitter':
                        result.push(<li key={i++}><a href={`${obj[key]}`}><i className={`fa fa-twitter`}></i></a></li>);
                        break;
                    case 'instagram':
                        result.push(<li key={i++}><a href={`${obj[key]}`}><i className={`fa fa-instagram`}></i></a></li>);
                        break;
                    case 'youtube':
                        result.push(<li key={i++}><a href={`${obj[key]}`}><i className={`fa fa-youtube-play`}></i></a></li>);
                        break;
                    case 'github':
                        result.push(<li key={i++}><a href={`${obj[key]}`}><i className={`fa fa-github`}></i></a></li>);
                        break;
                    case 'mainLink':
                        result.push(<li key={i++}><a href={`${obj[key]}`}><i className={`fa fa-address-book-o`}></i></a></li>);
                        break;
                }
            }
        }
        return result;
    }
    let socialList = getSocialArray(props.contacts);

    return (
        <ul className={s.section}>
            {socialList.length > 0 ? socialList : 'Not social links'}
        </ul>
    );
};

export default SocialBlock;