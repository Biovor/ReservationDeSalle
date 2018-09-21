import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import SelectCapacity from "./components/SelectCapacity.component";
import SelectEquipements from "./components/SelectEquipements.component";
import ModalResa from "./components/ModalResa.component";
import DateSelect from './components/DateSelect.component';


const RESA_URL = "/reservation";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            capacity: '',
            equipement: '',
            dateResa: new Date(),
            listeDesSalles:[],
        };

        this.setDateResa = this.setDateResa.bind(this)
    };

    setDateResa(dateResa) {
        this.setState({
            dateResa
        })
    };

    setCapacity = capacity => {
        this.setState({
            capacity
        })
    };

    setEquipement = equipement => {
        this.setState({
            equipement
        })
    };

    setListe(liste){
        this.setState({
            listeDesSalles : liste
        })
    };

    componentDidMount() {
        fetch(RESA_URL)
            .then(response =>response.json()
            )
            .then(salles => {
                this.setState({
                    listeDesSalles: salles.rooms
                });
            })
    };

    checkReservedToday(dateStartResa){
        return moment(this.state.dateResa).isSame(dateStartResa, 'day');
    };

    shouldKeepDate(dateStartResa, resaDuration){
        const dateStartPreResa = moment(dateStartResa).subtract(20, 'minutes')._d;
        const dateEndResa = moment(dateStartResa).add(resaDuration, 'minutes')._d;
        return moment(this.state.dateResa).isBetween(dateStartPreResa, dateEndResa, 'minutes') !== true;
    };

    shouldKeepCapacity(capacity){
        return this.state.capacity ? capacity === this.state.capacity : true
    };

    shouldKeepEquipement(equipements){
        return this.state.equipement ? equipements.find( equipement => equipement.name === this.state.equipement ): true
    };

    renderListeSallesDispo(){

        const listeSallesDispo = this.state.listeDesSalles
            .filter(salle =>{
                return (
                    (this.shouldKeepDate(salle.reservedThe, salle.reservationDuration))
                )
            })
            .filter(salle =>{
                return (
                    (this.shouldKeepCapacity(salle.capacity) && (this.shouldKeepEquipement(salle.equipements)))
                )
            })
            .map((salle, i) =>
                <div key={i}>
                    <ListItem>
                        <Avatar>
                            <span>{salle.capacity}</span>
                        </Avatar>
                        <ListItemText primary={salle.name} secondary={
                            this.checkReservedToday(salle.reservedThe) === true
                                ? <span>réservée à {moment(salle.reservedThe).format('H:mm')}</span>
                                : <span>Disponible</span>} />
                    </ListItem>
                    <ModalResa
                        salleName = {salle.name}
                        dateResa = {this.state.dateResa}
                        setListe = {this.setListe}
                        componentDidMount = {this.componentDidMount}
                    />
                    <li>
                        <Divider inset />
                    </li>
                </div>
            );
        return <List>{listeSallesDispo}</List>
    };

    render() {
        return (
            <div className="App">
                <div>
                    <DateSelect
                        setDateResa={this.setDateResa}
                    />
                    <SelectCapacity
                        setCapacity={this.setCapacity}
                        listeDesSalles = {this.state.listeDesSalles}
                    />
                    <SelectEquipements
                        setEquipements={this.setEquipement}
                        listeDesSalles = {this.state.listeDesSalles}
                    />
                </div>
                <div  className={'ListItemText'}>{this.renderListeSallesDispo()}</div>
            </div>
        );
    };
}

export default App;
