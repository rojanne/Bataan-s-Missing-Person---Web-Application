import {
    FaPhoneAlt
}  from 'react-icons/fa'
import {FiMail} from 'react-icons/fi'
import '../pages/css/footer.css'


const Footer = () => {



    return (
        <div className="mainFooter">
            <div className="foot">
                <h5>For suggestions, questions, or inqueries.</h5>
                <h5>Contact Us:</h5>
                <p className='acts'><FaPhoneAlt className='icon'/>09995364424</p>
                <p className='acts'><FiMail className='icon'/>bataansmissingperson@gmail.com</p>
                <p className='copy'>&copy;2023 Bataan's Missing Person - All Rights Reserved</p>
            </div>
        </div>
    )
}
export default Footer