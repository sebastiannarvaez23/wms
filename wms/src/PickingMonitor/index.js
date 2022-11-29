import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./PickingMonitor.css"

import { getBoxes } from "../api/box";
import { getBoxesItem } from "../api/boxitem";

import { ItemBox } from "./AdminBox/ItemBox";
import { AdminBox } from "./AdminBox";
import { AdminReferences } from "./AdminReferences";
import { PanelItemReferenceRequest } from "./AdminReferences/PanelItemReferenceRequest";
import { ItemReferenceRequest } from "./AdminReferences/PanelItemReferenceRequest/ItemReferenceRequest"
import { PanelItemReferencePack } from "./AdminReferences/PanelItemReferencePack";
import { ItemReferencePack } from "./AdminReferences/PanelItemReferencePack/ItemReferencePack";
import { getInfoReferencesRequest } from "../api/saleorder";

// Context
import { usePicking } from "../Context/picking-context";
import { useSaleOrder } from "../Context/saleorder-context";
import { useBox } from "../Context/box-context";

function PickingMonitor() {

    const { noSaleOrder } = useSaleOrder();
    const { pickingSelected, setOpenPickingMonitor } = usePicking();
    const { referencesPack, setReferencesPack} = useBox();


    const [boxes, setBoxes] = useState([]);
    const [loaded, setLoadedBox] = useState(false);
    const [boxSelected, setBoxSelected] = useState("");
    const [referencesRequest, setReferencesRequest] = useState([]);

    const [loadedSaleOrderItems, setLoadedSaleOrderItems] = useState(false);
    const [loadedBoxItem, setLoadedBoxItem] = useState(false);

    useEffect(() => {
        getBoxes(setBoxes, setLoadedBox, pickingSelected);
        getInfoReferencesRequest(setLoadedSaleOrderItems, setReferencesRequest, noSaleOrder)
    }, [])

    useEffect(() => {
        getBoxesItem(setReferencesPack, setLoadedBoxItem, boxSelected)
    }, [boxSelected])


    return ReactDOM.createPortal(
        <section className="picking-monitor-container">
            <button onClick={() => { setOpenPickingMonitor(false); setReferencesPack([]); }} className="btn-back">&#62;</button>
            <div className="picking-monitor">
                <AdminBox
                    setBoxes={setBoxes}
                    setLoadedBox={setLoadedBox}
                    pickingSelected={pickingSelected}
                    boxSelected={boxSelected}
                >
                    {loaded && boxes.map(box => (
                        <ItemBox
                            key={box.id}
                            id={box.id}
                            last_modification={box.last_modification}
                            gross_weight={box.gross_weight}
                            responsible={box.responsible}
                            dimension={box.dimension}
                            setBoxSelected={setBoxSelected}
                            boxSelected={boxSelected}
                        />
                    ))}
                    {!loaded && (<ItemBox id={"Cargando ..."} />)}
                </AdminBox>
                <AdminReferences>
                    <PanelItemReferenceRequest>
                        {loadedSaleOrderItems && referencesRequest.map(reference => (
                            <ItemReferenceRequest
                                key={reference.id}
                                id={reference.id}
                                reference={reference.reference}
                                balance={"8/8"}
                                quantity={reference.quantity}
                                modelsize={reference.modelsize}
                                color={reference.color}
                            />
                        ))}
                        {!loadedSaleOrderItems && (<ItemReferenceRequest id={"Cargando ..."} />)}
                    </PanelItemReferenceRequest>
                    <PanelItemReferencePack
                        setReferencesPack={setReferencesPack}
                        setLoadedBoxItem={setLoadedBoxItem}
                        boxSelected={boxSelected}
                    >
                        {loadedBoxItem && referencesPack.map(reference => (
                            <ItemReferencePack
                                key={reference.id}
                                id={reference.id}
                                reference={reference.reference}
                                quantity={reference.quantity}
                                modelsize={reference.modelsize}
                                color={reference.color}
                            />
                        ))}
                        {!loadedBoxItem && (<ItemReferencePack id={"Cargando ..."} />)}
                    </PanelItemReferencePack>
                </AdminReferences>
            </div>
        </section>,
        document.getElementById('modal')
    );
}

export { PickingMonitor };
