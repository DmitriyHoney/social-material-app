import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {getAuthStateUserSelector} from "../utils/selectors";

let mapStateToProps = state => ({
    isAuth: getAuthStateUserSelector(state) //Использовать Selectors
});

export const withLoginRedirect = Component => {


    class RedirectComponent extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            if(this.props.isAuth) return<Component {...this.props}/>
            else return<Redirect to={'/login'}/>
        }
    }

    return connect(mapStateToProps, {})(RedirectComponent)

}


