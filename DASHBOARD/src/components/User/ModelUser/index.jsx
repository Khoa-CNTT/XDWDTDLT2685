import React from "react";
import Modal from "react-modal";
import UserFormCreate from "../FormUser.jsx/UserFormCreate";
import UserFormEdit from "../FormUser.jsx/UserFormEdit";

function UserModal({ isOpen, closeModal, data, dataCategory, handleChange, handleSubmit, mode }) {
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "600px",
            maxHeight: "80vh",
            padding: "24px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            border: "none",
            overflowY: "auto",
            fontFamily: "'Inter', sans-serif",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel={mode === "create" ? "Create User Modal" : "Edit User Modal"}
        >
            {mode === "create" ? (
                <UserFormCreate
                    data={data}
                    dataCategory={dataCategory}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            ) : (
                <UserFormEdit
                    data={data}
                    dataCategory={dataCategory}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    closeModal={closeModal}
                />
            )}
        </Modal>
    );
}

export default UserModal;
