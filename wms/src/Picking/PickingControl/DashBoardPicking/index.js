import React from "react";
import { createPicking } from "../../../api/picking";
import { getPickings } from "../../../api/picking";
import { usePicking } from "../../../Context/picking-context";
import './DashBoardPicking.css';

function DashBoardPicking(props) {

    const {setPickings, setIndicatorsPicking, setLoadedPicking} = usePicking()

    let pickingDefaultData = {
        status: 1,
        sale_order: props.noSaleOrder
    }

    return (
        <div className="dashBoard-picking">
            <h4>Listado de despachos de la orden</h4>
            <div className="header-list-pikings">
                <span>id</span>
                <span>Estado</span>
                <span>Responsable</span>
                <span>Última modificación</span>
            </div>

            <button onClick={() => {
                createPicking(pickingDefaultData, setPickings, setLoadedPicking, props.noSaleOrder);
            }}
                className="btn-create-picking"
            >+</button>

            {props.children}
        </div>
    );
}

export { DashBoardPicking };