import ShowTour from "./ShowTour";

function Tour() {
    return (
        <>
            <div className="flex flex-col gap-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-8">
                    <ShowTour />
                </div>
            </div>
        </>
    );
}

export default Tour;
