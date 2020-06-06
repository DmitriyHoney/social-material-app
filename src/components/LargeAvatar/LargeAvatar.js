import React, {useState} from 'react';
import s from './LargeAvatar.module.scss';
import defaultUser from '../../assets/images/default-user.jpg';
import cn from 'classnames';

class LargeAvatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPreload: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) { //Когда отправили запрос на изменение картинки показываем preloader
        if (prevProps !== this.props) {
            this.setState({isPreload: false});
            return true;
        }
    }

    handleInput = (e) => {
        this.setState({isPreload: true});
        if (e.target.files.length > 0) {
            this.props.setNewProfilePhoto(e.target.files[0]);
        }
    };




    render() {

        let editBtn = (<div className={s.overlay}>
            <div className={s.wrapForInput}>
                <label className={s.label} htmlFor="file">Edit</label>
                <input type="file" id="file" onChange={this.handleInput}/>
            </div>
        </div>);

        if (this.state.isPreload) {
            return<div className={s.avatar}>
                <div>Load...</div>
            </div>
        }
        return (
            <div className={s.avatar}>
                <img src={this.props.src || defaultUser} alt="avatar"/>
                {this.props.itsMe && editBtn}
            </div>
        )
    }
}

export default LargeAvatar;