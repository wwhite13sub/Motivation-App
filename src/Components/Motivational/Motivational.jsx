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