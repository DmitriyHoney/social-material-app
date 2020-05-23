import React from 'react';
import Button from "../Button/Button";
import ButtonGhost from "../ButtonGhost/ButtonGhost";

const Preview = props => {
    return(
        <>
            <div>
                <h3>Кнопки</h3>
                <Button value={'Button'}/>
                <Button value={'Disabled'} disabled/>
                <ButtonGhost value={'Ghost'}/>
                <ButtonGhost value={'Ghost Disabled'} disabled/>
            </div>
            <div>
                <h3>Карточки</h3>
            </div>
        </>
    )
};

export default Preview;