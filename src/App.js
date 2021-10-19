import { Formik, Form, Field } from "formik";
import { useState } from "react";
import "./header.css";
import "./content.css";
import "./article.css";


const App = () => {
    const [photos, setPhotos] = useState([]);
    console.log({ photos });
    const open = (url) => window.open(url);
    return (
        <div>
            <header>
                <Formik
                    initialValues={{ search: "" }}
                    onSubmit={async (values) => {
                        const response = await fetch(
                            `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
                            {
                                headers: {
                                    Authorization:
                                        "Client-ID 1gzs5c_vCOCCu90Gs6q8MlBCJ-OGMt4cl6rs4p0WMNc",
                                },
                            }
                        );
                        const data = await response.json();
                        //api call
                        setPhotos(data.results);
                    }}
                >
                    <Form>
                        <Field name="search" placeholder="Search Images"/>
                    </Form>
                </Formik>
            </header>
            <div className="container">
                <div className="center">
                    {photos.map((photo) => (
                        <article
                            key={photo.id}
                            onClick={() => open(photo.links.html)}
                        >
                            <img src={photo.urls.regular} alt={photo.alt_description}/>
                            <p>
                                {[
                                    photo.description,
                                    photo.alt_description,
                                ].join(" - ")}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
