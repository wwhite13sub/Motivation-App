import React, { Component } from 'react';
import './Motivation.css';
import moment from 'moment'

class Motivational extends Component {
    /* constructor */
    constructor(props) {
        super(props);
        this.state = {
            overlayFormShow:false,          
            error: '',
            dateEntry: moment().format('YYYY-MM-DD'),
            motivationEntry: 'Select',
            journalEntry: '',
            motivations: [
                "Great",
                "Good",
                "Ok",
                "Not So Great"
            ],
            entries: [],
            editMode: false,
            currentEntryIndex: 0
        };      
    }

    render() {
        return (
            <>            
                <div className="container tables">        
                    <button className="Adding" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button">Add Day</button>
                        <table className="table table-hover">
                            <thead>
                                <tr className="headers">
                                <th scope="col"> Date </th>
                                <th scope="col"> Motivation</th>
                                <th scope="col"> Journal</th>
                                <th scope="col"> Edit</th>
                                <th scope="col"> Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
               
            </>
        );
    }
}
export default Motivational;