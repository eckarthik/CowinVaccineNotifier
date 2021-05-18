import React from 'react';
import { Container, Table, Card } from "react-bootstrap";

const VaccineSessionsTable = (props) => {
    return (
        <Container>
            <Card.Body>
                <Table bordered responsive="sm">
                    <thead>
                        <tr>
                            <th>District Name</th>
                            <th>Hospital Name</th>
                            <th>Address</th>
                            <th>Available Vaccine</th>
                            <th>Minimum Age Limit</th>
                            <th>Fee Type</th>
                            <th>Fee</th>
                            <th>Available Dose 1 Capacity</th>
                            <th>Available Dose 2 Capacity</th>
                            <th>Total Available Capacity</th>
                            <th>Slots</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.vaccineSessions.map(session => <tr key={props.session_id}>
                            <td>{session.district_name}</td>
                            <td>{session.name}</td>
                            <td>{session.address}</td>
                            <td>{session.vaccine}</td>
                            <td>{session.min_age_limit}</td>
                            <td>{session.fee_type}</td>
                            <td>{session.fee}</td>
                            <td>{session.available_capacity_dose1}</td>
                            <td>{session.available_capacity_dose2}</td>
                            <td>{session.available_capacity}</td>
                            <td>{session.slots.join(",")}</td>
                        </tr>)}
                    </tbody>
                </Table>
            </Card.Body>

        </Container>

    )
};

export default VaccineSessionsTable;