import React from "react";
import Modal from "react-modal";
import TourForm from "../FormTour";

function TourModal({ isOpen, closeModal, data, itinerary, handleChange, handleItineraryChange, handleSubmit, renderAnh, handleImageChange, files }) {
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
            contentLabel="Tạo Tour Mới"
        >
            <TourForm
                data={data}
                itinerary={itinerary}
                handleChange={handleChange}
                handleItineraryChange={handleItineraryChange}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                renderAnh={renderAnh}
                handleImageChange={handleImageChange}
                files={files}
            />
        </Modal>
    );
}

export default TourModal;
