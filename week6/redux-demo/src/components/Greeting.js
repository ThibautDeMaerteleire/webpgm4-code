import React from 'react'
import { connect } from 'react-redux';

const Greeting = ({ text }) => <h1>{text}</h1>

const mapStateToProps = (state) => ({ text: state.greeting.text });

export default connect(mapStateToProps)(Greeting)