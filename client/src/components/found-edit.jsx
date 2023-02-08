import React, { Fragment, useState} from "react";

const FoundEdit = ({ report }) => {
    const [seenwhen, setSeenWhen] = useState(report.seenwhen);
    const [seenwhere, setSeenWhere] = useState(report.seenwhere);
    const [reporterid, setReporterid] = useState(report.reporterid)
    // const { seenwhen } = seenwhen
    const updateReport = async (e) => {
        // console.log("hello");
        e.preventDefault();
        try {
            const body = { seenwhen, seenwhere, reporterid: localStorage.getItem("userID") };
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
                        <div className="modal-header">
                            <h4 className="modal-title">{report.given_name} {report.surname}</h4>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                              
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <h6>When did you see them?</h6>
                            <input
                                type="date"
                                className="form-control"
                                value={seenwhen}
                                onChange={e =>setSeenWhen(e.target.value)}
                            />
                            <h6>Where did you see them?</h6>
                            <input
                                type="text"
                                className="form-control"
                                value={seenwhere}
                                onChange={e =>setSeenWhere(e.target.value)}
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
                                onClick={() =>[setSeenWhen(report.seenwhen), setSeenWhere(report.seenwhere)]}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default FoundEdit