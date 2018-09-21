import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const { uniq } = require('lodash');


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


class SelectCapacity extends React.Component {

    static propTypes = {
        listeDesSalles: PropTypes.object.isRequired
    };

    state = {
        capacity: '',
    };

    handleChange = event => {
        this.setState({ capacity: event.target.value });
        this.props.setCapacity(event.target.value)
    };

    render() {
        const { classes } = this.props;

        const listeCapacity = this.props.listeDesSalles
            .map(salle =>
                salle.capacity
            );

        const uniqueListeCapacity = uniq(listeCapacity)
            .map((salle, i) =>
                <MenuItem key={i} value={salle}>{salle}</MenuItem>
            );

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="capacity">Capacité </InputLabel>
                    <Select
                        value={this.state.capacity}
                        onChange={this.handleChange}
                        selected={this.state.capacity}
                        input={<Input name="Capacité" id="capacity" />}
                        autoWidth
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {uniqueListeCapacity}
                    </Select>
                    <FormHelperText>personnes maximum</FormHelperText>
                </FormControl>
            </form>
        );
    };
}

SelectCapacity.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectCapacity);
