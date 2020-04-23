import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UpdateMovie = props => {
    const [item, setItem] = useState({
        id: props.movie.id,
        title: props.movie.title,
        director: props.movie.director,
        metascore: props.movie.metascore,
        stars: props.movie.stars
    });

    const handleChanges = e => {
        e.persist();
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let stars;
        if (item.stars instanceof Array) {
            stars = item.stars
        } else {
            stars = item.stars.split(',')
        }
        const payload = {
            ...item, stars
        }
        axios
            .put(`http://localhost:5000/api/movies/${props.movie.id}`, payload)
            .then(res =>
                props.history.push("/")
            )
            .catch(err => console.log(err));
    }
    console.log("item", item)

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    onChange={handleChanges}
                    value={item.title}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="director"
                    onChange={handleChanges}
                    value={item.director}
                />
                <input
                    type="text"
                    name="metascore"
                    placeholder="metascore"
                    onChange={handleChanges}
                    value={item.metascore}
                />
                <input
                    type="text"
                    name="stars"
                    placeholder="stars"
                    onChange={handleChanges}
                    value={item.stars}
                />

                <button>Update</button>
            </form>
        </div>
    );
};

export default UpdateMovie;