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
            filteredEntries: [],
            editMode: false,
            currentEntryId: 1,
            filter: 'Show All'
        };      
    }

    /* Methods */
    //Will save journal entries on refresh //
    componentDidMount = () => {
        let storageEntries = localStorage.getItem('entries');
        if (!storageEntries || !storageEntries.length) {
            return;
        }

        this.setState({
            entries: JSON.parse(storageEntries),
            filteredEntries: JSON.parse(storageEntries)
        });
    }
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
    getMotivationOptions = () => {
        if (!this.state.motivations.length) {
            return;
        }

        const options = this.state.motivations.map((motivation, index) => {
            return <option key={index}>{motivation}</option>
        });

        return options;
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
                            <h5 className="modal-title" id="staticBackdropLabel">{this.state.editMode?'Editing':'Adding'} Motivation day</h5>
                        </div>
                        <div className="modal-body">
                        <div>
                            <label htmlFor="add-date">Date: </label>
                            <input 
                                type="date" maxLength="10" placeholder="MM/DD/YYYY" 
                                id="add-date" className="form-control"
                                onChange={this.updateDateEntry}
                                value={this.state.dateEntry}
                                disabled={this.state.editMode?true:false}
                            />
                        </div>
                        <div>
                            <label htmlFor="add-date">Motivation: </label>
                            <div className="choice">
                            <select onChange={this.updateMotivationEntry} value={this.state.motivationEntry} disabled={this.state.editMode?true:false}>
                                <option>Select</option>
                                {this.getMotivationOptions()}                                
                            </select>
                            </div>
                        </div>
                        <div>                        
                            <label htmlFor="journal-Entry">Journal Entry</label>
                            <input
                                maxLength ="50" onChange={this.updateJournalEntry} id="journal-Entry"
                                type="task" className="form-control" placeholder="what is on your mind" 
                                value={this.state.journalEntry}
                            />
                        </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick= {this.cancelJournal}>Cancel</button>
                    <button type="submit" className="btn btn-success" onClick={this.editOrAddJournal}>{this.state.editMode?'Save':'Add'}</button>
                  </div>
                  {this.displayError()}
                  </form>
                </div>
              </div>
            </div>            
            </>
         );
    }
     cancelJournal = () => {
         this.resetForm();
         this.hidingOverlayForm();
    }
    updateJournalEntry = (e) => {
         this.setState({
            journalEntry: e.target.value
         })
    }
     updateDateEntry = (e) => {
        this.setState({
            dateEntry: e.target.value
        })
    }
    updateMotivationEntry = (e) => {
        this.setState({
            motivationEntry: e.target.value
        })
    }
    removeItem = (entryId) => {
        const updatedEntries = this.state.entries.filter((entry) => {
            return entry.id !== entryId;
        });
        this.updateEntries(updatedEntries);
    }
    editItem = (entryId) => {
        let editEntry = this.state.entries.filter((entry) => {
            return entry.id === entryId;
        });//editEntry = [{}] [{}, {}, {}]
        this.setState({
            dateEntry: editEntry[0].dateEntry,
            motivationEntry: editEntry[0].motivationEntry,
            journalEntry: editEntry[0].journalEntry,
            editMode: true,
            currentEntryId: entryId
        });
        this.showOverlayForm();
    }
    editOrAddJournal = (e) => {
        e.preventDefault();

        //validation for all inputs //
        if ( (!this.state.journalEntry.trim())
            || (this.state.journalEntry.trim().length === 0)
            || (!this.state.dateEntry)
            || (!this.state.motivationEntry)
        ) {
            this.setState({
                error: 'All entries required.'
            });
            return;
        }

        //validation for journalEntry //
        if (this.state.journalEntry.trim().length > 50) {
            this.setState({
                error: 'Can not be more than 50 characters long'
            });
            return;
        }

        //validation for motivation select
        if (this.state.motivations.indexOf(this.state.motivationEntry) === -1) {
            this.setState({
                error: 'Please select a valid motivation'
            });
            return;
        }

        //validate the date
        let aDate   = moment(this.state.dateEntry, 'YYYY-MM-DD', true);
        let isValid = aDate.isValid();
        if (!isValid) {
            this.setState({
                error: 'Please enter a valid date'
            });
            return;
        }

        this.setState({
            error: ''
        });


        let existingEntries = this.state.entries.slice();
        existingEntries.sort((a, b) => (a.id > b.id) ? 1 : -1);
        if (!this.state.editMode) {
            let id = 1;
            if (existingEntries.length) {
                const lastEntry = existingEntries[existingEntries.length - 1];
                id = lastEntry.id + 1;
            }
            console.log(id, existingEntries);
            existingEntries.push({
                id: id,
                dateEntry: this.state.dateEntry,
                motivationEntry: this.state.motivationEntry,
                journalEntry: this.state.journalEntry.trim()
            });
        } else {
            existingEntries.forEach((existingEntry, index) => {
                if (existingEntry.id === this.state.currentEntryId) {
                    existingEntries[index].journalEntry = this.state.journalEntry.trim();
                }
            });
        }
        
        this.hidingOverlayForm();
        this.updateEntries(existingEntries);
        this.resetForm();
        
    }
    //will not save old entries on modal //
    resetForm = () => {
        this.setState({
            dateEntry: moment().format('YYYY-MM-DD'),
            motivationEntry: 'Select',
            journalEntry: '',
            editMode: false,
            error: ''
        });
    }
    updateEntries = (updatedEntries) => {
        updatedEntries.sort((a, b) => (a.dateEntry < b.dateEntry) ? 1 : -1);

        this.setState({
            entries: updatedEntries
        });
        localStorage.setItem('entries', JSON.stringify(updatedEntries));

        this.updateFilteredEntries(updatedEntries);
    }

    updateFilteredEntries = (updatedEntries) => {
        let filteredEntries = [];

        switch (this.state.filter) {
        case 'Great':
            filteredEntries = updatedEntries.filter((updatedEntry) => {
                return updatedEntry.motivationEntry === 'Great';
            });
            break;
        case 'Good':
            filteredEntries = updatedEntries.filter((updatedEntry) => {
                return updatedEntry.motivationEntry === 'Good';
            });
            break;
        case 'Ok':
            filteredEntries = updatedEntries.filter((updatedEntry) => {
                return updatedEntry.motivationEntry === 'Ok';
            });
            break;
        case 'Not So Great':
            filteredEntries = updatedEntries.filter((updatedEntry) => {
                return updatedEntry.motivationEntry === 'Not So Great';
            });
            break;
        default:
            filteredEntries = updatedEntries.slice();
        }
        this.setState({
            filteredEntries: filteredEntries
        });
    }
    getEntries = () => {
        if (!this.state.filteredEntries.length) {
            return;
        }

        const entriesMarkup = this.state.filteredEntries.map((entry, index) => {
            return (
                
                <tr key={index}>
                    <td>{moment(entry.dateEntry).format('MM/DD/YYYY')}</td>
                    <td>{entry.motivationEntry}</td>
                    <td>{entry.journalEntry}</td>
                    <td><button className="process1" onClick={(e) => this.editItem(entry.id)}>Edit</button></td>
                    <td><button className="process" onClick={(e) => this.removeItem(entry.id)}>Delete</button></td>
                </tr>
               
            )
        });


        return entriesMarkup;
    }
    openAddForm = () => {
        this.resetForm();
        this.showOverlayForm();
    }
    makeFilters = () => {
        if (!this.state.motivations.length) {
            return;
        }

        const filterMarkup = this.state.motivations.map((motivation, index) => {
            return (
                <button 
                    className={this.state.filter===motivation? 'px-4 py-1 mx-3 bg-primary text-white': 'px-4 py-1 mx-3'} key={index}
                    onClick={(e) => this.applyFilter(motivation)}
                >
                    {motivation}
                </button>
            )
        });

        return filterMarkup;
    }

    applyFilter = (targetMotivation) => {
        this.setState({
            filter: targetMotivation
        }, () => {
            this.updateFilteredEntries(this.state.entries);
        })
    }
    /* render */
    render() {
        return (
            <>            
                <div className="container tables back-image">        
                    <button className="Adding px-4 py-1 mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" onClick={this.openAddForm}>Add Day</button>
                    <div className="text-center mb-3 ">
                        <button 
                            className={this.state.filter==='Show All'? 'px-4 py-1 mx-3 bg-primary text-white': 'px-4 py-1 mx-3'}
                            onClick={(e) => this.applyFilter('Show All')}
                        >
                            Show All
                        </button>
                        {this.makeFilters()}
                    </div>
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
                            {this.getEntries()}
                        </tbody>
                    </table>
                </div>
                { this.controlFormVisibility() }
            </>
        );
    }
}
export default Motivational;