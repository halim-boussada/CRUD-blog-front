import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [blogsList, setBlogsList] = useState([]);
  const [text, settext] = useState("");
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("http://localhost:3636/blog").then(({ data }) => {
      console.log(data);
      setBlogsList(data);
    });
  }

  var navigate = useNavigate();
  function readMore(id) {
    console.log(id);
    navigate("/blog/" + id);
  }

  function addBlog() {
    axios
      .post("http://localhost:3636/blog", {
        title: title,
        text: text,
        image: image,
      })
      .then(({ data }) => {
        getData();
        settitle("");
        settext("");
        setimage("");
      });
  }

  return (
    <div>
      <div className="header-container">
        <div className="header-left">
          <div>
            <h1>
              Reading Is the <span>Best</span>
            </h1>
            <h3>
              this is a website for creating and reading blogs, so have fun{" "}
            </h3>
            <button>Start Now</button>
          </div>
        </div>
        <div className="header-right">
          <img
            src="https://www.pngarts.com/files/10/Vector-Reading-Book-PNG-Image-Background.png"
            alt="image"
          />
        </div>
      </div>

      <div>
        <input
          onChange={(e) => {
            settitle(e.target.value);
          }}
          value={title}
        />
        <input
          onChange={(e) => {
            settext(e.target.value);
          }}
          value={text}
        />
        <input
          onChange={(e) => {
            setimage(e.target.value);
          }}
          value={image}
        />
        <button
          onClick={() => {
            addBlog();
          }}
        >
          add new blog
        </button>
      </div>

      <div className="title">
        <h1>This is our blogs</h1>
      </div>

      <div className="blogs">
        {blogsList.map((e) => {
          return (
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src={e.image}
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">{e.title}</h5>
                    {e.text.length > 100 ? (
                      <p class="card-text">{e.text.slice(0, 100)}...</p>
                    ) : (
                      <p class="card-text">{e.text}</p>
                    )}
                    <p class="card-text">
                      <small class="text-body-secondary">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => {
                      readMore(e._id);
                    }}
                  >
                    Read More about this
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="footer">
        <h2>Created with a lot of errors by C21 </h2>
      </div>
    </div>
  );
}

export default Home;
