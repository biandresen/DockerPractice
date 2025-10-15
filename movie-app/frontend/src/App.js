import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const addMovie = async () => {
    const res = await fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, review }),
    });
    const newMovie = await res.json();
    setMovies([...movies, newMovie]);
  };

  return (
    <div>
      <h1>Movie Reviews</h1>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Review" value={review} onChange={(e) => setReview(e.target.value)} />
      <button onClick={addMovie}>Add Review</button>
      <ul>
        {movies.map((m) => (
          <li key={m._id}>
            {m.title}: {m.review}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
