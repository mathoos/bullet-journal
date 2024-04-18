import Logo from "../img/logo.svg";
import IconChat from "../img/icons/icon-chat.svg";
import IconList from "../img/icons/icon-list.svg";
import IconCalendar from "../img/icons/icon-calendar.svg";
import Iconlogout from "../img/icons/icon-logout.svg";
import './Nav.scss';

const Nav = () => {

    return(           
        <nav className="nav">
            <figure className="nav_logo">
                <a href="">
                    <img src={Logo} alt="Logo"/>
                </a>
            </figure>
            <div className="nav_links">
                <a href="" className="nav_links-link">
                    <img src={IconCalendar} alt="Logo"/>
                    <p>Dashboard</p>
                </a>
                <a href="" className="nav_links-link">
                    <img src={IconList} alt="Logo"/>
                    <p>Calendar</p>
                </a>
                <a href="" className="nav_links-link">
                    <img src={IconChat} alt="Logo"/>
                    <p>Messages</p>
                </a>
            </div>
            <div className="nav_parameters">
                <a href="" className="nav_parameters-link">
                    <img src={Iconlogout} alt="Logo"/>
                    <p>Logout</p>
                </a>
            </div>
        </nav>   
    )
}


export default Nav;