import React from 'react'
import propTypes from 'prop-types';


const languages = [    
{ code: 'en', symbol: '🇺🇸' },
{ code: 'emoji', symbol: '😊' }
];

 function LanguagePicker({setLanguage}) {
    return (
        <div data-test='language-picker'>
            {languages.map(elem => (
            <span 
                data-test='language-icon' 
                key={elem.code}
                onClick={() => setLanguage(elem.code)}
                >
                    {elem.symbol}
            </span>
                ))}
        </div>
    )
}
LanguagePicker.propTypes = {
    setLanguage: propTypes.func.isRequired
}

export default LanguagePicker