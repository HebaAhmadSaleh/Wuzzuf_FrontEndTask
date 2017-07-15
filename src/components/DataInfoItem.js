import * as React from "react";


export class DataInfoItem extends React.Component {
    constructor(){
        super();
        this.state={

        }
    }



    deleteLink(ItemId){
        this.props.deleteLink(ItemId);
    }

 renderJobSpecs (Item){
     if(Item.location){
     return(
         <div style={{height:300}}>
<img src={Item.imgURL} height={80} width={120} style={{margin:20,borderRadius:4,}} />
    <p><b> Location : </b>{Item.location}</p>
    <p><b> Gender : </b>{Item.gender}</p>
    <p> <b> Housing Allowance : </b>{Item.housingAllowance}</p>
    <p> <b> Overtime  : </b>{Item.overtime}</p>
    <p> <b> Salary  : </b>{Item.salary}</p>
    <p> <b> Transportation  : </b>{Item.transportation}</p>
    </div>
     );
     }
     else {
         return(
             <div style={{height:300}}>
              <img src={Item.imgURL} height={80} width={120} style={{margin:20,borderRadius:4,}} />
             <p><b> Description : </b>{Item.description}</p> 
             </div>
     )   
     }
 }
    render() {
console.log('Item');

      let Item =this.props.Item;
        return <div className=" col-sm-6 col-xs-12"> <div className="panel panel-info ">
  <div className="panel-heading">  <h1>  {Item.jobtitle}</h1> </div>
<div className="panel-body">

{this.renderJobSpecs(Item)}

  
    <button type="button"  className="btn btn-danger col-xs-offset-2" onClick={this.deleteLink.bind(this,this.props.ItemId)}> Delete </button>

        </div>
        </div>
        </div>
    }
}

