
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            contacts: [],
            editContact: null,
            agendas:[]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            loadSomeData: () => {
                /**
                    fetch().then().then(data => setStore({ "foo": data.bar }))
                */
            },
            infContact: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/santidiaz');
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data });
                    } else {
                        console.error(`Error fetching contacts: ${response.status} - ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            },
            getAgendas: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas?offset=0&limit=100');
                    if (response.ok) {
                        const data = await response.json();
                        let store = getStore()
                        setStore({ ...store,agendas: data.agendas });
                    } else {
                        console.error(`Error fetching contacts: ${response.status} - ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error fetching aegdnas:", error);
                }
            },
            addContact: async (contact) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/apis/fake/contact', {
                        method: "POST",
                        body: JSON.stringify(contact),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);

                        const store = getStore();
                        setStore({ contacts: [...store.contacts, data] });
                        alert('Contacto agregado exitosamente');
                    } else {
                        console.error(`Error adding contact: ${response.status} - ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error adding contact:", error);
                }
            },
            getAgendaByName:async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/apis/fake/contact/agenda/santidiaz');
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data });
                    } else {
                        console.error(`Error fetching contacts: ${response.status} - ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            },
            sendDeleteContact: async (id) => {
                const store = getStore();
                try {
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, { method: "DELETE" });
                    if (response.ok) {
                        const newContacts = store.contacts.filter(contact => contact.id !== id);
                        setStore({ contacts: newContacts });
                        console.log("Contacto eliminado exitosamente");
                    } else {
                        console.error(`Error al eliminar el contacto: ${response.status} - ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error al enviar la solicitud DELETE:", error);
                }
            },
            sendEditContact: async (editContact, id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
                        method: "PUT",
                        body: JSON.stringify(editContact),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json();
                    console.log(data);
                    if (response.ok) {
                        const store = getStore();
                        const updatedContacts = store.contacts.map(contact => {
                            if (contact.id === id) {
                                return data;
                            }
                            return contact;
                        });
                        setStore({ contacts: updatedContacts, editContact: null });
                        alert('Contacto actualizado exitosamente');
                        return true;
                    }
                } catch (error) {
                    console.error("Error updating contact:", error);
                }
            },
            editMode: (id) => {
                const store = getStore();
                const contactToEdit = store.contacts.find((contact) => contact.id === id);
                if (contactToEdit) {
                    setStore({ editContact: contactToEdit });
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
