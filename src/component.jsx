import React from "react";


/**
 * 
 * ### `Application`
 * 
 * @definition `Application`
 * @type `{React.Component}`
 * @description This component renders the whole application.
 * 
 */
class Application extends React.Component {

	render() {
		return (
			<div className="theme default-theme">
				<h1>This is a new component.</h1>
				<h4>Test it.</h4>
				<h4>Document it.</h4>
				<h4>Customize it.</h4>
				<h4>Share it.</h4>
			</div>
		);
	}

}

// const ApplicationWithI18n = withI18n()(Application); // pass `t` function to Application

// export default ApplicationWithI18n;

export default Application;
