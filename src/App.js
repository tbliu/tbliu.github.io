import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="index">
        <header className="body">
          <h1 className="title">Timothy Liu</h1>
            <br />
            <p className="sub-header">Education</p>
            <p>University of California, Berkeley</p>
            <p>Computer Science</p>
            <p>Class of 2020</p>
            <br />
            <p className="sub-header">Experience</p>
            <p><a href="https://www.shell.com/energy-and-innovation/innovating-together/shell-techworks.html" target="_blank">Shell TechWorks</a></p>
            <p><a href="https://swarmlab.berkeley.edu/home" target="_blank">The Ubiquitous SWARM Lab</a></p>
            <br />
            <p className="sub-header">Organizations</p>
            <p><a href="https://uav.berkeley.edu/" target="_blank">UAVs@Berkeley</a></p>
            <p><a href="http://callaunchpad.org/#/" target="_blank">Launchpad</a></p>
            <p><a href="https://csmberkeley.github.io/#/" target="_blank">Computer Science Mentors</a></p>
            <br />
            <p className="sub-header">Miscellaneous</p>
            <p><a href="../public/timothy_liu_resume.pdf" target="_blank">Resume</a></p>
            <p><a href="https://github.com/tbliu" target="_blank">GitHub</a></p>
            <p>Thoughts</p>
        </header>
      </div>
    );
  }
}

export default App;
