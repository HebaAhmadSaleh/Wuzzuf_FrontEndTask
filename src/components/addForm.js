import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormGroup from 'react-bootstrap/lib/FormGroup'

export default class AddForm extends React.Component {
    constructor() {
        super();
        this.state = {
            feedName: "",
            feedUrl: "",
            isValid:true
        }
    }

    updateProperty(propertyname, e) {
        if (propertyname === "feedName")
            this.setState({ feedName: e.target.value })
        else if (propertyname === "feedUrl")
            this.setState({ feedUrl: e.target.value })

    }
    save() {
        let nameError = this.state.errors,
         isValidUrl =  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

         let res = isValidUrl.test(this.state.feedUrl);
        if (this.state.feedName && this.state.feedUrl && res) {
            this.setState({ isValid: true })
            this.addFeed();
            this.clearForm();
        } 
         else {
            this.setState({ isValid: false })
        }
    
    }
     clearForm(){
        this.setState({feedName:'',feedUrl:''});
    }
    addFeed(){
          let createdObj={};
    createdObj.feedName = this.state.feedName;
    createdObj.feedUrl = this.state.feedUrl;
        this.props.addFeed(createdObj);
    }

   renderValidationText() {
      if( !this.state.isValid) 
      return(
          <h3 style={{color:'red'}}> Fill the Form please </h3>
      ); 
   }
    render() {
        let state = this.state;



        return (
            <div className="container">
                <div className=" col-xs-8"  style={{ margin: 50 ,}}  >

                    <div className="panel panel-primary ">
                        <div className="panel-heading">  <h1> Add New Feed </h1> </div>
                        <div className="panel-body">

             {this.renderValidationText() } 
                                <ControlLabel>Feed Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={state.feedName}
                                    onChange={this.updateProperty.bind(this, 'feedName')}
                                /> <br />
                           
                                <ControlLabel>Feed URL</ControlLabel>

                                <FormControl
                                    type="text"
                                    value={state.feedUrl}
                                    onChange={this.updateProperty.bind(this, 'feedUrl')}
                                /> <br />
                                <button type="button" className="btn btn-info col-xs-2" onClick={() => this.save()}>Add Feed</button>
                         
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}



