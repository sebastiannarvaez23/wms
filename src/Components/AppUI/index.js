import React from "react";

// components and functions slidebar
import { SlideBar } from '../SlideBar';

// components
import { Chat } from "../Chat";

export const AppUI = (props) => {
    return (
        <React.Fragment>
            <SlideBar />
            { props.children }
            <Chat />
        </React.Fragment>
    );
}