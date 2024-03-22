import React, { useState, useEffect, useContext } from "react";
import {Context} from "../store/appContext.js"
import "../../styles/home.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
    const {store, actions} = useContext(Context)
    useEffect(() => {
        actions.infContact()
    }, [])

    return (
        store.contacts.map((contact) => {
            return (
                <div className="fatherCard container" key={contact.id}>
                    <div className="cardHome">
                        <div style={{ margin: "15px" }} >
                            <img className="cardImg" src="https://estaticos.elcolombiano.com/binrepository/780x565/0c0/780d565/none/11101/NFGU/cristiano-ronaldo-ig-personal_43991124_20231215212229.jpg" alt="cristiano" />
                        </div>
                        <div className="cardInf">
                            <h4 style={{ marginTop: "10px" }}>{contact.full_name}</h4>
                            <p> <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "8px" }} />{contact.address}</p>
                            <p> <FontAwesomeIcon icon={faPhone} style={{ marginRight: "8px" }} />{contact.phone}</p>
                            <p><FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "8px" }} />{contact.email}</p>
                        </div>
                        <div className="cardButton">
                            <button className="btnCard" ><FontAwesomeIcon icon={faPen} size="lg" style={{ color: "#000000", }} /></button>
                            <button className="btnCard" onClick={() => actions.sendDeleteContact(contact.id)}><FontAwesomeIcon icon={faTrash} size="lg" style={{ color: "#000000", }} /></button>
                        </div>
                    </div>
                </div>
            )
        })
    )
};