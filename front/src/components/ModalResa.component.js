import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import NavigationIcon from '@material-ui/icons/Navigation';
import PropTypes from 'prop-types'
import moment from 'moment';

import './../App.css';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },

    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 10,
    },
});

class SimpleModal extends React.Component {
    static propTypes = {
        salleName: PropTypes.string.isRequired,
        dateResa: PropTypes.object.isRequired,
    };

    state = {
        open: false,
        durationResaHeure:'00:00',
    };

    handleOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    setDurationResaHeure = (event) => {
        this.setState({durationResaHeure: event.target.value});
    };

    sendReservation = () => {
        fetch("/reservation", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                name: this.props.salleName,
                reservedThe: this.props.dateResa,
                reservationDuration: moment.duration(this.state.durationResaHeure).asMinutes()
            })
        })
            .then(response => response.json()
            )
            .then(listeDesSalles => {
                {
                    this.props.setListe(listeDesSalles.rooms),
                        this.props.componentDidMount
                }
            });
        this.handleClose()

    };

    render() {
        const { classes } = this.props;
        return (
            <div className='Form'>
                <Button size={"small"}  onClick={this.handleOpen} variant="extendedFab" aria-label="Delete" className={classes.button}>
                    <NavigationIcon className={classes.extendedIcon} />
                    RESERVER
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div  style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Réservation de la {this.props.salleName}
                        </Typography>

                        <form className={classes.container} noValidate>
                            <TextField
                                id="time"
                                label="Durée de la réservation"
                                type="time"
                                defaultValue="00:00"
                                className={classes.textField}
                                onChange={this.setDurationResaHeure}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                            />
                        </form>
                        <Button onClick={this.sendReservation} variant="contained" color="primary" className={'btnRight'}>
                            RESERVER
                            <SendIcon className={classes.rightIcon}/>
                        </Button>
                    </div>
                </Modal>
            </div>
        );
    };
}
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;