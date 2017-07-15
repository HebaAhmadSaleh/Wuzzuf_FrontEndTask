import * as React from "react";
import FeedsStore from "../Stores/FeedsStore"
import { DataInfoItem } from './DataInfoItem'
import * as feedActions from '../Actions/feedActions'
import axios from 'axios';
import Modal from 'react-bootstrap/lib/Modal';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import FormControl from 'react-bootstrap/lib/FormControl'
import AddForm from '../components/addForm';
import SideMenu from '../components/SideMenu';


export class DataInfoListing extends React.Component {
    constructor() {
        super();
        this.state = {
            feedData: [],
            isModalOpen: false,
            selectedId: '',

        }
    }

    componentWillMount() {


        this.GetFeedUrls();

        FeedsStore.on('change', () => {
            this.GetFeedUrls();
        })

    }

    GetFeedUrls() {
        const self = this;

        let filteredData = [],
            temp = [];
        FeedsStore.getFeeds()
            .then((response) => {
                this.setState({ feedData: response.data });
            })
    }
    closeModal() {

        this.setState({ isModalOpen: false, selectedId: '' });

    }




    openModal(id) {
        this.setState({ isModalOpen: true, selectedId: id });
    }
    confirmDelete() {

        feedActions.deleteFeedUrl(this.state.selectedId);
        this.setState({ isModalOpen: false, selectedId: '' });
    }

    addFeed(createdObj) {

        feedActions.createFeed(createdObj);
    }

    render() {

        let state = this.state;

        const bindingComponent = state.feedData.map((item) => {
            return (
                <DataInfoItem key={item.id} ItemId={item.id} Item={item.data} deleteLink={this.openModal.bind(this)} />);
        });
        return (
            <div style={{ padding: 0, margin: 0, }}>
                <div className=" col-xs-2" style={{ padding: 0 }} >   <SideMenu /> </div>
                <div className=" col-xs-8">
                    <AddForm addFeed={this.addFeed} />
                    <div >

                        {bindingComponent}

                    </div>
                </div>

                <div>
                    <Modal
                        show={this.state.isModalOpen}
                        onHide={this.closeModal.bind(this)}
                    > <Modal.Header closeButton>
                            <Modal.Title> Confirm Remove of FeedUrl </Modal.Title>
                        </Modal.Header>

                        <div className="row" >
                            <form>
                                <div className=" col-xs-10 " >
                                    <br /><br />

                                    <button type="button" className="btn btn-info col-xs-2 col-xs-offset-3 add" onClick={this.confirmDelete.bind(this)}>Confirm</button>
                                    <button type="button" className="btn btn-info col-xs-2 col-xs-offset-4 add" onClick={this.closeModal.bind(this)} >Cancel</button>
                                </div>



                            </form>
                        </div>

                    </Modal>
                </div>

            </div>);
    }
}

