import Navbar from "../components/navbar";
import "./css/home.css"
import { useNavigate } from "react-router-dom";

const Home = ({setAuth}) => {

  const navigate = useNavigate();
  const routeChange = () => {
  let path = '/form-report'
  navigate(path)
  }
    return (
        <>
          <Navbar/>
          <section className='homepage' style={{height:`100vh`, backgroundRepeat: 'no-repeat', width:`100%`,
                backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20210902/pngtree-male-silhouette-wandering-back-and-forth-melancholy-and-sad-image_786503.jpg")`,
                backgroundSize:`cover`}}>
            <div className="header">
              <h1>We Never Stop Caring</h1>
            </div>
            <div className="state">
              <p className="people">We people, behind here at Missing People application <br></br> wanted to help in finding missing individuals
                in the province of Bataan.<br></br>We hope to help in any way possible.<br></br> We ask for your cooperation and patience along the process.
              </p>
            </div>
            <div className="lost">
                <h5>Do you know someone who's missing?</h5>
            </div>
            <div>
              <button type="button" className="buttonform" onClick={ routeChange } >Report Someone Missing</button>
            </div>
          </section>
        </>
      )
}

export default Home;