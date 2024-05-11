import st from './NewProjectScreen.module.css'
import React, { useState } from 'react';

function NewProjectScreen({ closeNewProjectScreen }) {
    const [form, setForm] = useState({
        title: '',
        author: '',
        description: ''
    });
    const [code, setCode] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setCode(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!code) {
            alert('Please upload a code snippet.');
        }
        submitRequest()
    };

    const handleClose = (event) => {
        if (!event || event.target === event.currentTarget) {
            closeNewProjectScreen();
        }
    };

    const submitRequest = async () => {
        try {
            let username = 'dgerard'
            const formData = new FormData();
            formData.append("username", username);
            formData.append("prompt", code); // 'code' is a File object
            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("programming_language", "SQL")

            const response = await fetch(`http://localhost:4000/submit_request`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to submit request:', error);
            return null;
        }
    };

    return (
        <div className={st.outsideForm} onClick={handleClose}>
            <div className={st.container} onClick={e => e.stopPropagation()}>
                <button className={st.closeX} onClick={handleClose}>X</button>
                <form className={st.form} onSubmit={handleSubmit}>
                    <div className={st.fieldContainer}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Enter project title"
                            value={form.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={st.fieldContainer}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Describe the project"
                            value={form.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={st.fieldContainer}>
                        <label htmlFor="code">Code Snippet:</label>
                        <input
                            type="file"
                            id="code"
                            onChange={handleFileChange}
                            accept=".js,.py,.java,.txt,.c,.cpp,.cs,.rb,.php,.scala,.swift,.go,.ts,.jsx,.tsx"
                        />
                    </div>
                    <button className={st.submitButton} type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default NewProjectScreen;
