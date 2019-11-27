import React from 'react'
import languageContext from './../../contexts/LanguageContext';
import strings from './../../utils/strings'; 
import successContext from './../../contexts/successContext';


 const Congrates =  () =>  {
    const language = React.useContext(languageContext);
    const [success] = successContext.useSuccess();
    if(success){
        return (
            <div data-test="component-congrats">
                <span data-test="congrats-message">
                    {strings.getStringByLang(language, 'congrats')}
                </span>
            </div>
        )
    }

    return (
        <div data-test="component-congrats" />
    )
}

export default Congrates;