import Navbar from "../component/Navbar";
import Slider from "../component/Slider";
import Category from "../component/Category";
import Products from "../component/Products";
import Newsletter from "../component/NewsLetter";
import Footer from "../component/Footer";


const Home = () =>{
    return(
    <>
    <Navbar/>
    <Slider/>
    <Category/>
    <Products/>
    <Newsletter/>
    <Footer />
    </>
    );

}

export default Home;