import React from "react";
// import TitleSection from "../../components/TitleSection";
import {Card} from 'react-bootstrap'
import "./HowTo.css";

export default ()=> {
    return (
      <div className="d-flex justify-content-start">
        <div className="w-100">
          <Card
            className="mt-1 shadow-sm p-4 w-100"
            style={{ borderRadius: "0.5rem" }}
          >
            <div className="col-lg-10 offset-lg-1">
              <h3 className="m-b-20 text-center">
                How to capture 360 image with your smartphone
              </h3>
              <hr />
              <div className="row">
                <div className="col-md-6 m-b-20">
                  <div className="media how-to">
                    <div className="media-left">
                      <img
                        style={{width: "12em"}}
                        src="http://i.imgur.com/d1KZFs5.png"
                        alt=""
                        className="img-responsive "
                      />
                    </div>
                    <div className="media-body">
                      <p style={{ padding: 10 }}>
                        install and open google street view from google
                        playstore.
                      </p>
                      <h3 className="bottom-right how-to-step">1.</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 m-b-20">
                  <div className="media how-to">
                    <div className="media-left">
                      <img
                        style={{width: "12em"}}
                        src="http://i.imgur.com/zeFH16A.png"
                        alt=""
                        className="img-responsive "
                      />
                    </div>
                    <div className="media-body">
                      <p style={{ padding: 10 }}>
                        push the camera icon at the bottom right corner of your
                        screen.
                      </p>
                      <h3 className="bottom-right how-to-step">2.</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 m-b-20">
                  <div className="media how-to">
                    <div className="media-left">
                      <img
                        style={{width: "12em"}}
                        src="https://storage.googleapis.com/erbienbi/Tutorial/Screenshot_2020-04-22-16-03-06-77_c3fd429c91884f2dc82942537a846881.png"
                        alt=""
                        className="img-responsive "
                      />
                    </div>
                    <div className="media-body">
                      <p style={{ padding: 10 }}>
                        choose camera to open your smartphone camera.
                      </p>
                      <h3 className="bottom-right how-to-step">3.</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 m-b-20">
                  <div className="media how-to">
                    <div className="media-left">
                      <img
                        style={{width: "12em"}}
                        src="http://i.imgur.com/wahtvzD.png"
                        alt=""
                        className="img-responsive "
                      />
                    </div>
                    <div className="media-body">
                      <p style={{ padding: 10 }}>
                        point your camera to the dot, till check button turns to
                        green, then press it to process the picture.
                      </p>
                      <h3 className="bottom-right how-to-step">4.</h3>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 m-b-20">
                  <div className="media how-to">
                    <div className="media-left">
                      <img
                        style={{width: "12em"}}
                        src="https://storage.googleapis.com/erbienbi/Tutorial/Screenshot_2020-04-22-16-02-19-80_c3fd429c91884f2dc82942537a846881.png"
                        alt=""
                        className="img-responsive "
                      />
                    </div>
                    <div className="media-body">
                      <p style={{ padding: 10 }}>
                        done, lets take a look at panoramas folder in your
                        gallery.
                      </p>
                      <h3 className="bottom-right how-to-step">5.</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive m-t-30">
                <table className="table">
                  <tbody>
                    <tr>
                      <td colSpan="6" className="bg-gray">
                        <hr />
                        <small className="italic">TIPS : </small>
                        <p>
                          to get the best result use tripod or something to make
                          your phone rotate smoothly, and place your camera lens
                          as the axis.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
