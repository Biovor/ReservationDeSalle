import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
const { uniq, flatten } = require('lodash');

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

class SelectEquipements extends React.Component {
    static propTypes = {
        listeDesSalles: PropTypes.object.isRequired
    };

    state = {
        equipements: '',
    };

    handleChange = event => {
        this.setState({ equipements: event.target.value });
        this.props.setEquipements(event.target.value)
    };

    render() {
        const { classes } = this.props;

        const listeEquipements = this.props.listeDesSalles
            .map(salle =>
                salle.equipements
                    .map(equipement => equipement.name)
            );

        const uniqueListeEquipements = uniq(flatten(listeEquipements))
            .map((salle, i) =>
                <MenuItem key={i} value={salle}>{salle}</MenuItem>
            );

        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="equipements">Équipement </InputLabel>
                    <Select
                        value={this.state.equipements}
                        onChange={this.handleChange}
                        selected={this.state.equipements}
                        input={<Input name="Equipement" id="equipements" />}
                        autoWidth
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {uniqueListeEquipements}
                    </Select>
                    <FormHelperText>Équipement présent</FormHelperText>
                </FormControl>
            </form>
        );
    };
}

SelectEquipements.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectEquipements);