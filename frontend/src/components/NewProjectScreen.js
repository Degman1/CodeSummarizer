import st from './NewProjectScreen.module.css'
import react, { useState } from 'react'

/*
 Steps:
  upload code
  set title
  set description
  set author

  upload code

  submit button

  back to project screen
*/

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
            //fail
        }
    };

    const handleClose = (event) => {
        if (!event || event.target === event.currentTarget) {
            closeNewProjectScreen();
        }
    }

    return (
        <div
            className={st.outsideForm}
            onClick={(e) => handleClose(e)}
        >
            <div className={st.container}>
                <span
                    className={st.closeX}
                    onClick={() => handleClose()}
                >X</span>
                <form
                    className={st.form}
                    onSubmit={handleSubmit}
                >
                    <div className={st.fieldContainer1}>
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={st.fieldContainer1}>
                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={form.author}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={st.fieldContainer1}>
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={st.fieldContainer1}>
                        <label htmlFor="code">Code Snippet:</label>
                        <input
                            type="file"
                            id="code"
                            onChange={handleFileChange}
                            accept=".js,.py,.java,.txt,.c,.cpp,.cs,.rb,.php,.scala,.swift,.go,.ts,.jsx,.tsx"  // either have this or remove attribute entirely to accept all types, then do server side validation ?
                        />
                    </div>
                    <button className={st.submitButton} type="submit">Submit</button>
                </form>
            </div>
        </div>

    );
}

export default NewProjectScreen;
