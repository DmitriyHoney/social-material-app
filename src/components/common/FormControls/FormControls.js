import React from "react";
import s from "./FormControls.module.css";

const createCustomField = Component => ({input, meta, ...props}) => {
    let hasError = meta.touched && meta.error;
    return(
        <div className={s.formControl + ` ` + (hasError ? s.error : ``) }>
            <div>
                <Component {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    );

};

export const CustomInput = createCustomField("input");
export const CustomTextarea = createCustomField("textarea");