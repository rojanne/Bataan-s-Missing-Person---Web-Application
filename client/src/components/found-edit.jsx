import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const FoundEdit = ({ report }) => {
    const [seenwhen, setSeenWhen] = useState(report.seenwhen);
    const [seenwhere, setSeenWhere] = useState(report.seenwhere);
    const [reporterid, setReporterid] = useState(report.reporterid)
    const user_id = localStorage.getItem("userID")
    // const { seenwhen } = seenwhen
    const updateReport = async (e) => {
        // console.log("hello");
        console.log(report.reporterid)
        console.log(localStorage.getItem("userID"))
        e.preventDefault();
        if (user_id == report.reporterid) {
            try {
                const body = { seenwhen, seenwhere, reporterid: report.reporterid };
                const response = await fetch(
                    `http://localhost:8000/found/${report.reportsid}`,
                    {
                        method: "PUT",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(body)
                    }
                );
                const parseRes = await response.json()
                //   console.log(parseRes)
                
            } catch (err) {
                console.error(err.message);
            }
        } else {
            toast.warn(`Oooops, sorry. You can't report this. Only the one who made the missing report can make the found report. Thank you!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

    }
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={`#id${report.reportsid}`}
            >
                Found them already?
            </button>

            <div
                className="modal"
                id={`id${report.reportsid}`}

            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ backgroundColor: 'rgba(120, 162, 204)' }}>
                            <h4 className="modal-title" style={{ fontSize: '22px', fontWeight: '700' }}>{report.given_name} {report.surname}</h4>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"

                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <h6 style={{ marginBottom: '10px' }}>When did you see them?</h6>
                            <input
                                type="date"
                                className="form-control"
                                value={seenwhen}
                                onChange={e => setSeenWhen(e.target.value)}
                                style={{ marginBottom: '20px' }}
                            />
                            <h6 style={{ marginBottom: '10px' }}>Where did you see them?</h6>
                            <input
                                type="text"
                                className="form-control"
                                value={seenwhere}
                                onChange={e => setSeenWhere(e.target.value)}
                            />
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={e => updateReport(e)}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => [setSeenWhen(report.seenwhen), setSeenWhere(report.seenwhere)]}
                            >
                                Close
                            </button>
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                            {/* Same as */}
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default FoundEdit