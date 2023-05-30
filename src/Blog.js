import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Blog() {
  var params = useParams();
  var navigate = useNavigate();
  var [blog, setBlog] = useState({});
  var [updating, setUpdating] = useState(false);
  const [text, settext] = useState("");
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");

  function getData() {
    axios.get("http://localhost:3636/blog/id/" + params.id).then(({ data }) => {
      console.log("this is the blog", data);
      setBlog(data);
      settext(data.text);
      settitle(data.title);
      setimage(data.image);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  function del() {
    axios.delete("http://localhost:3636/blog/" + params.id).then(() => {
      navigate("/");
    });
  }

  function confirmUpdate() {
    axios
      .put("http://localhost:3636/blog/" + params.id, {
        title: title,
        text: text,
        image: image,
      })
      .then(() => {
        getData();
        setUpdating(false);
      });
  }

  return (
    <div>
      <button
        onClick={() => {
          setUpdating(!updating);
        }}
      >
        update this post
      </button>
      <div className="blog-container">
        {updating === false ? (
          <div className="blog-left">
            <img src={blog.image} />
            <h1>{blog.title}</h1>
            <div>
              <button>Js</button>
              <button>Coding</button>
              <button>Best practice</button>
            </div>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => {
                del();
              }}
            >
              Delete this blog
            </button>

            <p>{blog.text}</p>
          </div>
        ) : (
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
                confirmUpdate();
              }}
            >
              update blog
            </button>
          </div>
        )}
        <div className="blog-right">
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" />
            <h2>js</h2>
          </div>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" />
            <h2>js</h2>
          </div>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" />
            <h2>js</h2>
          </div>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" />
            <h2>js</h2>
          </div>
          <div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png" />
            <h2>js</h2>
          </div>
        </div>
      </div>
      <div className="footer">
        <h2>Created with a lot of errors by C21 </h2>
      </div>
    </div>
  );
}

export default Blog;
