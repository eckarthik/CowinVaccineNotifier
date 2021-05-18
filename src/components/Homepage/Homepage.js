import React, { Component } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';
import classes from './Homepage.module.css';
import axios from '../../axios';
import VaccineSessionsTable from '../VaccineSessionsTable/VaccineSessionsTable';
import Loading from '../Loading/Loading';
import ErrorCard from "../Error/Error";

class Homepage extends Component {
    state = {
        states: [],
        districts: [],
        selectedStateId: 1,
        selectedDistrictId: 3,
        vaccineSessions: [],
        vaccineSessionsNotFound: false
    }

    tableRef = React.createRef();
    notificationSound = new Audio("https://freesound.org/data/previews/171/171671_2437358-lq.mp3");

    getVaccineSlotsForSelectedDistrict = () => {
        axios.get("v2/appointment/sessions/public/findByDistrict?district_id=" + this.state.selectedDistrictId + "&date=17-05-2021")
        .then(response => response.data)
        .then(response => {
            if (response.sessions.length === 0) {
                this.setState({ vaccineSessionsNotFound: true, vaccineSessions: [], loading: false });
            }
            else {
                let currentSessionsInState = [...this.state.vaccineSessions];
                if(JSON.stringify(currentSessionsInState) !== JSON.stringify(response.sessions)) {
                    this.notificationSound.volume = 0.7;
                    this.notificationSound.play()
                }
                this.setState({ vaccineSessionsNotFound: false, vaccineSessions: response["sessions"], loading: false });
            }
        });

        
    } 

    componentDidMount() {
        axios.get("v2/admin/location/states")
            .then(response => response.data)
            .then(response => {
                this.setState({ states: response["states"] });
            });
        axios.get("v2/admin/location/districts/1")
            .then(response => response.data)
            .then(response => {
                this.setState({ districts: response["districts"] });
            });
        
    }

    componentWillUnmount() {
        clearInterval(this.checkAgain);
    }

    handleStateSelection = (event) => {
        this.setState({ selectedStateId: event.target.value });
        //Loading districts for the selected state
        axios.get("v2/admin/location/districts/" + event.target.value)
            .then(response => response.data)
            .then(response => {
                this.setState({ districts: response["districts"] });
            });
    }

    handleDistrictSelection = (event) => {
        this.setState({ selectedDistrictId: event.target.value });
    }

    searchVaccineSlots = (event) => {
        clearInterval(this.checkAgain);
        this.checkAgain = setInterval(() => {
            this.setState({loading:true});
            this.getVaccineSlotsForSelectedDistrict();
        },60000);
        this.setState({ loading: true });
        this.tableRef.current.scrollIntoView()
        axios.get("v2/appointment/sessions/public/findByDistrict?district_id=" + this.state.selectedDistrictId + "&date=17-05-2021")
            .then(response => response.data)
            .then(response => {
                if (response.sessions.length === 0) {
                    this.setState({ vaccineSessionsNotFound: true, vaccineSessions: [], loading: false });
                }
                else {
                    this.setState({ vaccineSessionsNotFound: false, vaccineSessions: response["sessions"], loading: false });
                }
            });
    }

    render() {
        let statesOptionsList = this.state.states.map(state => <option key={state.state_id} value={state.state_id}>{state.state_name}</option>);
        let districtsOptionsList = this.state.districts.map(district => <option key={district.district_id} value={district.district_id}>{district.district_name}</option>);
        return (
            <>
                <Container>
                    <div className={classes.Heading}>
                        <h1>
                            <span className={classes.RedText}>Vaccine</span> Shot Notifier
                        </h1>
                        <p>Automatically checks the cowin website and notifies you if any slot available</p>
                    </div>
                    <Card className={classes.SearchCard}>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="stateList">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control as="select" onChange={this.handleStateSelection}>
                                        {statesOptionsList}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="districtList">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control as="select" onChange={this.handleDistrictSelection}>
                                        {districtsOptionsList}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group className={classes.SearchButton}>
                                    <Button variant="outline-info" onClick={this.searchVaccineSlots}>Search</Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>

                </Container>
                {/* <Alert style={{width:"70%",margin:"auto"}} variant="primary">Choose the District and hit search. Leave the page open and if the slot is found for your search then you will be notified by a sound</Alert> */}
            
                <div ref={this.tableRef}>
                    {this.state.loading ? <Loading loadingMessage="Fetching data.. Please wait.. " /> : null}
                    {this.state.vaccineSessionsNotFound ? <ErrorCard errorMessage="No slots found for selected District / PinCode" /> : null}
                    {this.state.vaccineSessions.length > 0 ? <VaccineSessionsTable vaccineSessions={this.state.vaccineSessions} /> : null}
                </div>

                <Container>
                    <Card className="mt-5 mb-2">
                        <Card.Body>
                            <div className={classes.HowItWorks}>
                                <h4>How does this work?</h4>
                                <p>Choose the District and hit search. Leave the page open and if the slot is found for your search then you will be notified by a sound</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
                
            </>
        )
    }
};

export default Homepage;