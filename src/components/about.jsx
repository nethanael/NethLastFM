import React from "react";

const About = () => {
    return (
        <React.Fragment>

            <div className="row align-items-center mi_row">
                <div className="col mi_col">
                <small className="text-muted">Esta aplicación permite hacer una estimación de los parámetros de distancia,
                    atenuación y capacidad de canal del <strong>COBRE</strong> <em>(Cu)</em>; desde el equipo de acceso, hasta el inmueble del cliente. Se puede realizar
                    para cada una de las plataformas xDSL del ICE, tales como: DSLAM Samsung, IMAP y NAM Volius, MSAN Huawei 
                    y Calix. Calculos son posibles gracias a un estudio de metodos estadísticos aplicados a mediciones realizadas en el 
                    laboratorio de Investigación y Desarrollo de Sistemas Fijos, Unidad Infraestructura.</small>
                </div>
            </div>
            
            <div className="row align-items-center mi_row"> 
                <div className="col mi_col">
                    <h4></h4>
                </div>
                <div className="col mi_col">
                    <h4>Developer: Ing. Pablo Hidalgo Acuña</h4>
                </div>
                <div className="col mi_col">
                    <h4></h4>
                </div>
            </div>
            
        </React.Fragment>
        );
}
 
export default About;