import Datetime from 'react-datetime';
import React, {Component} from "react";
import moment from 'moment/locale/fr-ca';

const yesterday = Datetime.moment().subtract( 1, 'day' )
const valid = function( current ) {
    return current.isAfter(yesterday)
};

class DateSelect extends Component {

    setDate = event => {
        const dateResa = event._d;
        this.props.setDateResa(dateResa)
    };

    render() {
        return (
            <div>
                <Datetime
                    defaultValue = {new Date()}
                    local="fr-ca"
                    isValidDate={ valid }
                    disableOnClickOutside={true}
                    input={false}
                    onChange={this.setDate}
                />
            </div>
        );
    };
}

export default DateSelect