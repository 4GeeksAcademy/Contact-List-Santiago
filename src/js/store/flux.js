
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
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/SantiDiaz/contacts');
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contacts: data.contacts });
                    } else {
                        console.error(`Error fetching contacts: ${response.status} - ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error fetching contacts:", error);
                }
            },
            createAgenda: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/SantiDiaz', {method: "POST"});
                    if (response.ok) {
                        const data = await response.json();
                        
                    } else {
                        console.error(`Error creating agenda: ${response.status} - ${response.statusText}`);
                    }
                } catch (error) {
                    console.error("Error fetching agenda:", error);
                }
            },
            addContact: async (contact) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/SantiDiaz/contacts', {
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
            
            sendDeleteContact: async (id) => {
                const store = getStore();
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/SantiDiaz/contacts/${id}`, { method: "DELETE" });
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
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/SantiDiaz/contacts/${id}`, {
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
