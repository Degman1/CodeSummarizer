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
        console.log(form);
        console.log(code);
        if(!code) {
            alert('Please upload a code snippet.');
        }
    };

    const handleClose = (event) => {
        if (!event || event.target === event.currentTarget) {
            closeNewProjectScreen();
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
                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            placeholder="Project author"
                            value={form.author}
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
