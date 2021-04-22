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
    /* Methods */


     //Commands for Modal Section//
     hidingOverlayForm = () => {
        this.setState({
            overlayFormShow: false,
            editMode: false,
        });
    }
    showOverlayForm = () => {
        this.setState({
            overlayFormShow: true
        });
    }
    displayError = () => {
        if(!this.state.error.length) {
            return;
        }
        return (
            <div className="alert alert-danger mt-2" role="alert">
                {this.state.error}
            </div>
        );
    }

    controlFormVisibility = () => {
        if (!this.state.overlayFormShow) {
            return;
        }
        return(
           <>            
            {/* Modal */}
            <div  id="overlay-form" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <form className="list">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel"> Motivation day</h5>
                        </div>
                        <div className="modal-body">
                        <div>
                            <label htmlFor="add-date">Date: </label>
                            <input 
                                type="date" maxLength="10" placeholder="MM/DD/YYYY" 
                                id="add-date" className="form-control"
                                onChange
                                value
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="add-date">Motivation: </label>
                            <div className="choice">
                            
                                <option>Select</option>
                                                               
                            </select>
                            </div>
                        </div>
                        <div>                        
                            <label htmlFor="journal-Entry">Journal Entry</label>
                            <input
                                maxLength ="50"  id="journal-Entry"
                                type="task" className="form-control" placeholder="what is on your mind" 
                                value=
                            />
                        </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick= >Cancel</button>
                    <button type="submit" className="btn btn-success" onClick=</button>
                  </div>
                  {this.displayError()}
                  </form>
                </div>
              </div>
            </div>            
            </>
         );
    }

    render() {
        return (
            <>            
                <div className="container tables">        
                    <button className="Adding" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" >Add Day</button>
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
                { this.controlFormVisibility() }
            </>
        );
    }
}
export default Motivational;