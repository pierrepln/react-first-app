/*
*		Made for Akkroo Code Task
*		Sun 21st February 2016
*
*		Made with <3 by Pierre Plantié
*/

import React from 'react';
import EventAttendeeList from '../components/EventAttendeeList';
import DataCapture from '../components/DataCapture';
import MailDispatch from '../components/MailDispatch';
import Thanks from '../components/Thanks';
import Save from '../components/Save';
import Reset from '../components/Reset';

/*
  A - Event Attendee List		---	A list of the attendees (from the sample data)
  B - Data Capture (Page 1)	---	A simple form that collects the user’s email address
  C - Data Capture (Page 2)	---	A simple form that collects a postcode, a checkbox which a user ticks if they consent to receive emails, and a field that displays the CustomerID field stored on file
  D - Mail Dispatch					---	Sends an email to the user if they have opted­in to receive emails
  E - Thanks								---	Displays a simple “thanks for signing up” message to the user
  X - Save									---	`console.log`s the details captured from/about the user (in a real­world, this component might persist data to a database) ● We would expect to see properties ‘email’, ‘postcode’, ‘optedIn’
  F - Reset									---	Resets the application ready for the next user
*/

export default class Task1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameSelection = this.handleNameSelection.bind(this);
    this.handleDataSubmit = this.handleDataSubmit.bind(this);
    this.handleFlush = this.handleFlush.bind(this);
    this.next_step = this.next_step.bind(this);
    this.state = {
      step: 'A',
      name: '',
      customerID: '',
      email: '',
      postcode: '',
      optedIn: true,
      message: 'thanks for signing up'
    };
  }

  next_step() {
    switch(this.state.step) {
      case 'A':
        this.setState({step: 'B'});
        break;
      case 'B':
        this.setState({step: 'C'});
        break;
      case 'C':
        this.setState({step: 'D'});
        break;
      case 'D':
        this.setState({step: 'E'});
        break;
      case 'E':
        this.setState({step: 'X'});
        break;
      case 'X':
        this.setState({step: 'F'});
        break;
      case 'F':
        this.setState({step: 'A'});
        break;
    }
  }

  handleNameSelection(n) {
    this.setState({
      name: n.name,
      // Optimistically set an id on the new comment. It will be replaced by an
      // id generated by the server. In a production application you would likely
      // not use Date.now() for this and would have a more robust system in place.
      customerID: n.customerID ? n.customerID : Date.now(),
      email: n.email
    });
    this.next_step();
  }

  handleDataSubmit() {
    // this.setState({
    //   email: '',
    //   postcode: '',
    //   optedIn: false
    // });
    this.next_step();
  }

  handleFlush() {
    this.setState({
      step: 'A',
      name: '',
      customerID: '',
      email: '',
      postcode: '',
      optedIn: false
    });
    this.next_step();
  }

  currentStepView() {
    switch(this.state.step) {
      case 'A':
        return (<EventAttendeeList data={this.props.data} onNameSelection={this.handleNameSelection} />);
        break;
      case 'B':
        return (<DataCapture data={this.state} onDataSubmit={this.handleDataSubmit} />);
        break;
      case 'C':
        return (<DataCapture data={this.state} onDataSubmit={this.handleDataSubmit} />);
        break;
      case 'D':
        return (<MailDispatch data={this.state} onNextStep={this.next_step} />);
        break;
      case 'E':
        return (<Thanks data={this.state} onDone={this.next_step} />);
        break;
      case 'X':
        return (<Save data={this.state} onNextStep={this.next_step} />);
        break;
      case 'F':
        return (<Reset data={this.state} onFlush={this.handleFlush} />);
        break;
    }
  }

  render() {
    return (
      <div>
        {this.currentStepView()}
      </div>
    );
  }

}