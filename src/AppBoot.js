import React from 'react';
import './weatherreactapp.css';

function AppBoot() {
  return (
    <>
    <div className="container-fluid bg">
    <div className="row">
            <div className="col-sm-9 col-md-6 col-lg-4 mx-auto">
                <div className="card my-5 weatherforecast">
                    <div className="card-body">
                        <h5 className="card-title text-center">Weather forecast</h5>

                        <div className="container text-center rounded">
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-group mb-3 mt-3">
                                        <input type="text" className="form-control" placeholder="City" aria-label="City"
                                            aria-describedby="button-addon2" id="cityToSearch" />
                                        <div className="input-group-append">
                                            <button className="btn btn-secondary" type="button" id="buttonSearch"
                                                data-toggle="modal" data-target="#modalCities">
                                                <img src="./search-button.svg" alt="search" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h1 id="cityName">C</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h1 id="temp" className="display-2">x&#8451;</h1>
                                    <p><span className="text-muted">Feels like </span> <span id="feelslike"></span></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p><span className="text-muted">Min</span> <span id="min"></span></p>
                                </div>
                                <div className="col-6">
                                    <p><span className="text-muted">Max</span> <span id="max"></span></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p><span className="text-muted">Pressure</span> <span id="pressure"></span></p>
                                </div>
                                <div className="col-6">
                                    <p><span className="text-muted">Humidity</span> <span id="humidity"></span>%</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <ul className="list-inline" id="weather"></ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p><span className="text-muted">Sunrise</span> <span id="sunrise"></span></p>
                                </div>
                                <div className="col-6">
                                    <p><span className="text-muted">Sunset</span> <span id="sunset"></span></p>
                                </div>
                            </div>
                        </div>
                        
                        <div id="forecast" className="container"></div>
                        
                        <div id="output"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Modal --> */}
    <div className="modal fade" id="modalCities" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">Select the correct city</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="list-group" id="listcities"></div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}

export default AppBoot;
