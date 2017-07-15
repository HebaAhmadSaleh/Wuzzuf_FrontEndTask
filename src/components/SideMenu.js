

import React from 'react';
import FeedsStore from "../Stores/FeedsStore"
import ListGroup from 'react-bootstrap/lib//ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import * as FeedActions from '../Actions/feedActions';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';


import Modal from 'react-bootstrap/lib/Modal';
export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FeedNames: [],
            isModalOpen: false,
            selectedId: '',
            height: ''
        }
    }


    componentWillMount() {

        this.GetFeedNames();

        FeedsStore.on('change', () => {
            this.GetFeedNames();
        })

    }





    GetFeedNames() {
        let temp = [];
        FeedsStore.getAll()
            .then((response) => {
                response.data.map(item =>
                { temp.push(item.obj) });
                this.setState({ FeedNames: temp })

            });

    }
    closeModal() {

        this.setState({ isModalOpen: false, selectedId: '' });

    }




    openModal(id) {
        this.setState({ isModalOpen: true, selectedId: id });
    }

    delete() {

        FeedActions.deleteFeed(this.state.selectedId);
        this.setState({ isModalOpen: false, selectedId: '' });
    }

    render() {
console.log('SideMenu');
        const bindingComponent = this.state.FeedNames.map((item) => {
            return (


                <SideNav highlightColor='#FFF' highlightBgColor='#34495E' >

                    <Nav id='feeds'>

                        <NavText>
                            <div>
                                {item.name}
                                <div style={{ position: 'absolute', textAlign: 'center', right: 20, height: 20, width: 20, borderRadius: 2, background: '#3498DB', marginRight: 0, display: 'inline-block' }}>
                                    <a style={{ textDecoration: 'none', fontSize: 16, color: 'white', }} onClick={() => this.openModal(item.id)} > x </a>
                                </div>
                            </div>
                        </NavText>
                    </Nav>
                </SideNav>
            );
        });



        return (
            <div>
                <div style={{
                    background: '#2C3E50', color: '#FFF', width: 220,
                    display: 'flex', flexDirection: 'column', minHeight: '250vh'
                }}>
                    <h1 style={{ color: 'white', paddingTop: 40, paddingBottom: 40, textAlign: 'center' }} > MY FEED </h1>
                    {bindingComponent} </div>

                <Modal
                    show={this.state.isModalOpen}
                    onHide={this.closeModal.bind(this)}
                > <Modal.Header closeButton>
                        <Modal.Title> Confirm Remove of Feed </Modal.Title>
                    </Modal.Header>

                    <div className="row" >
                        <form>
                            <div className=" col-xs-10 " >
                                <br /><br />

                                <button type="button" className="btn btn-info col-xs-2 col-xs-offset-3 add" onClick={this.delete.bind(this)}>Confirm</button>
                                <button type="button" className="btn btn-info col-xs-2 col-xs-offset-4 add" onClick={this.closeModal.bind(this)} >Cancel</button>
                            </div>



                        </form>
                    </div>

                </Modal>
            </div>


        );

    }


}

