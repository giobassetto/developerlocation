/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UsersActions } from '../../store/ducks/users';
import { Creators as ModalActions } from '../../store/ducks/modal';
import './style.css';
import { isNull } from 'util';

Modal.setAppElement(document.getElementById('root'));

class ModalMap extends Component {
  static propTypes = {
    users: PropTypes.shape({}).isRequired,
    modal: PropTypes.shape({
      isOpen: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
      cordinates: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      ]),
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired,
    addUserRequest: PropTypes.func.isRequired,
  };

  state = {
    input: '',
  };

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { loading } = this.props.users;

    if (loading) return;

    const { input } = this.state;

    if (!input) return;
    const {
      addUserRequest,
      modal: { cordinates },
    } = this.props;

    addUserRequest(input, cordinates);
    this.setState({ input: '' });
    this.handleMessage();
  };

  handleMessage = () => {
    const { message, loading } = this.props.users;
    while (message === null);

    toast.success(message);

    this.handleHideModal();
  };

  handleHideModal = () => {
    const { hideModal } = this.props;
    hideModal();
    this.setState({ input: '' });
  };

  render() {
    const { modal, loading } = this.props;
    const { input } = this.state;
    return (
      <Modal
        className="modal-container"
        isOpen={modal.isOpen}
        onRequestClose={this.handleHideModal}
        contentLabel="Adicionar Usuário"
        overlayClassName="modal-overlay"
      >
        <h2>Adicionar novo usuário</h2>
        <form onSubmit={this.handleFormSubmit} className="form">
          <input placeholder="Usuário do Github" value={input} onChange={this.handleInputChange} />
          <div className="buttons-container">
            <button type="button" onClick={this.handleHideModal}>
              Cancelar
            </button>
            <button type="submit">
              {loading ? <i className="fa fa-spinner fa-pulse" /> : 'Salvar'}
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...UsersActions,
    ...ModalActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalMap);
