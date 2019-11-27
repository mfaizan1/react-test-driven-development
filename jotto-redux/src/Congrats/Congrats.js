import React from 'react'
import PropTypes from 'prop-types'

 const Congrates =  (props) =>  {

    if(props.success){
        return (
            <div data-test="component-congrats">
                <span data-test="congrats-message">
                    Congrats! you guessed the right word.
                </span>
            </div>
        )
    }

    return (
        <div data-test="component-congrats" />
    )
}

Congrates.propTypes = {
    success: PropTypes.bool.isRequired
}

export default Congrates;